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
    <section className="bewerbung-card" onMouseLeave={() => setShowMenu(false)}>
      <section className="card-header">
        <section className="card-title-section">
          <h3>{bewerbung.position}</h3>
          <div className="card-firma">
            <span>Emoji</span>
            <span>{bewerbung.firma}</span>
          </div>
        </section>

        <section className="card-menu-container">
          <button
            className="card-menu-button"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Menü öffnen"
          >
            ⋮
          </button>

          {showMenu && (
            <section className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => onEdit(bewerbung)}
              >
                <span>✏️</span>
                <span>Bearbeiten</span>
              </button>
              <div className="dropdown-divider"></div>
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
              <div className="dropdown-divider"></div>
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
            </section>
          )}
        </section>
      </section>

      <section className={`status-badge ${bewerbung.status}`}>
        <span>{STATUS_ICONS[bewerbung.status]}</span>
        <span>{STATUS_LABELS[bewerbung.status]}</span>
      </section>

      <div className={`status-badge ${bewerbung.status}`}>
        <span>{STATUS_ICONS[bewerbung.status]}</span>
        <span>{STATUS_LABELS[bewerbung.status]}</span>
      </div>

      <section className="card-details">
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
      </section>
    </section>
  );
}

export default BewerbungsCard;
