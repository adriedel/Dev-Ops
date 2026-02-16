const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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
  } = req.body;

  if (!position || !firma || !status || !datum) {
    return res
      .status(400)
      .json({ error: "Position, Firma, Status und Datum sind erforderlich" });
  }

  const query = `
    INSERT INTO bewerbungen 
    (position, firma, status, datum, standort, ansprechpartner, notizen, bewerbungsart, startdatum)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
  } = req.body;

  const query = `
    UPDATE bewerbungen 
    SET position = ?, firma = ?, status = ?, datum = ?, 
        standort = ?, ansprechpartner = ?, notizen = ?, 
        bewerbungsart = ?, startdatum = ?, updated_at = CURRENT_TIMESTAMP
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
