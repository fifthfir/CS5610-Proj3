import PropTypes from "prop-types";
import { animalSearchOptions } from "../../utils/tags";
import "./SpeciesFilters.css";

const filterLabels = {
  q: "Search by name or keyword",
  subtype: "Animal Type",
  habitat: "Habitat",
  hasWings: "Has Wings",
  tailType: "Tail Type",
  legCount: "Number of Legs",
  size: "Size",
  color: "Main Color",
  region: "Region",
  toxicOrVenomous: "Toxic or Venomous",
};

const filterHelp = {
  subtype: "Useful when you want to browse a broad animal group first.",
  habitat: "Type of environment the animal is usually associated with.",
  hasWings: "Helpful for quickly separating birds, insects, and many mammals or reptiles.",
  tailType: "Visible tail shape or length.",
  legCount: "Use the visible number of legs when comparing species.",
  size: "General body size rather than exact measurements.",
  color: "Main visible body color.",
  region: "Broader geographic area where the animal is commonly associated.",
  toxicOrVenomous: "A simple safety clue for species known for venom or toxin risk.",
};

function formatOption(option) {
  return option
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function SpeciesFilters({ filters, onFilterChange, onReset, resultCount }) {
  return (
    <div className="species-filters-card">
      <h3>Browse Species</h3>
      <p className="species-filters-description">
        Browse is for relaxed field-guide exploration. Use Search when you do
        not know the animal’s name and want likely matches from observed traits.
      </p>

      <div className="species-filters-count">
        Showing <strong>{resultCount}</strong> species
      </div>

      <div className="species-filter-group">
        <label htmlFor="browse-q">{filterLabels.q}</label>
        <input
          id="browse-q"
          type="text"
          value={filters.q}
          onChange={(event) => onFilterChange("q", event.target.value)}
          placeholder="fox, owl, frog..."
        />
      </div>

      {Object.entries(animalSearchOptions).map(([field, options]) => (
        <div className="species-filter-group" key={field}>
          <label htmlFor={`browse-${field}`}>{filterLabels[field]}</label>

          {filterHelp[field] && (
            <p className="field-help">{filterHelp[field]}</p>
          )}

          <select
            id={`browse-${field}`}
            value={filters[field]}
            onChange={(event) => onFilterChange(field, event.target.value)}
          >
            <option value="">All</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button type="button" className="species-filter-reset" onClick={onReset}>
        Reset Filters
      </button>
    </div>
  );
}

SpeciesFilters.propTypes = {
  filters: PropTypes.shape({
    q: PropTypes.string.isRequired,
    subtype: PropTypes.string.isRequired,
    habitat: PropTypes.string.isRequired,
    hasWings: PropTypes.string.isRequired,
    tailType: PropTypes.string.isRequired,
    legCount: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    toxicOrVenomous: PropTypes.string.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  resultCount: PropTypes.number.isRequired,
};

export default SpeciesFilters;