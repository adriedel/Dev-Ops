import "./header.css";
import SunIcon from "../../assets/icons/sun.svg?react";
import MoonIcon from "../../assets/icons/moon.svg?react";

function Header({ darkMode, toggleDarkMode, onNewBewerbung }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="app-icon">
          <img
            className="app-logo"
            src="/briefcase-white.svg"
            alt="Bewerbungstracker Logo"
          />
        </div>
        <div className="header-text">
          <h1 className="header-title">Bewerbungstracker</h1>
          <p className="header-subtitle">
            Behalten Sie den Überblick über Ihre Bewerbungen
          </p>
        </div>
      </div>

      <div className="header-right">
        <div className="theme-toggle-group">
          <button
            className={`theme-btn${!darkMode ? " active" : ""}`}
            onClick={() => darkMode && toggleDarkMode()}
            aria-label="Light mode"
            title="Hell"
          >
            <SunIcon
              className="theme-icon"
              aria-hidden="true"
              focusable="false"
            />
          </button>
          <button
            className={`theme-btn${darkMode ? " active" : ""}`}
            onClick={() => !darkMode && toggleDarkMode()}
            aria-label="Dark mode"
            title="Dunkel"
          >
            <MoonIcon
              className="theme-icon"
              aria-hidden="true"
              focusable="false"
            />
          </button>
        </div>
        <button className="btn-new-bewerbung" onClick={onNewBewerbung}>
          <span className="btn-plus">+</span> Neue Bewerbung
        </button>
      </div>
    </header>
  );
}

export default Header;
