import { useEffect, useMemo, useRef, useState } from "react";
import "./SearchBar.css";
import { STATUS } from "../../utils/constants";
import BeworbenIcon from "../../assets/icons/paperplane-applied.svg?react";
import StufeWeiterIcon from "../../assets/icons/arrow-step-further.svg?react";
import AngenommenIcon from "../../assets/icons/check-circle-accepted.svg?react";
import AbgelehntIcon from "../../assets/icons/cross-circle-denied.svg?react";
import KeineAntwortIcon from "../../assets/icons/clock-no-answer.svg?react";
import InPlanungIcon from "../../assets/icons/plan.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";
import SlidersIcon from "../../assets/icons/sliders-horizontal.svg?react";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";
import CheckIcon from "../../assets/icons/check.svg?react";

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
        value: STATUS.IN_PLANUNG,
        label: "In Planung",
        icon: InPlanungIcon,
      },
      {
        value: STATUS.BEWORBEN,
        label: "Beworben",
        icon: BeworbenIcon,
      },
      {
        value: STATUS.STUFE_WEITER,
        label: "Stufe weiter",
        icon: StufeWeiterIcon,
      },
      {
        value: STATUS.ANGENOMMEN,
        label: "Angenommen",
        icon: AngenommenIcon,
      },
      {
        value: STATUS.ABGELEHNT,
        label: "Abgelehnt",
        icon: AbgelehntIcon,
      },
      {
        value: STATUS.KEINE_ANTWORT,
        label: "Keine Antwort",
        icon: KeineAntwortIcon,
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
          <SearchIcon className="search-icon-svg" aria-hidden="true" />
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Suche nach Firma oder Position..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="status-dropdown" ref={dropdownRef}>
        <button
          type="button"
          className="status-dropdown-trigger"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
        >
          <span>
            <SlidersIcon className="filter-icon" aria-hidden="true" />
          </span>
          <span>{selectedOption.label}</span>
          <span className="status-dropdown-chevron" aria-hidden="true">
            <ChevronDownIcon className="chevron-icon" aria-hidden="true" />
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
              const OptionIcon = option.icon;

              return (
                <button
                  type="button"
                  key={option.value}
                  className={`status-dropdown-option ${option.value !== "alle" ? `status-option-${option.value}` : ""} ${isSelected ? "selected" : ""}`}
                  onClick={() => handleOptionSelect(option.value)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="status-dropdown-option-left">
                    {OptionIcon ? (
                      <OptionIcon
                        className="status-dropdown-option-icon"
                        aria-hidden="true"
                      />
                    ) : null}
                    <span>{option.label}</span>
                  </span>
                  {isSelected ? (
                    <span className="status-dropdown-check">
                      <CheckIcon
                        className="status-check-icon"
                        aria-hidden="true"
                      />
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
