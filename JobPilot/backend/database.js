const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "bewerbungen.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS bewerbungen (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      position TEXT NOT NULL,
      firma TEXT NOT NULL,
      status TEXT NOT NULL,
      datum TEXT NOT NULL,
      standort TEXT,
      ansprechpartner TEXT,
      notizen TEXT,
      bewerbungsart TEXT,
      startdatum TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Datenbank initialisiert");
});

module.exports = db;
