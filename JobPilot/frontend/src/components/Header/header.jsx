import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./header.css";
import { logout } from "../../services/auth";
import SunIcon from "../../assets/icons/sun.svg?react";
import MoonIcon from "../../assets/icons/moon.svg?react";
import BriefcaseIcon from "../../assets/icons/briefcase-white.svg?react";
import LogoutIcon from "../../assets/icons/logout.svg?react";
import ExternalIcon from "../../assets/icons/external.svg?react";
import LogoutConfirmModal from "../LogoutConfirmModal/LogoutConfirmModal";

function Header({ darkMode, toggleDarkMode, onNewBewerbung }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const headerRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleOutsideClick = (e) => {
      if (!headerRef.current?.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMenuOpen]);

  const handleLogout = () => {
    setIsMenuOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    logout();
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "de" ? "en" : "de";
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <header className="header" ref={headerRef}>
        <div className="header-left">
          <div className="app-icon">
            <BriefcaseIcon className="app-logo" aria-hidden="true" />
          </div>
          <div className="header-text">
            <h1 className="header-title">{t("header.title")}</h1>
            <p className="header-subtitle">{t("header.subtitle")}</p>
          </div>
        </div>

        <div className="header-right">
          <button
            className="btn-bookmarklet"
            onClick={() => navigate("/bookmarklet")}
            title={t("header.bookmarklet")}
          >
            <ExternalIcon className="btn-bookmarklet-icon" aria-hidden="true" />
            <span className="btn-bookmarklet-label">{t("header.bookmarklet")}</span>
          </button>

          <div className="theme-toggle-group">
            <button
              className={`theme-btn${!darkMode ? " active" : ""}`}
              onClick={() => darkMode && toggleDarkMode()}
              aria-label="Light mode"
              title="Hell"
            >
              <SunIcon className="theme-icon" aria-hidden="true" focusable="false" />
            </button>
            <button
              className={`theme-btn${darkMode ? " active" : ""}`}
              onClick={() => !darkMode && toggleDarkMode()}
              aria-label="Dark mode"
              title="Dunkel"
            >
              <MoonIcon className="theme-icon" aria-hidden="true" focusable="false" />
            </button>
          </div>

          <button
            className="language-toggle"
            onClick={toggleLanguage}
            title={i18n.language === "de" ? "Switch to English" : "Zu Deutsch wechseln"}
            aria-label={i18n.language === "de" ? "Switch to English" : "Switch to German"}
          >
            <img
              src={
                i18n.language === "de"
                  ? "/flags/flag-for-germany.svg"
                  : "/flags/flag-for-united-kingdom.svg"
              }
              alt={i18n.language === "de" ? "Deutsch" : "English"}
              className="language-flag"
            />
            <span className="language-code">{i18n.language.toUpperCase()}</span>
          </button>

          <button
            onClick={handleLogout}
            className="logout-button"
            title={t("header.logout")}
          >
            <LogoutIcon className="logout-icon" aria-hidden="true" />
            {t("header.logout")}
          </button>

          <button className="btn-new-bewerbung" onClick={onNewBewerbung}>
            <span className="btn-plus">+</span> {t("buttons.newApplication")}
          </button>

          {/* Hamburger — only rendered / visible via CSS on mobile */}
          <button
            className={`header-hamburger${isMenuOpen ? " open" : ""}`}
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="header-mobile-menu">
            <button
              className="mobile-menu-item mobile-menu-new"
              onClick={() => { setIsMenuOpen(false); onNewBewerbung(); }}
            >
              <span className="mobile-menu-plus">+</span>
              {t("buttons.newApplication")}
            </button>
            <button
              className="mobile-menu-item"
              onClick={() => { setIsMenuOpen(false); navigate("/bookmarklet"); }}
            >
              <ExternalIcon className="mobile-menu-icon" aria-hidden="true" />
              {t("header.bookmarklet")}
            </button>
            <button
              className="mobile-menu-item mobile-menu-logout"
              onClick={handleLogout}
            >
              <LogoutIcon className="mobile-menu-icon" aria-hidden="true" />
              {t("header.logout")}
            </button>
          </div>
        )}
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
