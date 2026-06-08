import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./header.css";
import { logout } from "../../services/auth";
import { API_BASE_URL } from "../../utils/constants";
import SunIcon from "../../assets/icons/sun.svg?react";
import MoonIcon from "../../assets/icons/moon.svg?react";
import BriefcaseIcon from "../../assets/icons/briefcase-white.svg?react";
import LogoutIcon from "../../assets/icons/logout.svg?react";
import ExternalIcon from "../../assets/icons/external.svg?react";
import LogoutConfirmModal from "../LogoutConfirmModal/LogoutConfirmModal";

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarUrl(user) {
  if (user?.profile_image_url) {
    const url = user.profile_image_url;
    return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
  }
  const seed = encodeURIComponent(user?.name || user?.email || "user");
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}

function UserAvatar({ user, size = 36 }) {
  const [imgError, setImgError] = useState(false);
  const avatarUrl = getAvatarUrl(user);

  if (imgError) {
    return (
      <span
        className="user-avatar-initials"
        style={{ width: size, height: size, fontSize: size * 0.38 }}
      >
        {getInitials(user?.name)}
      </span>
    );
  }

  return (
    <img
      src={avatarUrl}
      alt={user?.name || "Avatar"}
      className="user-avatar-img"
      style={{ width: size, height: size }}
      onError={() => setImgError(true)}
    />
  );
}

function Header({ darkMode, toggleDarkMode, onNewBewerbung, user }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const userMenuRef = useRef(null);

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

  useEffect(() => {
    if (!isUserMenuOpen) return;
    const handleOutsideClick = (e) => {
      if (!userMenuRef.current?.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
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

  const goToProfile = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    navigate("/profile");
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

          <button className="btn-new-bewerbung" onClick={onNewBewerbung}>
            <span className="btn-plus">+</span> {t("buttons.newApplication")}
          </button>

          {/* User avatar + dropdown */}
          <div className="user-menu" ref={userMenuRef}>
            <button
              className={`user-avatar-btn${isUserMenuOpen ? " open" : ""}`}
              onClick={() => setIsUserMenuOpen((v) => !v)}
              aria-label={t("profile.myProfile")}
              aria-expanded={isUserMenuOpen}
              title={user?.name || user?.email || t("profile.myProfile")}
            >
              <UserAvatar user={user} size={36} />
            </button>

            {isUserMenuOpen && (
              <div className="user-dropdown" role="menu">
                <div className="user-dropdown-header">
                  <UserAvatar user={user} size={40} />
                  <div className="user-dropdown-info">
                    <span className="user-dropdown-name">
                      {user?.name || t("profile.myProfile")}
                    </span>
                    <span className="user-dropdown-email">{user?.email}</span>
                  </div>
                </div>
                <hr className="user-dropdown-divider" />
                <button
                  className="user-dropdown-item"
                  onClick={goToProfile}
                  role="menuitem"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {t("profile.myProfile")}
                </button>
                <button
                  className="user-dropdown-item user-dropdown-logout"
                  onClick={handleLogout}
                  role="menuitem"
                >
                  <LogoutIcon width="16" height="16" aria-hidden="true" />
                  {t("header.logout")}
                </button>
              </div>
            )}
          </div>

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
              onClick={goToProfile}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mobile-menu-icon" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {t("profile.myProfile")}
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
