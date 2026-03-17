const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./database");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const parseOrigins = (value) =>
  (value || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const allowedOrigins = new Set([
  ...parseOrigins(process.env.FRONTEND_URL),
  ...parseOrigins(process.env.FRONTEND_URLS),
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

const isAllowedOrigin = (origin) => {
  if (!origin) return true; // Allow non-browser clients (no Origin header).

  if (allowedOrigins.has(origin)) {
    return true;
  }

  // Allow Vercel preview and production URLs.
  return /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
};

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "JobPilot Backend läuft",
    api: "/api",
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api", (req, res) => {
  res.json({
    status: "ok",
    message: "JobPilot API erreichbar",
    endpoints: ["/api/bewerbungen", "/api/statistiken"],
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// GET alle Bewerbungen
app.get("/api/bewerbungen", async (req, res) => {
  const { status } = req.query;

  let query = "SELECT * FROM bewerbungen";
  let params = [];

  if (status) {
    query += " WHERE status = $1";
    params.push(status);
  }

  query += " ORDER BY created_at DESC";

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET einzelne Bewerbung
app.get("/api/bewerbungen/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM bewerbungen WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Bewerbung nicht gefunden" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST neue Bewerbung erstellen
app.post("/api/bewerbungen", async (req, res) => {
  const {
    position,
    firma,
    status,
    datum,
    standort,
    ansprechpartner,
    notizen,
    bewerbungsart,
    startdatum,
    link,
  } = req.body;

  if (!position || !firma || !status || !datum) {
    return res
      .status(400)
      .json({ error: "Position, Firma, Status und Datum sind erforderlich" });
  }

  const query = `
    INSERT INTO bewerbungen
    (position, firma, status, datum, standort, ansprechpartner, notizen, bewerbungsart, startdatum, link)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING id
  `;

  try {
    const result = await pool.query(query, [
      position,
      firma,
      status,
      datum,
      standort,
      ansprechpartner,
      notizen,
      bewerbungsart,
      startdatum,
      link,
    ]);
    res.status(201).json({
      id: result.rows[0].id,
      message: "Bewerbung erstellt",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT Bewerbung aktualisieren
app.put("/api/bewerbungen/:id", async (req, res) => {
  const { id } = req.params;
  const {
    position,
    firma,
    status,
    datum,
    standort,
    ansprechpartner,
    notizen,
    bewerbungsart,
    startdatum,
    link,
  } = req.body;

  const query = `
    UPDATE bewerbungen
    SET position = $1, firma = $2, status = $3, datum = $4,
        standort = $5, ansprechpartner = $6, notizen = $7,
        bewerbungsart = $8, startdatum = $9, link = $10, updated_at = CURRENT_TIMESTAMP
    WHERE id = $11
  `;

  try {
    const result = await pool.query(query, [
      position,
      firma,
      status,
      datum,
      standort,
      ansprechpartner,
      notizen,
      bewerbungsart,
      startdatum,
      link,
      id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Bewerbung nicht gefunden" });
    }
    res.json({ message: "Bewerbung aktualisiert" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Bewerbung löschen
app.delete("/api/bewerbungen/:id", async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const deleteResult = await client.query(
      "DELETE FROM bewerbungen WHERE id = $1",
      [id],
    );

    if (deleteResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Bewerbung nicht gefunden" });
    }

    // IDs der verbleibenden Einträge neu nummerieren
    const { rows } = await client.query(
      "SELECT id FROM bewerbungen ORDER BY id ASC",
    );

    if (rows.length === 0) {
      // Keine Einträge mehr – Sequenz zurücksetzen
      await client.query("ALTER SEQUENCE bewerbungen_id_seq RESTART WITH 1");
      console.log("ID-Zähler wurde zurückgesetzt");
    } else {
      // Zweistufige Umnummerierung, um UNIQUE-Konflikte zu vermeiden:
      // Schritt 1: Negative temporäre IDs vergeben
      for (let i = 0; i < rows.length; i++) {
        await client.query("UPDATE bewerbungen SET id = $1 WHERE id = $2", [
          -(i + 1),
          rows[i].id,
        ]);
      }
      // Schritt 2: Positive sequentielle IDs vergeben
      for (let i = 0; i < rows.length; i++) {
        await client.query("UPDATE bewerbungen SET id = $1 WHERE id = $2", [
          i + 1,
          -(i + 1),
        ]);
      }
      // Sequenz-Zähler auf den neuen Maximalwert setzen
      await client.query("SELECT setval('bewerbungen_id_seq', $1)", [
        rows.length,
      ]);
    }

    await client.query("COMMIT");
    res.json({ message: "Bewerbung gelöscht" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Fehler beim Löschen:", err.message);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// GET Statistiken
app.get("/api/statistiken", async (req, res) => {
  const query = `
    SELECT
      status,
      COUNT(*)::int AS anzahl
    FROM bewerbungen
    GROUP BY status
  `;

  try {
    const result = await pool.query(query);

    const stats = {
      beworben: 0,
      stufe_weiter: 0,
      angenommen: 0,
      abgelehnt: 0,
      keine_antwort: 0,
      gesamt: 0,
    };

    result.rows.forEach((row) => {
      stats[row.status] = row.anzahl;
      stats.gesamt += row.anzahl;
    });

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
