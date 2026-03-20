import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SpeciesFilters from "../components/SpeciesFilters/SpeciesFilters";
import SpeciesGrid from "../components/SpeciesGrid/SpeciesGrid";
import SpeciesDetailModal from "../components/SpeciesDetailModal/SpeciesDetailModal";
import SpeciesForm from "../components/SpeciesForm/SpeciesForm";
import {
  fetchSpecies,
  createSpecies,
  updateSpecies,
  deleteSpecies
} from "../services/speciesService";
import "./BrowsePage.css";

const initialFilters = {
  q: "",
  subtype: "",
  habitat: "",
  hasWings: "",
  tailType: "",
  legCount: "",
  size: "",
  color: "",
  region: ""
};

function BrowsePage({ currentUser }) {
  const [filters, setFilters] = useState(initialFilters);
  const [species, setSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const [formMode, setFormMode] = useState(null);
  const [editingSpecies, setEditingSpecies] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    let cancelled = false;

    async function loadSpecies() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchSpecies(filters);

        if (!cancelled) {
          setSpecies(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load species.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSpecies();

    return () => {
      cancelled = true;
    };
  }, [filters, refreshKey]);

  function handleFilterChange(field, value) {
    setFilters((prev) => ({
      ...prev,
      [field]: value
    }));
  }

  function handleReset() {
    setFilters(initialFilters);
  }

  function handleOpenCreate() {
    setFormError("");
    setEditingSpecies(null);
    setFormMode("create");
    setSelectedSpecies(null);
  }

  function handleOpenEdit(speciesItem) {
    setFormError("");
    setEditingSpecies(speciesItem);
    setFormMode("edit");
    setSelectedSpecies(null);
  }

  function handleCloseForm() {
    setFormError("");
    setEditingSpecies(null);
    setFormMode(null);
  }

  async function handleSaveSpecies(formData) {
    try {
      setIsSaving(true);
      setFormError("");

      if (formMode === "edit" && editingSpecies?._id) {
        await updateSpecies(currentUser, editingSpecies._id, formData);
      } else {
        await createSpecies(currentUser, formData);
      }

      handleCloseForm();
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      setFormError(err.message || "Failed to save species.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteSpecies(speciesItem) {
    const confirmed = window.confirm(
      `Delete "${speciesItem.commonName}" from the species database?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteSpecies(currentUser, speciesItem._id);

      if (selectedSpecies?._id === speciesItem._id) {
        setSelectedSpecies(null);
      }

      if (editingSpecies?._id === speciesItem._id) {
        handleCloseForm();
      }

      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      setError(err.message || "Failed to delete species.");
    }
  }

  return (
    <>
      <div className="browse-page">
        <aside className="browse-sidebar">
          <SpeciesFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            resultCount={species.length}
          />
        </aside>

        <section className="browse-main">
          <div className="browse-header-card">
            <div className="browse-header-top">
              <div>
                <p className="browse-eyebrow">Wildlife Encyclopedia</p>
                <h2>Browse species by traits, habitat, and region</h2>
                <p>
                  Explore species entries directly to compare traits and better
                  connect what you observe outdoors to actual organisms in the
                  database.
                </p>
              </div>

              {isAdmin && (
                <button
                  className="browse-admin-button"
                  onClick={handleOpenCreate}
                >
                  Add Species
                </button>
              )}
            </div>
          </div>

          {formMode && isAdmin && (
            <SpeciesForm
              mode={formMode}
              initialData={editingSpecies}
              onSubmit={handleSaveSpecies}
              onCancel={handleCloseForm}
              isSaving={isSaving}
              errorMessage={formError}
            />
          )}

          {loading && (
            <div className="browse-status-card">Loading species...</div>
          )}

          {error && !loading && (
            <div className="browse-status-card error">{error}</div>
          )}

          {!loading && !error && (
            <SpeciesGrid
              species={species}
              onSelectSpecies={setSelectedSpecies}
            />
          )}
        </section>
      </div>

      <SpeciesDetailModal
        species={selectedSpecies}
        onClose={() => setSelectedSpecies(null)}
        currentUser={currentUser}
        onEdit={handleOpenEdit}
        onDelete={handleDeleteSpecies}
      />
    </>
  );
}

BrowsePage.propTypes = {
  currentUser: PropTypes.shape({
    userId: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string
  })
};

BrowsePage.defaultProps = {
  currentUser: null
};

export default BrowsePage;
