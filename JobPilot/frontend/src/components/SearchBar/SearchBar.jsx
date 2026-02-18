import "./SearchBar.css";
import { STATUS } from "../../utils/constants";

function SearchBar({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
}) {
  return (
    <section className="controls">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Suche nach Firma oder Position..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <button className="filter-btn" title="Filter" aria-label="Filter">
        ☰
      </button>

      <select
        className="filter-select"
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="alle">Alle Status</option>
        <option value={STATUS.BEWORBEN}>Beworben</option>
        <option value={STATUS.STUFE_WEITER}>Stufe Weiter</option>
        <option value={STATUS.ANGENOMMEN}>Angenommen</option>
        <option value={STATUS.ABGELEHNT}>Abgelehnt</option>
        <option value={STATUS.KEINE_ANTWORT}>Keine Antwort</option>
      </select>
    </section>
  );
}

export default SearchBar;
