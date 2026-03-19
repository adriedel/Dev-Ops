import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginAPI } from "../services/auth";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginAPI(email, password);

      // Token und User speichern
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect zum Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>
            {" "}
            <img src="/Logo-JobPilot.svg" alt="JobPilot Logo" />
            JobPilot
          </h1>
          <p>Dein Bewerbungstracker</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Anmelden</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.de"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Passwort</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              required
              autoComplete="current-password"
              minLength={8}
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Wird geladen..." : "Anmelden"}
          </button>

          <p className="auth-switch">
            Noch kein Account? <Link to="/register">Jetzt registrieren</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
