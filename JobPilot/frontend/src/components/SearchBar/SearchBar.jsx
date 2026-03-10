import { useEffect, useMemo, useRef, useState } from "react";
import "./SearchBar.css";
import { STATUS, STATUS_ICONS } from "../../utils/constants";

function SearchBar({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const statusOptions = useMemo(
    () => [
      { value: "alle", label: "Alle Status", icon: null },
      {
        value: STATUS.BEWORBEN,
        label: "Beworben",
        icon: STATUS_ICONS[STATUS.BEWORBEN],
      },
      {
        value: STATUS.STUFE_WEITER,
        label: "Stufe weiter",
        icon: STATUS_ICONS[STATUS.STUFE_WEITER],
      },
      {
        value: STATUS.ANGENOMMEN,
        label: "Angenommen",
        icon: STATUS_ICONS[STATUS.ANGENOMMEN],
      },
      {
        value: STATUS.ABGELEHNT,
        label: "Abgelehnt",
        icon: STATUS_ICONS[STATUS.ABGELEHNT],
      },
      {
        value: STATUS.KEINE_ANTWORT,
        label: "Keine Antwort",
        icon: STATUS_ICONS[STATUS.KEINE_ANTWORT],
      },
    ],
    [],
  );

  const selectedOption =
    statusOptions.find((option) => option.value === filterStatus) ||
    statusOptions[0];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleOptionSelect = (value) => {
    onFilterChange(value);
    setIsDropdownOpen(false);
  };

  return (
    <section className="controls">
      <div className="search-wrapper">
        <span className="search-icon">
          <img src="/search.svg" alt="Search" />
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Suche nach Firma oder Position..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <button className="filter-btn" title="Filter" aria-label="Filter">
        <img src="/sliders-horizontal.svg" alt="" aria-hidden="true" />
      </button>

      <div className="status-dropdown" ref={dropdownRef}>
        <button
          type="button"
          className="status-dropdown-trigger"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          <span>{selectedOption.label}</span>
          <span className="status-dropdown-chevron" aria-hidden="true">
            <img src="/chevron-down.svg" alt="" />
          </span>
        </button>

        {isDropdownOpen ? (
          <div
            className="status-dropdown-menu"
            role="listbox"
            aria-label="Status filtern"
          >
            {statusOptions.map((option) => {
              const isSelected = option.value === filterStatus;

              return (
                <button
                  type="button"
                  key={option.value}
                  className={`status-dropdown-option ${isSelected ? "selected" : ""}`}
                  onClick={() => handleOptionSelect(option.value)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="status-dropdown-option-left">
                    {option.icon ? (
                      <img
                        className="status-dropdown-option-icon"
                        src={option.icon}
                        alt=""
                        aria-hidden="true"
                      />
                    ) : null}
                    <span>{option.label}</span>
                  </span>
                  {isSelected ? (
                    <span className="status-dropdown-check">
                      <img src="/check.svg" alt="Check" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default SearchBar;
