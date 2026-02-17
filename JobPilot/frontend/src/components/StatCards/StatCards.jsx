import { STATUS_ICONS } from "../../utils/constants";

function StatCards({ stats }) {
  return (
    <section className="stats-container">
      <section className="stat-card beworben">
        <div className="stat-icon">{STATUS_ICONS.BEWORBEN}</div>
        <div className="stat-number">{stats.BEWORBEN}</div>
        <div className="stat-label">Beworben</div>
      </section>

      <section className="stat-card stufe_weiter">
        <div className="stat-icon">{STATUS_ICONS.STUFE_WEITER}</div>
        <div className="stat-number">{stats.STUFE_WEITER}</div>
        <div className="stat-label">Stufe Weiter</div>
      </section>

      <section className="stat-card angenommen">
        <div className="stat-icon">{STATUS_ICONS.ANGENOMMEN}</div>
        <div className="stat-number">{stats.ANGENOMMEN}</div>
        <div className="stat-label">Angenommen</div>
      </section>

      <section className="stat-card abgelehnt">
        <div className="stat-icon">{STATUS_ICONS.ABGELEHNT}</div>
        <div className="stat-number">{stats.ABGELEHNT}</div>
        <div className="stat-label">Abgelehnt</div>
      </section>

      <section className="stat-card keine_antwort">
        <div className="stat-icon">{STATUS_ICONS.KEINE_ANTWORT}</div>
        <div className="stat-number">{stats.KEINE_ANTWORT}</div>
        <div className="stat-label">Keine Antwort</div>
      </section>

      <section className="stat-card gesamt">
        <div className="stat-icon">📊</div>
        <div className="stat-number">{stats.GESAMT}</div>
        <div className="stat-label">Gesamt</div>
      </section>
    </section>
  );
}

export default StatCards;
