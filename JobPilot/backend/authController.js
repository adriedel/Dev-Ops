const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("./database");

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_token";
const JWT_EXPIRES_IN = "2d";

async function register(req, res) {
  const { email, password, name } = req.body;

  //Validierung
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email, Passwort und Name sind erforderlich" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Das Passwort muss mindestens 8 Zeichen lang sein" });
  }

  try {
    //Prüfen, ob User bereits existiert
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email.toLowerCase()],
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Ein Benutzer mit dieser E-Mail-Adresse existiert bereits",
      });
    }

    //Passwort hashen
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //User erstellen
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at`,
      [email.toLowerCase(), hashedPassword, name || null],
    );

    const user = result.rows[0];

    //JWT Token erstellen
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({
      message: "Registrierung erfolgreich",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error("Fehler bei der Registrierung:", err);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
}

// Login
async function login(req, res) {
  const { email, password } = req.body;

  // Validierung
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email und Passwort sind erforderlich" });
  }

  try {
    // User finden
    const result = await pool.query(
      "SELECT id, email, password_hash, name FROM users WHERE email = $1",
      [email.toLowerCase()],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Ungültige Email oder Passwort" });
    }

    const user = result.rows[0];

    // Passwort prüfen
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Ungültige Email oder Passwort" });
    }

    // JWT Token erstellen
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({
      message: "Login erfolgreich",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Fehler beim Login" });
  }
}

// Get current user info
async function getCurrentUser(req, res) {
  try {
    const result = await pool.query(
      "SELECT id, email, name, created_at FROM users WHERE id = $1",
      [req.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User nicht gefunden" });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ error: "Fehler beim Laden des Users" });
  }
}

module.exports = {
  register,
  login,
  getCurrentUser,
};
