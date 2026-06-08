require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://jobpilot:jobpilot@localhost:5432/jobpilot",
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

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
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Für bestehende Datenbanken: Spalten nachrüsten falls sie noch nicht existieren
  await pool.query(
    `ALTER TABLE bewerbungen ADD COLUMN IF NOT EXISTS gehalt TEXT`,
  );
  await pool.query(
    `ALTER TABLE bewerbungen ADD COLUMN IF NOT EXISTS waehrung TEXT`,
  );
  await pool.query(
    `ALTER TABLE bewerbungen ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE`,
  );
  await pool.query(
    `CREATE INDEX IF NOT EXISTS idx_bewerbungen_user_id ON bewerbungen(user_id)`,
  );
  await pool.query(
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image_url TEXT`,
  );

  console.log("Datenbank initialisiert");
}

module.exports = pool;
module.exports.initDB = initDB;
