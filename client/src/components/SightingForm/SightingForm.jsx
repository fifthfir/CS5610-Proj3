import { useState } from "react";
import PropTypes from "prop-types";
import { animalSearchOptions } from "../../utils/tags";
import "./SightingForm.css";

const initialFormData = {
  subtype: "",
  habitat: "",
  hasWings: "",
  tailType: "",
  legCount: "",
  size: "",
  color: "",
  region: "",
  toxicOrVenomous: "",
};

function formatOption(option) {
  return option
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function SightingForm({ onSearch }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await onSearch(formData);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setFormData(initialFormData);
  }

  return (
    <section className="form-card">
      <div className="section-header">
        <h2>Identify an Animal</h2>
        <p>
          Search is for moments when you do not know the animal’s name. Start
          with the visible traits you noticed, then narrow the possibilities by
          habitat, region, and a simple safety clue if that matters.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="search-form-grid">
        <fieldset className="search-fieldset">
          <legend>Observed Animal Traits</legend>

          <div className="field-group">
            <label htmlFor="subtype">Animal Type</label>
            <p className="field-help">
              Start broad if you only know the general kind of animal.
            </p>
            <select
              id="subtype"
              name="subtype"
              value={formData.subtype}
              onChange={handleChange}
            >
              <option value="">Any</option>
              {animalSearchOptions.subtype.map((item) => (
                <option key={item} value={item}>
                  {formatOption(item)}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label
              htmlFor="size"
              title="Estimated body size, such as small, medium, or large."
            >
              Size
            </label>
            <p className="field-help">
              Use general body size rather than exact measurements.
            </p>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
            >
              <option value="">Any</option>
              {animalSearchOptions.size.map((item) => (
                <option key={item} value={item}>
                  {formatOption(item)}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="color" title="Main visible body color.">
              Color
            </label>
            <p className="field-help">
              Pick the main visible color you remember most clearly.
            </p>
            <select
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            >
              <option value="">Any</option>
              {animalSearchOptions.color.map((item) => (
                <option key={item} value={item}>
                  {formatOption(item)}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label
              htmlFor="hasWings"
              title="Whether the observed animal visibly had wings."
            >
              Has Wings
            </label>
            <p className="field-help">
              Helpful for separating birds and insects from many other animals.
            </p>
            <select
              id="hasWings"
              name="hasWings"
              value={formData.hasWings}
              onChange={handleChange}
            >
              <option value="">Any</option>
              {animalSearchOptions.hasWings.map((item) => (
                <option key={item} value={item}>
                  {formatOption(item)}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="tailType" title="Visible tail shape or length.">
              Tail Type
            </label>
            <p className="field-help">
              Use the tail clue only if you noticed it clearly.
            </p>
            <select
              id="tailType"
              name="tailType"
              value={formData.tailType}
              onChange={handleChange}
            >
              <option value="">Any</option>
              {animalSearchOptions.tailType.map((item) => (
                <option key={item} value={item}>
                  {formatOption(item)}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="legCount" title="Number of visible legs.">
              Leg Count
            </label>
            <p className="field-help">
              Use the visible number of legs when it is obvious.
            </p>
            <select
              id="legCount"
              name="legCount"
              value={formData.legCount}
              onChange={handleChange}
            >
              <option value="">Any</option>
              {animalSearchOptions.legCount.map((item) => (
                <option key={item} value={item}>
                  {formatOption(item)}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className="search-fieldset">
          <legend>Location Context</legend>

          <div className="field-group">
            <label
              htmlFor="region"
              title="Region means the geographic area where the animal was seen, such as North America, Europe, or Asia."
            >
              Region
            </label>
            <p className="field-help">
              Geographic location where it was seen.
            </p>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
            >
              <option value="">Any</option>
              {animalSearchOptions.region.map((item) => (
                <option key={item} value={item}>
                  {formatOption(item)}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label
              htmlFor="habitat"
              title="Habitat means the type of environment the animal was in, such as forest, wetland, desert, or grassland."
            >
              Habitat
            </label>
            <p className="field-help">
              Environment type where it was found.
            </p>
            <select
              id="habitat"
              name="habitat"
              value={formData.habitat}
              onChange={handleChange}
            >
              <option value="">Any</option>
              {animalSearchOptions.habitat.map((item) => (
                <option key={item} value={item}>
                  {formatOption(item)}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <fieldset className="search-fieldset">
          <legend>Safety Clue</legend>

          <div className="field-group">
            <label htmlFor="toxicOrVenomous">Toxic or Venomous</label>
            <p className="field-help">
              A simple safety-oriented clue for animals people often worry about.
            </p>
            <select
              id="toxicOrVenomous"
              name="toxicOrVenomous"
              value={formData.toxicOrVenomous}
              onChange={handleChange}
            >
              <option value="">Any</option>
              {animalSearchOptions.toxicOrVenomous.map((item) => (
                <option key={item} value={item}>
                  {formatOption(item)}
                </option>
              ))}
            </select>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="primary-button" disabled={isLoading}>
            {isLoading ? "Searching..." : "Find Matches"}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}

SightingForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SightingForm;
