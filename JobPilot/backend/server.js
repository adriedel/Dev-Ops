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
