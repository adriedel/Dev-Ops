require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgresql://localhost:5432/jobpilot",
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bewerbungen (
      id SERIAL PRIMARY KEY,
      position TEXT NOT NULL,
      firma TEXT NOT NULL,
      status TEXT NOT NULL,
      datum TEXT NOT NULL,
      standort TEXT,
      ansprechpartner TEXT,
      notizen TEXT,
      bewerbungsart TEXT,
      startdatum TEXT,
      link TEXT,
      gehalt TEXT,
      waehrung TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Für bestehende Datenbanken: Spalte nachrüsten falls sie noch nicht existiert
  await pool.query(
    `ALTER TABLE bewerbungen ADD COLUMN IF NOT EXISTS gehalt TEXT`,
  );
  await pool.query(
    `ALTER TABLE bewerbungen ADD COLUMN IF NOT EXISTS waehrung TEXT`,
  );

  console.log("Datenbank initialisiert");
}

initDB().catch(console.error);

module.exports = pool;
