import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated } from "../services/auth";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  // Redirect zu Dashboard wenn schon eingeloggt
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">JobPilot</span>
          </div>
          <div className="nav-actions">
            <button className="nav-link" onClick={() => navigate("/login")}>
              Anmelden
            </button>
            <button
              className="btn-primary"
              onClick={() => navigate("/register")}
            >
              Kostenlos starten
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Bewerbungen im Griff.
            <br />
            Erfolg im Blick.
          </h1>
          <p className="hero-subtitle">
            Der smarte Bewerbungstracker für deine erfolgreiche Jobsuche.
            Behalte den Überblick, verwalte deine Bewerbungen und erreiche deine
            Karriereziele.
          </p>
          <div className="hero-cta">
            <button className="btn-hero" onClick={() => navigate("/register")}>
              Kostenlos starten
            </button>
            <button
              className="btn-secondary"
              onClick={() =>
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Mehr erfahren
            </button>
          </div>
          <p className="hero-note">
            ✓ Kostenlos ✓ Keine Kreditkarte nötig ✓ Datenschutz garantiert
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-container">
          <h2 className="section-title">Alles, was du brauchst</h2>
          <p className="section-subtitle">
            Professionelles Bewerbungsmanagement in einem Tool
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Live Statistiken</h3>
              <p>
                Behalte den Überblick mit Echtzeit-Statistiken über deine
                Bewerbungen und Erfolgsquoten.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Suche & Filter</h3>
              <p>
                Finde jede Bewerbung blitzschnell mit intelligenter Suche und
                flexiblen Filtern.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Notizen & Status</h3>
              <p>
                Dokumentiere jeden Schritt deiner Bewerbung mit Notizen,
                Status-Updates und wichtigen Details.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌙</div>
              <h3>Dark Mode</h3>
              <p>
                Arbeite komfortabel zu jeder Tageszeit mit automatischem Dark
                Mode Support.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Überall verfügbar</h3>
              <p>
                Greife von jedem Gerät auf deine Bewerbungen zu - Desktop,
                Tablet oder Smartphone.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Sicher & Privat</h3>
              <p>
                Deine Daten sind mit modernster Verschlüsselung geschützt. Nur
                du hast Zugriff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-container">
          <h2 className="section-title">So einfach geht's</h2>
          <p className="section-subtitle">
            In 3 Schritten zu deinem organisierten Bewerbungsprozess
          </p>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Account erstellen</h3>
              <p>
                Registriere dich kostenlos in wenigen Sekunden. Keine
                Kreditkarte nötig.
              </p>
            </div>

            <div className="step-arrow">→</div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Bewerbungen hinzufügen</h3>
              <p>
                Trage deine Bewerbungen ein und verwalte alle wichtigen
                Informationen an einem Ort.
              </p>
            </div>

            <div className="step-arrow">→</div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Erfolg tracken</h3>
              <p>
                Verfolge deinen Fortschritt, behalte den Überblick und erreiche
                deine Karriereziele.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Kostenlos</div>
            </div>
            <div className="stat">
              <div className="stat-number">🔐</div>
              <div className="stat-label">DSGVO-konform</div>
            </div>
            <div className="stat">
              <div className="stat-number">📱</div>
              <div className="stat-label">Responsive</div>
            </div>
            <div className="stat">
              <div className="stat-number">⚡</div>
              <div className="stat-label">Blitzschnell</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Bereit für den nächsten Karriereschritt?</h2>
          <p>
            Starte jetzt kostenlos und bringe Struktur in deine Bewerbungen.
          </p>
          <button className="btn-cta" onClick={() => navigate("/register")}>
            Kostenlos loslegen
          </button>
          <p className="cta-note">
            Keine Kreditkarte erforderlich • Jederzeit kündbar
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>JobPilot</h4>
              <p>Dein smarter Bewerbungstracker</p>
            </div>
            <div className="footer-section">
              <h4>Produkt</h4>
              <a href="#features">Features</a>
              <a href="/register">Kostenlos starten</a>
            </div>
            <div className="footer-section">
              <h4>Rechtliches</h4>
              <a href="/datenschutz">Datenschutz</a>
              <a href="/impressum">Impressum</a>
            </div>
            <div className="footer-section">
              <h4>Kontakt</h4>
              <a href="mailto:support@jobpilot.de">Support</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 JobPilot. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
