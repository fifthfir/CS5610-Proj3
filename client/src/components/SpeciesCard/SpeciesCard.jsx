import PropTypes from "prop-types";
import "./SpeciesCard.css";

function formatValue(value) {
  if (!value) {
    return "Unknown";
  }

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function SpeciesCard({ species, onSelect }) {
  return (
    <article className="species-card">
      <div className="species-card-image-wrap">
        <img
          className="species-card-image"
          src={species.imageUrl}
          alt={species.commonName}
        />
      </div>

      <div className="species-card-body">
        <p className="species-card-type">{formatValue(species.subtype)}</p>
        <h3>{species.commonName}</h3>
        <p className="species-card-scientific">{species.scientificName}</p>

        <div className="species-card-tags">
          <span>{formatValue(species.habitat)}</span>
          <span>{formatValue(species.region)}</span>
          <span>{formatValue(species.color)}</span>
        </div>

        <p className="species-card-description">{species.description}</p>

        <button
          className="species-card-button"
          onClick={() => onSelect(species)}
        >
          View Details
        </button>
      </div>
    </article>
  );
}

SpeciesCard.propTypes = {
  species: PropTypes.shape({
    commonName: PropTypes.string.isRequired,
    scientificName: PropTypes.string,
    subtype: PropTypes.string,
    habitat: PropTypes.string,
    region: PropTypes.string,
    color: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default SpeciesCard;
