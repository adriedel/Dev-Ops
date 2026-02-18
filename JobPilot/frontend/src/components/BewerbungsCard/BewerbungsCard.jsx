import { useState } from "react";
import "./BewerbungsCard.css";
import { STATUS, STATUS_LABELS, STATUS_ICONS } from "../../utils/constants";

function BewerbungsCard({ bewerbung, onEdit, onDelete, onStatusChange }) {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(bewerbung.id, newStatus);
    setShowMenu(false);
  };

  return (
    <article className="bewerbung-card" onMouseLeave={() => setShowMenu(false)}>
      <div className="card-header">
        <div className="card-title-section">
          <h3 className="card-position">{bewerbung.position}</h3>
          <div className="card-firma">
            <span>🏢</span>
            <span>{bewerbung.firma}</span>
          </div>
        </div>

        <div className="card-menu-container">
          <button
            className="card-menu-button"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Menü öffnen"
          >
            ⋮
          </button>

          {showMenu && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => onEdit(bewerbung)}
              >
                <span>✏️</span>
                <span>Bearbeiten</span>
              </button>
              <div className="dropdown-divider" />
              <button
                className="dropdown-item"
                onClick={() => handleStatusChange(STATUS.BEWORBEN)}
              >
                <span>✈️</span>
                <span>Beworben</span>
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleStatusChange(STATUS.STUFE_WEITER)}
              >
                <span>➡️</span>
                <span>Stufe weiter</span>
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleStatusChange(STATUS.ANGENOMMEN)}
              >
                <span>✅</span>
                <span>Angenommen</span>
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleStatusChange(STATUS.ABGELEHNT)}
              >
                <span>❌</span>
                <span>Abgelehnt</span>
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleStatusChange(STATUS.KEINE_ANTWORT)}
              >
                <span>🕐</span>
                <span>Keine Antwort</span>
              </button>
              <div className="dropdown-divider" />
              <button
                className="dropdown-item dropdown-item-delete"
                onClick={() => {
                  setShowMenu(false);
                  onDelete(bewerbung.id);
                }}
              >
                <span>🗑️</span>
                <span>Löschen</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`status-badge status-${bewerbung.status}`}>
        <span>{STATUS_ICONS[bewerbung.status]}</span>
        <span>{STATUS_LABELS[bewerbung.status]}</span>
      </div>

      <div className="card-details">
        <div className="detail-item">
          <span>📅</span>
          <span>{formatDate(bewerbung.datum)}</span>
        </div>
        {bewerbung.standort && (
          <div className="detail-item">
            <span>📍</span>
            <span>{bewerbung.standort}</span>
          </div>
        )}
        {bewerbung.ansprechpartner && (
          <div className="detail-item">
            <span>👤</span>
            <span>{bewerbung.ansprechpartner}</span>
          </div>
        )}
        {bewerbung.link && (
          <div className="detail-item">
            <span>🔗</span>
            <a
              href={bewerbung.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              Stellenanzeige öffnen
            </a>
          </div>
        )}
      </div>

      {bewerbung.notizen && (
        <div className="card-footer">
          <p className="card-notizen">{bewerbung.notizen}</p>
        </div>
      )}

      {bewerbung.startdatum && bewerbung.status === STATUS.ANGENOMMEN && (
        <div className="card-footer">
          <div className="detail-item">
            <span>🎯</span>
            <span>Start am {formatDate(bewerbung.startdatum)}</span>
          </div>
        </div>
      )}
    </article>
  );
}

export default BewerbungsCard;
