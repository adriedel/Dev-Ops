import "./BewerbungsModal.css";
import { STATUS } from "../../utils/constants";

function BewerbungsModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  isEditing,
}) {
  if (!isOpen || !formData) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? "Bewerbung bearbeiten" : "Neue Bewerbung"}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Schließen"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Unternehmen *</label>
              <input
                type="text"
                name="firma"
                placeholder="z.B. SAP"
                value={formData.firma}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                name="position"
                placeholder="z.B. Frontend Developer"
                value={formData.position}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Bewerbungsdatum *</label>
              <input
                type="date"
                name="datum"
                value={formData.datum}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={onChange}>
                <option value={STATUS.IN_PLANUNG}>📝 In Planung</option>
                <option value={STATUS.BEWORBEN}>✈ Beworben</option>
                <option value={STATUS.STUFE_WEITER}>→ Stufe weiter</option>
                <option value={STATUS.ANGENOMMEN}>✓ Angenommen</option>
                <option value={STATUS.ABGELEHNT}>✗ Abgelehnt</option>
                <option value={STATUS.KEINE_ANTWORT}>◷ Keine Antwort</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Arbeitsort</label>
              <input
                type="text"
                name="standort"
                placeholder="z.B. Berlin, Remote"
                value={formData.standort}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label>Gehalt</label>
              <input
                type="text"
                name="gehalt"
                placeholder="z.B. 50.000 - 60.000 €"
                value={formData.gehalt || ""}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Link zur Stellenanzeige</label>
            <input
              type="text"
              name="link"
              placeholder="https://..."
              value={formData.link || ""}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Ansprechpartner</label>
            <input
              type="text"
              name="ansprechpartner"
              placeholder="Name des Ansprechpartners"
              value={formData.ansprechpartner}
              onChange={onChange}
            />
          </div>

          {formData.status === STATUS.ANGENOMMEN && (
            <div className="form-group">
              <label>Startdatum</label>
              <input
                type="date"
                name="startdatum"
                value={formData.startdatum}
                onChange={onChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Notizen</label>
            <textarea
              name="notizen"
              placeholder="Gesprächsnotizen, wichtige Infos..."
              value={formData.notizen}
              onChange={onChange}
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Abbrechen
            </button>
            <button type="submit" className="btn-submit">
              {isEditing ? "Speichern" : "Hinzufügen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BewerbungsModal;
