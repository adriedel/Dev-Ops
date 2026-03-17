import { useState } from "react";
import "./BewerbungsCard.css";
import { STATUS, STATUS_LABELS, STATUS_ICONS } from "../../utils/constants";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

function BewerbungsCard({ bewerbung, onEdit, onDelete, onStatusChange }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleDeleteClick = () => {
    setShowMenu(false);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    onDelete(bewerbung.id);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const statusOptions = [
    STATUS.IN_PLANUNG,
    STATUS.BEWORBEN,
    STATUS.STUFE_WEITER,
    STATUS.ANGENOMMEN,
    STATUS.ABGELEHNT,
    STATUS.KEINE_ANTWORT,
  ];

  return (
    <article className="bewerbung-card" onMouseLeave={() => setShowMenu(false)}>
      <div className="card-header">
        <div className="card-title-section">
          <h3 className="card-position">{bewerbung.position}</h3>
          <div className="card-firma">
            <img
              className="meta-icon"
              src="/building-1-line.svg"
              alt=""
              aria-hidden="true"
            />
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
                <img src="/pencil.svg" alt="" aria-hidden="true" />
                <span>Bearbeiten</span>
              </button>
              <div className="dropdown-divider" />
              {statusOptions.map((status) => {
                const isCurrentStatus = bewerbung.status === status;

                return (
                  <button
                    key={status}
                    className={`dropdown-item ${isCurrentStatus ? "dropdown-item-current" : ""}`}
                    onClick={() => handleStatusChange(status)}
                    disabled={isCurrentStatus}
                  >
                    <img src={STATUS_ICONS[status]} alt="" aria-hidden="true" />
                    <span>{STATUS_LABELS[status]}</span>
                  </button>
                );
              })}
              <div className="dropdown-divider" />
              <button
                className="dropdown-item dropdown-item-delete"
                onClick={handleDeleteClick}
              >
                <img src="/trash.svg" alt="" aria-hidden="true" />
                <span>Löschen</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`status-badge status-${bewerbung.status}`}>
        <img
          src={STATUS_ICONS[bewerbung.status]}
          alt={STATUS_LABELS[bewerbung.status]}
        />
        <span>{STATUS_LABELS[bewerbung.status]}</span>
      </div>

      <div className="card-details">
        <div className="detail-item">
          <img
            className="meta-icon"
            src="/calendar.svg"
            alt=""
            aria-hidden="true"
          />
          <span>{formatDate(bewerbung.datum)}</span>
        </div>
        {bewerbung.standort && (
          <div className="detail-item">
            <img
              className="meta-icon"
              src="/map.svg"
              alt=""
              aria-hidden="true"
            />
            <span>{bewerbung.standort}</span>
          </div>
        )}
        {bewerbung.ansprechpartner && (
          <div className="detail-item">
            <img
              className="meta-icon"
              src="/person-2.svg"
              alt=""
              aria-hidden="true"
            />
            <span>{bewerbung.ansprechpartner}</span>
          </div>
        )}
        {bewerbung.link && (
          <div className="detail-item">
            <img
              className="meta-icon"
              src="/external.svg"
              alt=""
              aria-hidden="true"
            />
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
            <img
              className="meta-icon"
              src="/calendar.svg"
              alt=""
              aria-hidden="true"
            />
            <span>Start am {formatDate(bewerbung.startdatum)}</span>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          bewerbung={bewerbung}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </article>
  );
}

export default BewerbungsCard;
