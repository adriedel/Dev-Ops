import { useEffect, useRef, useState } from "react";
import "./BewerbungsModal.css";
import { STATUS, STATUS_LABELS } from "../../utils/constants";
import BeworbenIcon from "../../assets/icons/paperplane-applied.svg?react";
import StufeWeiterIcon from "../../assets/icons/arrow-step-further.svg?react";
import AngenommenIcon from "../../assets/icons/check-circle-accepted.svg?react";
import AbgelehntIcon from "../../assets/icons/cross-circle-denied.svg?react";
import KeineAntwortIcon from "../../assets/icons/clock-no-answer.svg?react";
import InPlanungIcon from "../../assets/icons/plan.svg?react";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";

function BewerbungsModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onChange,
  isEditing,
}) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusDropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setIsStatusOpen(false);
      return;
    }

    const handleOutsideClick = (event) => {
      if (!statusDropdownRef.current?.contains(event.target)) {
        setIsStatusOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
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

  if (!isOpen || !formData) return null;

  const selectedStatus = formData.status || STATUS.BEWORBEN;
  const SelectedStatusIcon = STATUS_ICON_COMPONENTS[selectedStatus];

  const handleStatusSelect = (status) => {
    onChange({
      target: {
        name: "status",
        value: status,
      },
    });
    setIsStatusOpen(false);
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
              <div className="status-select" ref={statusDropdownRef}>
                <button
                  type="button"
                  className="status-select-trigger"
                  onClick={() => setIsStatusOpen((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={isStatusOpen}
                >
                  <span className="status-select-value">
                    {SelectedStatusIcon && (
                      <SelectedStatusIcon
                        className="status-select-icon"
                        aria-hidden="true"
                      />
                    )}
                    <span>{STATUS_LABELS[selectedStatus]}</span>
                  </span>
                  <ChevronDownIcon
                    className={`status-select-chevron ${isStatusOpen ? "open" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {isStatusOpen ? (
                  <div
                    className="status-select-menu"
                    role="listbox"
                    aria-label="Status auswählen"
                  >
                    {statusOptions.map((status) => {
                      const isSelected = selectedStatus === status;
                      const OptionStatusIcon = STATUS_ICON_COMPONENTS[status];

                      return (
                        <button
                          type="button"
                          key={status}
                          className={`status-select-option ${isSelected ? "selected" : ""}`}
                          onClick={() => handleStatusSelect(status)}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <span className="status-select-option-left">
                            {OptionStatusIcon && (
                              <OptionStatusIcon
                                className="status-select-option-icon"
                                aria-hidden="true"
                              />
                            )}
                            <span>{STATUS_LABELS[status]}</span>
                          </span>
                          {isSelected ? (
                            <span className="status-select-check">✓</span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
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

          {formData.status !== STATUS.ABGELEHNT && (
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
