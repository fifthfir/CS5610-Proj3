import { useState } from "react";
import PropTypes from "prop-types";
import { createSighting } from "../../services/sightingsService";
import "./CandidateResults.css";

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

function CandidateResults({ results, hasSearched, currentUser }) {
  const [savingId, setSavingId] = useState("");
  const [message, setMessage] = useState("");

  async function handleSave(species) {
    if (!currentUser) {
      setMessage("Please log in first.");
      return;
    }

    setSavingId(String(species._id));
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
        overview: species.overview || "",
        appearance: species.appearance || "",
        habitatDetails: species.habitatDetails || "",
        regionDetails: species.regionDetails || "",
        behavior: species.behavior || "",
        identificationTips: species.identificationTips || "",
        riskToHumans: species.riskToHumans || "",
        benefitsToHumans: species.benefitsToHumans || "",
        toxicOrVenomous: species.toxicOrVenomous || "no",
        note: "",
        status: "saved",
      });

      setMessage(`Saved ${species.commonName} to My Sightings.`);
    } catch (error) {
      setMessage(error.message || "Failed to save sighting.");
    } finally {
      setSavingId("");
    }
  }

  if (!hasSearched) {
    return (
      <section className="results-section empty-tip">
        <p>
          Start with the traits you noticed, then click{" "}
          <strong>Find Matches</strong> to see likely animal candidates.
        </p>
      </section>
    );
  }

  if (results.length === 0) {
    return (
      <section className="results-section empty-tip">
        <p>
          No animals matched that exact combination. Try removing one or two
          filters, especially safety or location filters, and search again.
        </p>
      </section>
    );
  }

  return (
    <section className="results-section">
      <div className="section-header">
        <h2>Likely Animal Matches</h2>
        <p>
          Review the best-fitting animals based on the clues you entered, then
          save the ones you want to revisit in My Sightings.
        </p>
      </div>

      {message && <div className="status-message">{message}</div>}

      <div className="results-grid">
        {results.map((result) => (
          <article className="species-card" key={result._id}>
            <div className="species-image-wrap">
              <img
                src={
                  result.imageUrl ||
                  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop"
                }
                alt={result.commonName}
                className="species-image"
              />
            </div>

            <div className="species-content">
              <h3>{result.commonName}</h3>

              <div className="meta-row">
                <span className="meta-pill">
                  {formatValue(result.subtype || "unknown type")}
                </span>
                <span className="meta-pill">
                  {formatValue(result.region || "unknown region")}
                </span>
                <span className="meta-pill">
                  {formatValue(result.habitat || "unknown habitat")}
                </span>
              </div>

              <div className="trait-grid">
                <span className="trait-item">
                  <strong>Wings:</strong> {formatValue(result.hasWings)}
                </span>
                <span className="trait-item">
                  <strong>Tail:</strong> {formatValue(result.tailType)}
                </span>
                <span className="trait-item">
                  <strong>Legs:</strong> {formatValue(result.legCount)}
                </span>
                <span className="trait-item">
                  <strong>Size:</strong> {formatValue(result.size)}
                </span>
                <span className="trait-item">
                  <strong>Color:</strong> {formatValue(result.color)}
                </span>
                <span className="trait-item">
                  <strong>Toxic/Venomous:</strong>{" "}
                  {formatValue(result.toxicOrVenomous || "no")}
                </span>
              </div>

              <p className="species-description">
                {result.description ||
                  "No additional description is available for this species yet."}
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={() => handleSave(result)}
                disabled={savingId === String(result._id)}
              >
                {savingId === String(result._id)
                  ? "Saving..."
                  : "Save to My Sightings"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

CandidateResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      commonName: PropTypes.string.isRequired,
      subtype: PropTypes.string,
      region: PropTypes.string,
      habitat: PropTypes.string,
      imageUrl: PropTypes.string,
      description: PropTypes.string,
      toxicOrVenomous: PropTypes.string,
    })
  ).isRequired,
  hasSearched: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    userId: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
  }),
};

CandidateResults.defaultProps = {
  currentUser: null,
};

export default CandidateResults;