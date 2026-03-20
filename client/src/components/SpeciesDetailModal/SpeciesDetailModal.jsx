import { useEffect } from "react";
import PropTypes from "prop-types";
import "./SpeciesDetailModal.css";

function formatValue(value) {
  if (!value) {
    return "Unknown";
  }

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function SpeciesDetailModal({
  species,
  onClose,
  currentUser,
  onEdit,
  onDelete
}) {
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (species) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [species, onClose]);

  if (!species) {
    return null;
  }

  const isAdmin = currentUser?.role === "admin";

  return (
    <div className="species-modal-overlay" onClick={onClose}>
      <div
        className="species-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="species-modal-title"
      >
        <button
          className="species-modal-close"
          onClick={onClose}
          aria-label="Close species details"
          type="button"
        >
          ×
        </button>

        <div className="species-modal-image-wrap">
          <img
            className="species-modal-image"
            src={species.imageUrl}
            alt={species.commonName}
          />
        </div>

        <div className="species-modal-content">
          <p className="species-modal-type">{formatValue(species.subtype)}</p>
          <h2 id="species-modal-title">{species.commonName}</h2>

          {species.scientificName && (
            <p className="species-modal-scientific">{species.scientificName}</p>
          )}

          <p className="species-modal-description">{species.description}</p>

          <div className="species-modal-facts">
            <div>
              <strong>Category:</strong> {formatValue(species.category)}
            </div>
            <div>
              <strong>Habitat:</strong> {formatValue(species.habitat)}
            </div>
            <div>
              <strong>Region:</strong> {formatValue(species.region)}
            </div>
            <div>
              <strong>Size:</strong> {formatValue(species.size)}
            </div>
            <div>
              <strong>Main Color:</strong> {formatValue(species.color)}
            </div>
            <div>
              <strong>Has Wings:</strong> {formatValue(species.hasWings)}
            </div>
            <div>
              <strong>Tail Type:</strong> {formatValue(species.tailType)}
            </div>
            <div>
              <strong>Number of Legs:</strong> {formatValue(species.legCount)}
            </div>
          </div>

          {isAdmin && (
            <div className="species-modal-admin-actions">
              <button
                type="button"
                className="species-modal-edit"
                onClick={() => onEdit(species)}
              >
                Edit Species
              </button>

              <button
                type="button"
                className="species-modal-delete"
                onClick={() => onDelete(species)}
              >
                Delete Species
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

SpeciesDetailModal.propTypes = {
  species: PropTypes.shape({
    _id: PropTypes.string,
    commonName: PropTypes.string,
    scientificName: PropTypes.string,
    category: PropTypes.string,
    subtype: PropTypes.string,
    habitat: PropTypes.string,
    region: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    hasWings: PropTypes.string,
    tailType: PropTypes.string,
    legCount: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    userId: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string
  }),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

SpeciesDetailModal.defaultProps = {
  species: null,
  currentUser: null
};

export default SpeciesDetailModal;
