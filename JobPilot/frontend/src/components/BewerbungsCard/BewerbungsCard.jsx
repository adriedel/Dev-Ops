import { useState } from "react";
import "./BewerbungsCard.css";
import { STATUS, STATUS_LABELS } from "../../utils/constants";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import BeworbenIcon from "../../assets/icons/paperplane-applied.svg?react";
import StufeWeiterIcon from "../../assets/icons/arrow-step-further.svg?react";
import AngenommenIcon from "../../assets/icons/check-circle-accepted.svg?react";
import AbgelehntIcon from "../../assets/icons/cross-circle-denied.svg?react";
import KeineAntwortIcon from "../../assets/icons/clock-no-answer.svg?react";
import InPlanungIcon from "../../assets/icons/plan.svg?react";
import PencilIcon from "../../assets/icons/pencil.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";
import CalendarIcon from "../../assets/icons/calendar.svg?react";
import MapIcon from "../../assets/icons/map.svg?react";
import PersonIcon from "../../assets/icons/person-2.svg?react";
import ExternalIcon from "../../assets/icons/external.svg?react";
import BuildingIcon from "../../assets/icons/building-1-line.svg?react";

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

  const STATUS_ICON_COMPONENTS = {
    [STATUS.IN_PLANUNG]: InPlanungIcon,
    [STATUS.BEWORBEN]: BeworbenIcon,
    [STATUS.STUFE_WEITER]: StufeWeiterIcon,
    [STATUS.ANGENOMMEN]: AngenommenIcon,
    [STATUS.ABGELEHNT]: AbgelehntIcon,
    [STATUS.KEINE_ANTWORT]: KeineAntwortIcon,
  };

  const CurrentStatusIcon = STATUS_ICON_COMPONENTS[bewerbung.status];

  return (
    <article className="bewerbung-card" onMouseLeave={() => setShowMenu(false)}>
      <div className="card-header">
        <div className="card-title-section">
          <h3 className="card-position">{bewerbung.position}</h3>
          <div className="card-firma">
            <BuildingIcon className="meta-icon" aria-hidden="true" />
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
                <PencilIcon className="meta-icon" aria-hidden="true" />
                <span>Bearbeiten</span>
              </button>
              <div className="dropdown-divider" />
              {statusOptions.map((status) => {
                const isCurrentStatus = bewerbung.status === status;
                const StatusIcon = STATUS_ICON_COMPONENTS[status];

                return (
                  <button
                    key={status}
                    className={`dropdown-item ${isCurrentStatus ? "dropdown-item-current" : ""}`}
                    onClick={() => handleStatusChange(status)}
                    disabled={isCurrentStatus}
                  >
                    {StatusIcon && (
                      <StatusIcon className="meta-icon" aria-hidden="true" />
                    )}
                    <span>{STATUS_LABELS[status]}</span>
                  </button>
                );
              })}
              <div className="dropdown-divider" />
              <button
                className="dropdown-item dropdown-item-delete"
                onClick={handleDeleteClick}
              >
                <TrashIcon className="meta-icon" aria-hidden="true" />
                <span>Löschen</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={`status-badge status-${bewerbung.status}`}>
        {CurrentStatusIcon && (
          <CurrentStatusIcon className="meta-icon" aria-hidden="true" />
        )}
        <span>{STATUS_LABELS[bewerbung.status]}</span>
      </div>

      <div className="card-details">
        <div className="detail-item">
          <CalendarIcon className="meta-icon" aria-hidden="true" />
          <span>{formatDate(bewerbung.datum)}</span>
        </div>
        {bewerbung.standort && (
          <div className="detail-item">
            <MapIcon className="meta-icon" aria-hidden="true" />
            <span>{bewerbung.standort}</span>
          </div>
        )}
        {bewerbung.ansprechpartner && (
          <div className="detail-item">
            <PersonIcon className="meta-icon" aria-hidden="true" />
            <span>{bewerbung.ansprechpartner}</span>
          </div>
        )}
      </div>

      {bewerbung.notizen && (
        <div className="card-notes-wrap">
          <p className="card-notizen">{bewerbung.notizen}</p>
        </div>
      )}

      {bewerbung.link && (
        <div className="detail-item detail-item-link card-link-row">
          <ExternalIcon className="meta-icon link-icon" aria-hidden="true" />
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

      {bewerbung.startdatum && bewerbung.status !== STATUS.ABGELEHNT && (
        <div className="card-footer">
          <div className="detail-item">
            <CalendarIcon className="meta-icon" aria-hidden="true" />
            <span>
              {bewerbung.status === STATUS.ANGENOMMEN
                ? "Start am "
                : "Möglicher Start "}
              {formatDate(bewerbung.startdatum)}
            </span>
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
