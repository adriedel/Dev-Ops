import "./StatCards.css";
import { STATUS, STATUS_ICONS } from "../../utils/constants";

function StatCards({ stats }) {
  return (
    <section className="stats-container">
      <section className="stat-card in_planung">
        <div className="stat-icon">
          <img src={STATUS_ICONS[STATUS.IN_PLANUNG]} alt="In Planung" />
        </div>
        <div className="stat-number">{stats.in_planung ?? 0}</div>
        <div className="stat-label">In Planung</div>
      </section>
      <section className="stat-card beworben">
        <div className="stat-icon">
          <img src={STATUS_ICONS[STATUS.BEWORBEN]} alt="Beworben" />
        </div>
        <div className="stat-number">{stats.beworben ?? 0}</div>
        <div className="stat-label">Beworben</div>
      </section>

      <section className="stat-card stufe_weiter">
        <div className="stat-icon">
          <img src={STATUS_ICONS[STATUS.STUFE_WEITER]} alt="Stufe weiter" />
        </div>
        <div className="stat-number">{stats.stufe_weiter ?? 0}</div>
        <div className="stat-label">Stufe weiter</div>
      </section>

      <section className="stat-card angenommen">
        <div className="stat-icon">
          <img src={STATUS_ICONS[STATUS.ANGENOMMEN]} alt="Angenommen" />
        </div>
        <div className="stat-number">{stats.angenommen ?? 0}</div>
        <div className="stat-label">Angenommen</div>
      </section>

      <section className="stat-card abgelehnt">
        <div className="stat-icon">
          <img src={STATUS_ICONS[STATUS.ABGELEHNT]} alt="Abgelehnt" />
        </div>
        <div className="stat-number">{stats.abgelehnt ?? 0}</div>
        <div className="stat-label">Abgelehnt</div>
      </section>

      <section className="stat-card keine_antwort">
        <div className="stat-icon">
          <img src={STATUS_ICONS[STATUS.KEINE_ANTWORT]} alt="Keine Antwort" />
        </div>
        <div className="stat-number">{stats.keine_antwort ?? 0}</div>
        <div className="stat-label">Keine Antwort</div>
      </section>

      <section className="stat-card gesamt">
        <div className="stat-icon">
          <img src={STATUS_ICONS[STATUS.GESAMT]} alt="Gesamt" />
        </div>
        <div className="stat-number">{stats.gesamt ?? 0}</div>
        <div className="stat-label">Gesamt</div>
      </section>
    </section>
  );
}

export default StatCards;
