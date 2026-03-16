import { useMemo, useState } from "react";
import { updateSighting } from "../../services/sightingsService";
import "./SightingList.css";
import PropTypes from 'prop-types';

function formatSavedDate(value) {
  if (!value) return "Unknown time";
  return new Date(value).toLocaleString();
}

function SightingList({ sightings, onDelete, onRefresh }) {
  const [selectedSubtype, setSelectedSubtype] = useState("all");
  const [selectedHabitat, setSelectedHabitat] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState("");
  const [draftNote, setDraftNote] = useState("");

  const subtypeOptions = useMemo(() => {
    const values = new Set();
    sightings.forEach((item) => {
      if (item.subtype) values.add(item.subtype);
    });
    return ["all", ...Array.from(values)];
  }, [sightings]);

  const habitatOptions = useMemo(() => {
    const values = new Set();
    sightings.forEach((item) => {
      if (item.habitat) values.add(item.habitat);
    });
    return ["all", ...Array.from(values)];
  }, [sightings]);

  const filteredSightings = useMemo(() => {
    return sightings.filter((item) => {
      const subtypeMatch =
        selectedSubtype === "all" || item.subtype === selectedSubtype;

      const habitatMatch =
        selectedHabitat === "all" || item.habitat === selectedHabitat;

      const text = searchText.trim().toLowerCase();
      const textMatch =
        text === "" ||
        (item.speciesName || "").toLowerCase().includes(text) ||
        (item.subtype || "").toLowerCase().includes(text) ||
        (item.region || "").toLowerCase().includes(text) ||
        (item.note || "").toLowerCase().includes(text);

      return subtypeMatch && habitatMatch && textMatch;
    });
  }, [sightings, selectedSubtype, selectedHabitat, searchText]);

  async function handleSaveNote(id) {
    await updateSighting(id, { note: draftNote });
    setEditingId("");
    setDraftNote("");
    onRefresh();
  }

  if (!sightings || sightings.length === 0) {
    return (
      <section className="my-sightings-section empty-state">
        <h2>My Sightings</h2>
        <p>You have not saved any sightings yet.</p>
      </section>
    );
  }

  return (
    <section className="my-sightings-section">
      <div className="section-header">
        <h2>My Sightings</h2>
        <p>Browse, filter, and update the wildlife records you have saved.</p>
      </div>

      <div className="list-toolbar">
        <input
          className="toolbar-search"
          placeholder="Search by name, subtype, region, or note"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="toolbar-select"
          value={selectedSubtype}
          onChange={(e) => setSelectedSubtype(e.target.value)}
        >
          {subtypeOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className="toolbar-select"
          value={selectedHabitat}
          onChange={(e) => setSelectedHabitat(e.target.value)}
        >
          {habitatOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="sightings-grid">
        {filteredSightings.map((s) => (
          <article className="sighting-card" key={s._id}>
            <div className="sighting-image-wrap">
              <img
                src={
                  s.imageUrl ||
                  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop"
                }
                alt={s.speciesName || "Saved species"}
                className="sighting-image"
              />
            </div>

            <div className="sighting-content">
              <h3>{s.speciesName || "Unnamed sighting"}</h3>

              <div className="meta-row">
                {s.subtype && <span className="meta-pill">{s.subtype}</span>}
                {s.region && <span className="meta-pill">{s.region}</span>}
                {s.habitat && <span className="meta-pill">{s.habitat}</span>}
              </div>

              <div className="trait-grid">
                <span className="trait-item"><strong>Wings:</strong> {s.hasWings || "unknown"}</span>
                <span className="trait-item"><strong>Tail:</strong> {s.tailType || "unknown"}</span>
                <span className="trait-item"><strong>Legs:</strong> {s.legCount || "unknown"}</span>
                <span className="trait-item"><strong>Size:</strong> {s.size || "unknown"}</span>
                <span className="trait-item"><strong>Color:</strong> {s.color || "unknown"}</span>
              </div>

              {s.description && (
                <p className="sighting-description">{s.description}</p>
              )}

            <div className="note-block">
            <div className="note-header">
                <strong>Personal Note</strong>

                {editingId !== s._id && (
                <button
                    type="button"
                    className="edit-note-button"
                    onClick={() => {
                    setEditingId(s._id);
                    setDraftNote(s.note || "");
                    }}
                >
                    Edit Note
                </button>
                )}
            </div>

            {editingId === s._id ? (
                <div className="note-editor">
                <textarea
                    className="note-input"
                    value={draftNote}
                    onChange={(e) => setDraftNote(e.target.value)}
                    rows="4"
                    placeholder="Add a short observation or reminder..."
                />

                <div className="note-actions">
                    <button
                    type="button"
                    className="primary-button"
                    onClick={() => handleSaveNote(s._id)}
                    >
                    Save Note
                    </button>

                    <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                        setEditingId("");
                        setDraftNote("");
                    }}
                    >
                    Cancel
                    </button>
                </div>
                </div>
            ) : (
                <div className="saved-note-box">
                <p className="saved-note">{s.note || "No note yet."}</p>
                </div>
            )}
            </div>

              <p className="saved-time">Saved: {formatSavedDate(s.savedAt)}</p>

              <div className="card-actions">
                <button
                  type="button"
                  className="danger-button"
                  onClick={() => onDelete(s._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

SightingList.propTypes = {
  sightings: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      speciesName: PropTypes.string,
      subtype: PropTypes.string,
      habitat: PropTypes.string,
      note: PropTypes.string,
      savedAt: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
export default SightingList;