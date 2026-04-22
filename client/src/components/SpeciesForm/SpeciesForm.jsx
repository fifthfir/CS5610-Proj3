import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { animalSearchOptions } from "../../utils/tags";
import "./SpeciesForm.css";

const emptyForm = {
  commonName: "",
  scientificName: "",
  category: "animal",
  subtype: "",
  habitat: "",
  hasWings: "no",
  tailType: "none",
  legCount: "0",
  size: "",
  color: "",
  region: "",
  toxicOrVenomous: "no",
  imageUrl: "",
  description: "",
  overview: "",
  appearance: "",
  habitatDetails: "",
  regionDetails: "",
  behavior: "",
  identificationTips: "",
  riskToHumans: "",
  benefitsToHumans: "",
};

function formatOption(option) {
  return option
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function SpeciesForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isSaving,
  errorMessage,
}) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setFormData({
        commonName: initialData.commonName || "",
        scientificName: initialData.scientificName || "",
        category: "animal",
        subtype: initialData.subtype || "",
        habitat: initialData.habitat || "",
        hasWings: initialData.hasWings || "no",
        tailType: initialData.tailType || "none",
        legCount: initialData.legCount || "0",
        size: initialData.size || "",
        color: initialData.color || "",
        region: initialData.region || "",
        toxicOrVenomous: initialData.toxicOrVenomous || "no",
        imageUrl: initialData.imageUrl || "",
        description: initialData.description || "",
        overview: initialData.overview || "",
        appearance: initialData.appearance || "",
        habitatDetails: initialData.habitatDetails || "",
        regionDetails: initialData.regionDetails || "",
        behavior: initialData.behavior || "",
        identificationTips: initialData.identificationTips || "",
        riskToHumans: initialData.riskToHumans || "",
        benefitsToHumans: initialData.benefitsToHumans || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  function handleChange(field, value) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <section className="species-form-card">
      <div className="species-form-header">
        <div>
          <p className="species-form-eyebrow">Admin Species Manager</p>
          <h3>{mode === "edit" ? "Edit Species" : "Add New Species"}</h3>
        </div>

        <button
          type="button"
          className="species-form-cancel-top"
          onClick={onCancel}
        >
          Close
        </button>
      </div>

      <form className="species-form-grid" onSubmit={handleSubmit}>
        <div className="species-form-field">
          <label htmlFor="commonName">Common Name</label>
          <input
            id="commonName"
            value={formData.commonName}
            onChange={(event) => handleChange("commonName", event.target.value)}
            required
          />
        </div>

        <div className="species-form-field">
          <label htmlFor="scientificName">Scientific Name</label>
          <input
            id="scientificName"
            value={formData.scientificName}
            onChange={(event) =>
              handleChange("scientificName", event.target.value)
            }
            required
          />
        </div>

        <div className="species-form-field">
          <label htmlFor="subtype">Subtype</label>
          <select
            id="subtype"
            value={formData.subtype}
            onChange={(event) => handleChange("subtype", event.target.value)}
          >
            <option value="">Select subtype</option>
            {animalSearchOptions.subtype.map((option) => (
              <option key={option} value={option}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </div>

        <div className="species-form-field">
          <label htmlFor="habitat">Habitat</label>
          <select
            id="habitat"
            value={formData.habitat}
            onChange={(event) => handleChange("habitat", event.target.value)}
          >
            <option value="">Select habitat</option>
            {animalSearchOptions.habitat.map((option) => (
              <option key={option} value={option}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </div>

        <div className="species-form-field">
          <label htmlFor="hasWings">Has Wings</label>
          <select
            id="hasWings"
            value={formData.hasWings}
            onChange={(event) => handleChange("hasWings", event.target.value)}
          >
            {animalSearchOptions.hasWings.map((option) => (
              <option key={option} value={option}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </div>

        <div className="species-form-field">
          <label htmlFor="tailType">Tail Type</label>
          <select
            id="tailType"
            value={formData.tailType}
            onChange={(event) => handleChange("tailType", event.target.value)}
          >
            {animalSearchOptions.tailType.map((option) => (
              <option key={option} value={option}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </div>

        <div className="species-form-field">
          <label htmlFor="legCount">Number of Legs</label>
          <select
            id="legCount"
            value={formData.legCount}
            onChange={(event) => handleChange("legCount", event.target.value)}
          >
            {animalSearchOptions.legCount.map((option) => (
              <option key={option} value={option}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </div>

        <div className="species-form-field">
          <label htmlFor="size">Size</label>
          <select
            id="size"
            value={formData.size}
            onChange={(event) => handleChange("size", event.target.value)}
          >
            <option value="">Select size</option>
            {animalSearchOptions.size.map((option) => (
              <option key={option} value={option}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </div>

        <div className="species-form-field">
          <label htmlFor="color">Main Color</label>
          <select
            id="color"
            value={formData.color}
            onChange={(event) => handleChange("color", event.target.value)}
          >
            <option value="">Select color</option>
            {animalSearchOptions.color.map((option) => (
              <option key={option} value={option}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </div>

        <div className="species-form-field">
          <label htmlFor="region">Region</label>
          <select
            id="region"
            value={formData.region}
            onChange={(event) => handleChange("region", event.target.value)}
          >
            <option value="">Select region</option>
            {animalSearchOptions.region.map((option) => (
              <option key={option} value={option}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </div>

        <div className="species-form-field">
          <label htmlFor="toxicOrVenomous">Toxic or Venomous</label>
          <select
            id="toxicOrVenomous"
            value={formData.toxicOrVenomous}
            onChange={(event) =>
              handleChange("toxicOrVenomous", event.target.value)
            }
          >
            {animalSearchOptions.toxicOrVenomous.map((option) => (
              <option key={option} value={option}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </div>

        <div className="species-form-field species-form-field-full">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(event) => handleChange("imageUrl", event.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="species-form-field species-form-field-full">
          <label htmlFor="description">Short Summary</label>
          <textarea
            id="description"
            rows="4"
            value={formData.description}
            onChange={(event) => handleChange("description", event.target.value)}
          />
        </div>

        <div className="species-form-field species-form-field-full">
          <label htmlFor="overview">Overview</label>
          <textarea
            id="overview"
            rows="4"
            value={formData.overview}
            onChange={(event) => handleChange("overview", event.target.value)}
          />
        </div>

        <div className="species-form-field species-form-field-full">
          <label htmlFor="appearance">Appearance and Visible Traits</label>
          <textarea
            id="appearance"
            rows="4"
            value={formData.appearance}
            onChange={(event) => handleChange("appearance", event.target.value)}
          />
        </div>

        <div className="species-form-field species-form-field-full">
          <label htmlFor="habitatDetails">Habitat Details</label>
          <textarea
            id="habitatDetails"
            rows="4"
            value={formData.habitatDetails}
            onChange={(event) =>
              handleChange("habitatDetails", event.target.value)
            }
          />
        </div>

        <div className="species-form-field species-form-field-full">
          <label htmlFor="regionDetails">Region and Range</label>
          <textarea
            id="regionDetails"
            rows="4"
            value={formData.regionDetails}
            onChange={(event) =>
              handleChange("regionDetails", event.target.value)
            }
          />
        </div>

        <div className="species-form-field species-form-field-full">
          <label htmlFor="behavior">Behavior</label>
          <textarea
            id="behavior"
            rows="4"
            value={formData.behavior}
            onChange={(event) => handleChange("behavior", event.target.value)}
          />
        </div>

        <div className="species-form-field species-form-field-full">
          <label htmlFor="identificationTips">Identification Tips</label>
          <textarea
            id="identificationTips"
            rows="4"
            value={formData.identificationTips}
            onChange={(event) =>
              handleChange("identificationTips", event.target.value)
            }
          />
        </div>

        <div className="species-form-field species-form-field-full">
          <label htmlFor="riskToHumans">Risk to Humans</label>
          <textarea
            id="riskToHumans"
            rows="4"
            value={formData.riskToHumans}
            onChange={(event) =>
              handleChange("riskToHumans", event.target.value)
            }
          />
        </div>

        <div className="species-form-field species-form-field-full">
          <label htmlFor="benefitsToHumans">Benefits to Humans</label>
          <textarea
            id="benefitsToHumans"
            rows="4"
            value={formData.benefitsToHumans}
            onChange={(event) =>
              handleChange("benefitsToHumans", event.target.value)
            }
          />
        </div>

        {errorMessage && <div className="species-form-error">{errorMessage}</div>}

        <div className="species-form-actions">
          <button
            type="button"
            className="species-form-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="species-form-submit"
            disabled={isSaving}
          >
            {isSaving
              ? "Saving..."
              : mode === "edit"
                ? "Save Changes"
                : "Create Species"}
          </button>
        </div>
      </form>
    </section>
  );
}

SpeciesForm.propTypes = {
  mode: PropTypes.oneOf(["create", "edit"]).isRequired,
  initialData: PropTypes.shape({
    commonName: PropTypes.string,
    scientificName: PropTypes.string,
    category: PropTypes.string,
    subtype: PropTypes.string,
    habitat: PropTypes.string,
    hasWings: PropTypes.string,
    tailType: PropTypes.string,
    legCount: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    region: PropTypes.string,
    toxicOrVenomous: PropTypes.string,
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
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

SpeciesForm.defaultProps = {
  initialData: null,
  errorMessage: "",
};

export default SpeciesForm;