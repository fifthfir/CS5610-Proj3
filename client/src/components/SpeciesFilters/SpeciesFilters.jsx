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
  region: "Region"
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
        Filter the encyclopedia using the same observation traits used in the
        search page.
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

      <button className="species-filter-reset" onClick={onReset}>
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
    region: PropTypes.string.isRequired
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  resultCount: PropTypes.number.isRequired
};

export default SpeciesFilters;
