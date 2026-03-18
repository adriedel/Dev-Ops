const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_token";

// Middleware um geschützte Routes zu schützen
function authenticateToken(req, res, next) {
  // Token aus Authorization Header holen
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: "Kein Token - Zugriff verweigert" });
  }

  try {
    // Token verifizieren
    const decoded = jwt.verify(token, JWT_SECRET);

    // User ID zum Request hinzufügen
    req.userId = decoded.userId;
    req.userEmail = decoded.email;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token abgelaufen - bitte neu einloggen" });
    }
    return res.status(403).json({ error: "Ungültiger Token" });
  }
}

module.exports = authenticateToken;
