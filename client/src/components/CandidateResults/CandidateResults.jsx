import { useState } from "react";
import { createSighting } from "../../services/sightingsService";
import "./CandidateResults.css";
import PropTypes from 'prop-types';

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
        userId: currentUser.userId,
        username: currentUser.username,
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
        note: "",
        status: "saved"
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
        <p>Select filters and click <strong>Find Matches</strong> to see candidate species.</p>
      </section>
    );
  }

  if (results.length === 0) {
    return (
      <section className="results-section empty-tip">
        <p>No matching species found.</p>
      </section>
    );
  }

  return (
    <section className="results-section">
      <div className="section-header">
        <h2>Candidate Species</h2>
        <p>Review likely matches and save the ones you want to track.</p>
      </div>

      {message && <div className="status-message">{message}</div>}

      <div className="results-grid">
        {results.map((r) => (
          <article className="species-card" key={r._id}>
            <div className="species-image-wrap">
              <img
                src={
                  r.imageUrl ||
                  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop"
                }
                alt={r.commonName}
                className="species-image"
              />
            </div>

            <div className="species-content">
              <h3>{r.commonName}</h3>

              <div className="meta-row">
                <span className="meta-pill">{r.subtype || "unknown type"}</span>
                <span className="meta-pill">{r.region || "unknown region"}</span>
                <span className="meta-pill">{r.habitat || "unknown habitat"}</span>
              </div>

              <div className="trait-grid">
                <span className="trait-item"><strong>Wings:</strong> {r.hasWings || "unknown"}</span>
                <span className="trait-item"><strong>Tail:</strong> {r.tailType || "unknown"}</span>
                <span className="trait-item"><strong>Legs:</strong> {r.legCount || "unknown"}</span>
                <span className="trait-item"><strong>Size:</strong> {r.size || "unknown"}</span>
                <span className="trait-item"><strong>Color:</strong> {r.color || "unknown"}</span>
              </div>

              <p className="species-description">
                {r.description || "No additional description available."}
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={() => handleSave(r)}
                disabled={savingId === String(r._id)}
              >
                {savingId === String(r._id) ? "Saving..." : "Save to My Sightings"}
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
    })
  ).isRequired,
  hasSearched: PropTypes.bool.isRequired,
  currentUser: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }), 
};

export default CandidateResults;