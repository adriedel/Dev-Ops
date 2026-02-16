import "./header.css";
function Header() {
  return (
    <header>
      <section>
        <div className="app-icon">
          <img className="app-logo" src="/bag-white.svg" alt="JobPilot Logo" />
        </div>
        <h1 className="header-title">Bewerbungstracker - JobPilot</h1>
        <button
          className="theme-toggle"
          aria-label="Toggle dark mode"
          //onClick={onToggleDarkMode}
        >
          "☀️" : "🌙"
        </button>
        <button
          className="btn btn-application"
          //onClick={onNewBewerbung}>
        >
          <span>+</span> Neue Bewerbung
        </button>
      </section>
      <section>
        <p className="header-subtitle">
          Behalten Sie den Überblick über Ihre Bewerbungen
        </p>
      </section>
    </header>
  );
}

export default Header;
