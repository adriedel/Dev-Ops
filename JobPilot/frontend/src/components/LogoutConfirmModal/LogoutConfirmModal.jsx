import { createPortal } from "react-dom";
import "./LogoutConfirmModal.css";
import DeleteIcon from "../../assets/icons/danger-broken.svg?react";

function LogoutConfirmModal({ onConfirm, onCancel }) {
  return createPortal(
    <div className="logout-modal-overlay" onClick={onCancel}>
      <div
        className="logout-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="logout-modal-header">
          <h2>Abmelden?</h2>
        </div>

        <div className="logout-modal-body">
          <div className="logout-warning-icon">
            <DeleteIcon className="logout-icon" aria-hidden="true" />
          </div>

          <p className="logout-modal-message">
            Möchtest du dich wirklich von deinem Konto abmelden?
          </p>

          <p className="logout-modal-warning">
            Du kannst dich jederzeit wieder anmelden.
          </p>
        </div>

        <div className="logout-modal-footer">
          <button
            className="logout-modal-button logout-cancel-button"
            onClick={onCancel}
          >
            Abbrechen
          </button>
          <button
            className="logout-modal-button logout-confirm-button"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default LogoutConfirmModal;
