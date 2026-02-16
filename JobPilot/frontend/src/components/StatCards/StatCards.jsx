function StatCards() {
  return (
    <section className="stats-container">
      <section className="stat-card beworben">
        <div className="stat-icon"></div>
        <div className="stat-number"></div>
        <div className="stat-label">Beworben</div>
      </section>

      <section className="stat-card stufe_weiter">
        <div className="stat-icon"></div>
        <div className="stat-number"></div>
        <div className="stat-label">Stufe Weiter</div>
      </section>

      <section className="stat-card angenommen">
        <div className="stat-icon"></div>
        <div className="stat-number"></div>
        <div className="stat-label">Angenommen</div>
      </section>

      <section className="stat-card abgelehnt">
        <div className="stat-icon"></div>
        <div className="stat-number"></div>
        <div className="stat-label">Abgelehnt</div>
      </section>

      <section className="stat-card keine_antwort">
        <div className="stat-icon"></div>
        <div className="stat-number"></div>
        <div className="stat-label">Keine Antwort</div>
      </section>

      <section className="stat-card gesamt">
        <div className="stat-icon"></div>
        <div className="stat-number"></div>
        <div className="stat-label">Gesamt</div>
      </section>
    </section>
  );
}

export default StatCards;
