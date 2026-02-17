import { STATUS, BEWERBUNGSARTEN } from "../../utils/constants";

function BewerbungsModal(
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  isEditing,
) {
  if (!isOpen || !formData) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <section className="modal-overlay" onClick={onClose}>
      <section className="modal" onClick={(e) => e.stopPropagation()}>
        <div>
          <h2>{isEditing ? `Bewerbung bearbeiten` : `Neue Bewerbung`}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Firma *</label>
            <input
              type="text"
              name="firma"
              value={formData.firma}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              required
            >
              <option value={STATUS.BEWORBEN}>Beworben</option>
              <option value={STATUS.STUFE_WEITER}>Stufe weiter</option>
              <option value={STATUS.ANGENOMMEN}>Angenommen</option>
              <option value={STATUS.ABGELEHNT}>Abgelehnt</option>
              <option value={STATUS.KEINE_ANTWORT}>Keine Antwort</option>
            </select>
          </div>

          <div className="form-group">
            <label>Datum *</label>
            <input
              type="date"
              name="datum"
              value={formData.datum}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Standort</label>
            <input
              type="text"
              name="standort"
              value={formData.standort}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Ansprechpartner</label>
            <input
              type="text"
              name="ansprechpartner"
              value={formData.ansprechpartner}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label>Bewerbungsart</label>
            <select
              name="bewerbungsart"
              value={formData.bewerbungsart}
              onChange={onChange}
            >
              {BEWERBUNGSARTEN.map((art) => (
                <option key={art} value={art}>
                  {art}
                </option>
              ))}
            </select>
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
              value={formData.notizen}
              onChange={onChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Abbrechen
            </button>
            <button type="submit" className="btn-submit">
              {isEditing ? "Speichern" : "Erstellen"}
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}

export default BewerbungsModal;
