require("dotenv").config();
const pool = require("./database");

async function migrate() {
  const client = await pool.connect();

  try {
    console.log("Starting migration...");

    await pool.initDB();
    await client.query("BEGIN");

    console.log("Ensuring bewerbungen user mapping...");
    await client.query(`
      ALTER TABLE bewerbungen
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    `);

    console.log("Creating index on user_id...");
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_bewerbungen_user_id ON bewerbungen(user_id)
    `);

    await client.query("COMMIT");

    console.log("Migration successful!");
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
