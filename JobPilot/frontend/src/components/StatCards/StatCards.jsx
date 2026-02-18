import "./StatCards.css";
import { STATUS, STATUS_ICONS } from "../../utils/constants";

function StatCards({ stats }) {
  return (
    <section className="stats-container">
      <section className="stat-card beworben">
        <div className="stat-icon">{STATUS_ICONS[STATUS.BEWORBEN]}</div>
        <div className="stat-number">{stats.beworben ?? 0}</div>
        <div className="stat-label">Beworben</div>
      </section>

      <section className="stat-card stufe_weiter">
        <div className="stat-icon">{STATUS_ICONS[STATUS.STUFE_WEITER]}</div>
        <div className="stat-number">{stats.stufe_weiter ?? 0}</div>
        <div className="stat-label">Stufe weiter</div>
      </section>

      <section className="stat-card angenommen">
        <div className="stat-icon">{STATUS_ICONS[STATUS.ANGENOMMEN]}</div>
        <div className="stat-number">{stats.angenommen ?? 0}</div>
        <div className="stat-label">Angenommen</div>
      </section>

      <section className="stat-card abgelehnt">
        <div className="stat-icon">{STATUS_ICONS[STATUS.ABGELEHNT]}</div>
        <div className="stat-number">{stats.abgelehnt ?? 0}</div>
        <div className="stat-label">Abgelehnt</div>
      </section>

      <section className="stat-card keine_antwort">
        <div className="stat-icon">{STATUS_ICONS[STATUS.KEINE_ANTWORT]}</div>
        <div className="stat-number">{stats.keine_antwort ?? 0}</div>
        <div className="stat-label">Keine Antwort</div>
      </section>

      <section className="stat-card gesamt">
        <div className="stat-icon">📈</div>
        <div className="stat-number">{stats.gesamt ?? 0}</div>
        <div className="stat-label">Gesamt</div>
      </section>
    </section>
  );
}

export default StatCards;
