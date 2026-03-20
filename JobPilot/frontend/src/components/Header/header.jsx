import { useState } from "react";
import "./header.css";
import { logout } from "../../services/auth";
import SunIcon from "../../assets/icons/sun.svg?react";
import MoonIcon from "../../assets/icons/moon.svg?react";
import BriefcaseIcon from "../../assets/icons/briefcase-white.svg?react";
import LogoutIcon from "../../assets/icons/logout.svg?react";
import LogoutConfirmModal from "../LogoutConfirmModal/LogoutConfirmModal";

function Header({ darkMode, toggleDarkMode, onNewBewerbung }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    logout();
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="app-icon">
            <BriefcaseIcon className="app-logo" aria-hidden="true" />
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
          <button
            onClick={handleLogout}
            className="logout-button"
            title="Abmelden"
          >
            <LogoutIcon className="logout-icon" aria-hidden="true" />
            Logout
          </button>
          <button className="btn-new-bewerbung" onClick={onNewBewerbung}>
            <span className="btn-plus">+</span> Neue Bewerbung
          </button>
        </div>
      </header>

      {isLogoutModalOpen && (
        <LogoutConfirmModal
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
        />
      )}
    </>
  );
}

export default Header;
