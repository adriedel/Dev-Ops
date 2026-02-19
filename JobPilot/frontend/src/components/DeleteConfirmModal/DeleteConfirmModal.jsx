import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ bewerbung, onConfirm, onCancel }) {
  return (
    <div className="delete-modal-overlay" onClick={onCancel}>
      <div
        className="delete-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-modal-header">
          <h2>Bewerbung löschen?</h2>
        </div>

        <div className="delete-modal-body">
          <div className="delete-warning-icon">⚠️</div>
          <p className="delete-modal-message">
            Möchtest du die folgende Bewerbung wirklich löschen?
          </p>

          <div className="delete-bewerbung-info">
            <div className="delete-info-item">
              <span className="delete-info-label">Position:</span>
              <span className="delete-info-value">{bewerbung.position}</span>
            </div>
            <div className="delete-info-item">
              <span className="delete-info-label">Firma:</span>
              <span className="delete-info-value">{bewerbung.firma}</span>
            </div>
            {bewerbung.standort && (
              <div className="delete-info-item">
                <span className="delete-info-label">Standort:</span>
                <span className="delete-info-value">{bewerbung.standort}</span>
              </div>
            )}
          </div>

          <p className="delete-modal-warning">
            Diese Aktion kann nicht rückgängig gemacht werden.
          </p>
        </div>

        <div className="delete-modal-footer">
          <button
            className="delete-modal-button delete-cancel-button"
            onClick={onCancel}
          >
            Abbrechen
          </button>
          <button
            className="delete-modal-button delete-confirm-button"
            onClick={onConfirm}
          >
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
