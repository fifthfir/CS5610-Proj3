import PropTypes from "prop-types";
import SpeciesCard from "../SpeciesCard/SpeciesCard";
import "./SpeciesGrid.css";

function SpeciesGrid({ species, onSelectSpecies }) {
  if (species.length === 0) {
    return (
      <div className="species-grid-empty">
        <h3>No species matched these filters.</h3>
        <p>
          Try broadening your filters or clearing them to explore more entries.
        </p>
      </div>
    );
  }

  return (
    <div className="species-grid">
      {species.map((item) => (
        <SpeciesCard key={item._id} species={item} onSelect={onSelectSpecies} />
      ))}
    </div>
  );
}

SpeciesGrid.propTypes = {
  species: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      commonName: PropTypes.string.isRequired,
      scientificName: PropTypes.string,
      subtype: PropTypes.string,
      habitat: PropTypes.string,
      region: PropTypes.string,
      imageUrl: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired,
  onSelectSpecies: PropTypes.func.isRequired
};

export default SpeciesGrid;
