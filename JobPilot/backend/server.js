const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
const PORT = 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Vite Frontend Port
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

// GET alle Bewerbungen
app.get("/api/bewerbungen", (req, res) => {
  const { status } = req.query;

  let query = "SELECT * FROM bewerbungen";
  let params = [];

  if (status) {
    query += " WHERE status = ?";
    params.push(status);
  }

  query += " ORDER BY created_at DESC";

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET einzelne Bewerbung
app.get("/api/bewerbungen/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM bewerbungen WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Bewerbung nicht gefunden" });
    }
    res.json(row);
  });
});

// POST neue Bewerbung erstellen
app.post("/api/bewerbungen", (req, res) => {
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
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
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
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        message: "Bewerbung erstellt",
      });
    },
  );
});

// PUT Bewerbung aktualisieren
app.put("/api/bewerbungen/:id", (req, res) => {
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
    SET position = ?, firma = ?, status = ?, datum = ?,
        standort = ?, ansprechpartner = ?, notizen = ?,
        bewerbungsart = ?, startdatum = ?, link = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(
    query,
    [
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
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Bewerbung nicht gefunden" });
      }
      res.json({ message: "Bewerbung aktualisiert" });
    },
  );
});

// DELETE Bewerbung löschen
app.delete("/api/bewerbungen/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM bewerbungen WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Bewerbung nicht gefunden" });
    }

    // IDs der verbleibenden Einträge neu nummerieren
    db.all("SELECT id FROM bewerbungen ORDER BY id ASC", [], (err, rows) => {
      if (err) {
        console.error("Fehler beim Laden der IDs:", err.message);
        return res.json({ message: "Bewerbung gelöscht" });
      }

      if (rows.length === 0) {
        // Keine Einträge mehr – Sequenz zurücksetzen
        db.run(
          "DELETE FROM sqlite_sequence WHERE name = 'bewerbungen'",
          (err) => {
            if (err) {
              console.error("Fehler beim Zurücksetzen der ID:", err.message);
            } else {
              console.log("ID-Zähler wurde zurückgesetzt");
            }
            res.json({ message: "Bewerbung gelöscht" });
          },
        );
        return;
      }

      // Zweistufige Umnummerierung, um UNIQUE-Konflikte zu vermeiden:
      // Schritt 1: Negative temporäre IDs vergeben
      // Schritt 2: Positive sequentielle IDs vergeben
      db.serialize(() => {
        rows.forEach((row, index) => {
          db.run("UPDATE bewerbungen SET id = ? WHERE id = ?", [
            -(index + 1),
            row.id,
          ]);
        });

        rows.forEach((row, index) => {
          db.run("UPDATE bewerbungen SET id = ? WHERE id = ?", [
            index + 1,
            -(index + 1),
          ]);
        });

        // Sequenz-Zähler auf den neuen Maximalwert setzen
        db.run(
          "UPDATE sqlite_sequence SET seq = ? WHERE name = 'bewerbungen'",
          [rows.length],
          (err) => {
            if (err) {
              console.error(
                "Fehler beim Aktualisieren der Sequenz:",
                err.message,
              );
            }
            res.json({ message: "Bewerbung gelöscht" });
          },
        );
      });
    });
  });
});

// GET Statistiken
app.get("/api/statistiken", (req, res) => {
  const query = `
    SELECT 
      status,
      COUNT(*) as anzahl
    FROM bewerbungen
    GROUP BY status
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const stats = {
      beworben: 0,
      stufe_weiter: 0,
      angenommen: 0,
      abgelehnt: 0,
      keine_antwort: 0,
      gesamt: 0,
    };

    rows.forEach((row) => {
      stats[row.status] = row.anzahl;
      stats.gesamt += row.anzahl;
    });

    res.json(stats);
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
