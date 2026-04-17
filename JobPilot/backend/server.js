const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./database");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const authenticateToken = require("./authMiddleware");
const { register, login, getCurrentUser } = require("./authController");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration - Allow multiple origins
const configuredOrigins = [
  "https://jobpilot-jade.vercel.app", // Production (Vercel)
  "https://www.bewerbungstracker.com", // Custom Domain
  "https://bewerbungstracker.com", // Custom Domain (ohne www)
  ...(process.env.FRONTEND_URLS
    ? process.env.FRONTEND_URLS.split(",").map((origin) => origin.trim())
    : []),
];
const allowedOrigins = new Set(configuredOrigins.filter(Boolean));

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman, curl)
      if (!origin) return callback(null, true);

      const isLocalhostOrigin =
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

      if (isLocalhostOrigin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      const msg = `CORS not allowed for origin: ${origin}`;
      console.error(msg);
      return callback(new Error(msg), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
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
    endpoints: [
      "/api/bewerbungen",
      "/api/statistiken",
      "/api/auth/login",
      "/api/auth/register",
    ],
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ==================== AUTH ROUTES (UNPROTECTED) ====================

// Register
app.post("/api/auth/register", register);

// Login
app.post("/api/auth/login", login);

// Get current user (PROTECTED)
app.get("/api/auth/me", authenticateToken, getCurrentUser);

// ==================== BEWERBUNGEN ROUTES (PROTECTED) ====================

// GET alle Bewerbungen (NUR für eingeloggten User!)
app.get("/api/bewerbungen", authenticateToken, async (req, res) => {
  const { status } = req.query;
  const userId = req.userId; // Aus JWT Token

  let query = "SELECT * FROM bewerbungen WHERE user_id = $1";
  let params = [userId];

  if (status) {
    query += " AND status = $2";
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

// GET einzelne Bewerbung (NUR für eingeloggten User!)
app.get("/api/bewerbungen/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const result = await pool.query(
      "SELECT * FROM bewerbungen WHERE id = $1 AND user_id = $2",
      [id, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Bewerbung nicht gefunden" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST neue Bewerbung erstellen (NUR für eingeloggten User!)
app.post("/api/bewerbungen", authenticateToken, async (req, res) => {
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
    gehalt,
    waehrung,
  } = req.body;

  const userId = req.userId; // Aus JWT Token

  if (!position || !firma || !status || !datum) {
    return res
      .status(400)
      .json({ error: "Position, Firma, Status und Datum sind erforderlich" });
  }

  const query = `
    INSERT INTO bewerbungen
    (position, firma, status, datum, standort, ansprechpartner, notizen, bewerbungsart, startdatum, link, gehalt, waehrung, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
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
      gehalt,
      waehrung,
      userId,
    ]);

    res.status(201).json({
      id: result.rows[0].id,
      message: "Bewerbung erstellt",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT Bewerbung aktualisieren (NUR für eingeloggten User!)
app.put("/api/bewerbungen/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
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
    gehalt,
    waehrung,
  } = req.body;

  const query = `
    UPDATE bewerbungen
    SET position = $1, firma = $2, status = $3, datum = $4,
        standort = $5, ansprechpartner = $6, notizen = $7,
        bewerbungsart = $8, startdatum = $9, link = $10,
        gehalt = $11, waehrung = $12, updated_at = CURRENT_TIMESTAMP
    WHERE id = $13 AND user_id = $14
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
      gehalt,
      waehrung,
      id,
      userId,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Bewerbung nicht gefunden" });
    }

    res.json({ message: "Bewerbung aktualisiert" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Bewerbung löschen (NUR für eingeloggten User!)
app.delete("/api/bewerbungen/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const result = await pool.query(
      "DELETE FROM bewerbungen WHERE id = $1 AND user_id = $2",
      [id, userId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Bewerbung nicht gefunden" });
    }

    res.json({ message: "Bewerbung gelöscht" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Statistiken (NUR für eingeloggten User!)
app.get("/api/statistiken", authenticateToken, async (req, res) => {
  const userId = req.userId;

  const query = `
    SELECT
      status,
      COUNT(*)::int AS anzahl
    FROM bewerbungen
    WHERE user_id = $1
    GROUP BY status
  `;

  try {
    const result = await pool.query(query, [userId]);

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

pool
  .initDB()
  .catch((error) => {
    console.error("Fehler bei der Datenbankinitialisierung:", error);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Server läuft auf Port ${PORT}`);
    });
  });
