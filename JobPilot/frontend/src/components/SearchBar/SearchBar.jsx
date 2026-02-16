function SearchBar() {
  return (
    <section>
      <input
        type="text"
        className="search-input"
        placeholder="Suche nach Firma oder Position..."
      />
      <select className="filter-select">
        <option value="alle">Alle Status</option>
        <option value="beworben">Beworben</option>
        <option value="stufe_weiter">Stufe Weiter</option>
        <option value="angenommen">Angenommen</option>
        <option value="abgelehnt">Abgelehnt</option>
        <option value="keine_antwort">Keine Antwort</option>
      </select>
    </section>
  );
}

export default SearchBar;
