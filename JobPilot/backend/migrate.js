require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgresql://localhost:5432/jobpilot",
});

async function migrate() {
  const client = await pool.connect();

  try {
    console.log("Starting migration...");

    await client.query("BEGIN");

    // 1. Users Tabelle erstellen
    console.log("Creating users table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. user_id zu bewerbungen hinzufügen (falls noch nicht existiert)
    console.log("Adding user_id column to bewerbungen...");
    await client.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'bewerbungen' AND column_name = 'user_id'
        ) THEN
          ALTER TABLE bewerbungen ADD COLUMN user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
        END IF;
      END $$;
    `);

    // 3. Index auf user_id für Performance
    console.log("Creating index on user_id...");
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_bewerbungen_user_id ON bewerbungen(user_id)
    `);

    await client.query("COMMIT");

    console.log("Migration successful!");
    console.log("Users table created");
    console.log("user_id column added to bewerbungen");
    console.log("Index created for performance");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Migration failed:", err.message);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(console.error);
