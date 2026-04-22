import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { createSighting } from "../../services/sightingsService";
import "./SpeciesDetailModal.css";

const inferredToxicSpecies = [
  "king cobra",
  "rattlesnake",
  "black widow",
  "poison dart frog",
  "paper wasp",
  "jellyfish",
  "platypus",
  "komodo dragon",
];

function formatValue(value) {
  if (!value) {
    return "Unknown";
  }

  return value
    .toString()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function inferToxicOrVenomous(species) {
  if (species?.toxicOrVenomous === "yes" || species?.toxicOrVenomous === "no") {
    return species.toxicOrVenomous;
  }

  const combined = `${species?.commonName || ""} ${species?.scientificName || ""}`
    .toLowerCase()
    .trim();

  return inferredToxicSpecies.some((term) => combined.includes(term))
    ? "yes"
    : "no";
}

function buildOverview(species) {
  if (species.overview) {
    return species.overview;
  }

  return `${species.commonName} is listed in WatWildlife as a ${formatValue(
    species.size
  ).toLowerCase()} ${formatValue(species.subtype).toLowerCase()} associated with ${formatValue(
    species.habitat
  ).toLowerCase()} environments in ${formatValue(
    species.region
  )}. This overview is meant to give users a quick starting point before they continue with more detailed field-guide research.`;
}

function buildAppearance(species) {
  if (species.appearance) {
    return species.appearance;
  }

  return `For visible identification, start with its main color (${formatValue(
    species.color
  )}), overall size (${formatValue(species.size)}), tail type (${formatValue(
    species.tailType
  )}), and leg count (${formatValue(
    species.legCount
  )}). ${
    species.hasWings === "yes"
      ? "The presence of wings is also an important clue."
      : "The absence of wings helps separate it from many birds and insects."
  }`;
}

function buildHabitatDetails(species) {
  if (species.habitatDetails) {
    return species.habitatDetails;
  }

  return `This species is grouped under ${formatValue(
    species.habitat
  ).toLowerCase()} habitat, which means users are most likely to think about environments of that type when comparing possibilities. Habitat does not mean the continent or country; it means the kind of place the animal was living in or moving through.`;
}

function buildRegionDetails(species) {
  if (species.regionDetails) {
    return species.regionDetails;
  }

  return `In WatWildlife, this species is associated with ${formatValue(
    species.region
  )}. Region is the broader geographic area where the animal is commonly linked in the database, and it should be used together with habitat rather than instead of habitat.`;
}

function buildBehavior(species) {
  if (species.behavior) {
    return species.behavior;
  }

  return `Behavior can help with identification even when you only get a short look. As a ${formatValue(
    species.subtype
  ).toLowerCase()}, this animal may be easier to notice by how it moves, where it pauses, and whether it appears comfortable on land, in trees, in water, or near open terrain.`;
}

function buildIdentificationTips(species) {
  if (species.identificationTips) {
    return species.identificationTips;
  }

  return `To identify ${species.commonName}, compare multiple clues at once instead of relying on a single trait. The strongest combination in this profile is usually its ${formatValue(
    species.color
  ).toLowerCase()} coloration, ${formatValue(
    species.size
  ).toLowerCase()} body size, ${formatValue(
    species.habitat
  ).toLowerCase()} habitat association, and ${formatValue(
    species.region
  ).toLowerCase()} region.`;
}

function buildRiskToHumans(species, toxicOrVenomous) {
  if (species.riskToHumans) {
    return species.riskToHumans;
  }

  if (toxicOrVenomous === "yes") {
    return `WatWildlife flags this animal as toxic or venomous for simple user safety. Even if risk depends on the exact species, age, or situation, users should avoid touching, handling, or provoking it and should rely on local wildlife guidance whenever safety is uncertain.`;
  }

  return `This animal is not currently flagged here as toxic or venomous. That does not mean it should be handled casually. Wild animals can still bite, scratch, carry disease, or become dangerous if stressed, so observation from a respectful distance is still the best practice.`;
}

function buildBenefitsToHumans(species) {
  if (species.benefitsToHumans) {
    return species.benefitsToHumans;
  }

  const subtype = (species.subtype || "").toLowerCase();

  if (subtype === "insect") {
    return "Many insects benefit humans by pollinating plants, supporting food webs, recycling organic matter, or helping control other pest species. Even species that people dislike can still play an important ecological role.";
  }

  if (subtype === "bird") {
    return "Birds can benefit humans through seed dispersal, insect control, carrion cleanup, and ecosystem monitoring. They also have educational, cultural, and recreational value for people interested in wildlife watching.";
  }

  if (subtype === "amphibian") {
    return "Amphibians often benefit humans by helping control insect populations and by acting as indicators of environmental health, especially in wetlands and freshwater systems.";
  }

  if (subtype === "reptile") {
    return "Reptiles can benefit humans by controlling rodent or insect populations and by serving as important parts of balanced ecosystems. They are also valuable for education, conservation, and scientific study.";
  }

  if (subtype === "fish") {
    return "Fish can benefit humans through food webs, fisheries, nutrient cycling, ecological monitoring, and scientific understanding of aquatic systems. Even non-game species can be important indicators of water quality and habitat condition.";
  }

  return "Mammals can benefit humans through seed dispersal, grazing patterns, prey control, ecosystem engineering, tourism, education, and general ecological balance. The exact benefit depends on the species and the environment where it lives.";
}

function SpeciesDetailModal({
  species,
  onClose,
  currentUser,
  onEdit,
  onDelete,
}) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

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

  const toxicOrVenomous = useMemo(
    () => (species ? inferToxicOrVenomous(species) : "no"),
    [species]
  );

  if (!species) {
    return null;
  }

  const isAdmin = currentUser?.role === "admin";

  const overview = buildOverview(species);
  const appearance = buildAppearance(species);
  const habitatDetails = buildHabitatDetails(species);
  const regionDetails = buildRegionDetails(species);
  const behavior = buildBehavior(species);
  const identificationTips = buildIdentificationTips(species);
  const riskToHumans = buildRiskToHumans(species, toxicOrVenomous);
  const benefitsToHumans = buildBenefitsToHumans(species);

  async function handleSaveToSightings() {
    if (!currentUser) {
      setMessage("Please log in first to save this species.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await createSighting({
        speciesId: String(species._id),
        speciesName: species.commonName,
        category: species.category || "",
        subtype: species.subtype || "",
        habitat: species.habitat || "",
        hasWings: species.hasWings || "",
        tailType: species.tailType || "",
        legCount: species.legCount || "",
        size: species.size || "",
        color: species.color || "",
        region: species.region || "",
        imageUrl: species.imageUrl || "",
        description: species.description || "",
        overview,
        appearance,
        habitatDetails,
        regionDetails,
        behavior,
        identificationTips,
        riskToHumans,
        benefitsToHumans,
        toxicOrVenomous,
        note: "",
        status: "saved",
      });

      setMessage(`Saved ${species.commonName} to My Sightings.`);
    } catch (error) {
      setMessage(error.message || "Failed to save this species.");
    } finally {
      setSaving(false);
    }
  }

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

          <p className="species-modal-description">
            {species.description || overview}
          </p>

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
            <div>
              <strong>Toxic/Venomous:</strong> {formatValue(toxicOrVenomous)}
            </div>
          </div>

          {message && (
            <div className="status-message" role="status" aria-live="polite">
              {message}
            </div>
          )}

          <div className="species-modal-sections">
            <section className="species-modal-section">
              <h3>Overview</h3>
              <p>{overview}</p>
            </section>

            <section className="species-modal-section">
              <h3>Appearance and Visible Traits</h3>
              <p>{appearance}</p>
            </section>

            <section className="species-modal-section">
              <h3>Habitat</h3>
              <p>{habitatDetails}</p>
            </section>

            <section className="species-modal-section">
              <h3>Region and Range</h3>
              <p>{regionDetails}</p>
            </section>

            <section className="species-modal-section">
              <h3>Behavior</h3>
              <p>{behavior}</p>
            </section>

            <section className="species-modal-section">
              <h3>Identification Tips</h3>
              <p>{identificationTips}</p>
            </section>

            <section className="species-modal-section">
              <h3>Risk to Humans</h3>
              <p>{riskToHumans}</p>
            </section>

            <section className="species-modal-section">
              <h3>Benefits to Humans</h3>
              <p>{benefitsToHumans}</p>
            </section>
          </div>

          <div className="species-modal-actions">
            <button
              type="button"
              className="species-modal-save"
              onClick={handleSaveToSightings}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save to My Sightings"}
            </button>

            {isAdmin && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

SpeciesDetailModal.propTypes = {
  species: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
    description: PropTypes.string,
    overview: PropTypes.string,
    appearance: PropTypes.string,
    habitatDetails: PropTypes.string,
    regionDetails: PropTypes.string,
    behavior: PropTypes.string,
    identificationTips: PropTypes.string,
    riskToHumans: PropTypes.string,
    benefitsToHumans: PropTypes.string,
    toxicOrVenomous: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    userId: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
  }),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

SpeciesDetailModal.defaultProps = {
  species: null,
  currentUser: null,
};

export default SpeciesDetailModal;