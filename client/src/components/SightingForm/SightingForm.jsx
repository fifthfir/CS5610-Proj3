
import { useState } from "react";
import { animalSearchOptions } from "../../utils/tags";
import "./SightingForm.css";
import PropTypes from 'prop-types';

function SightingForm({ onSearch }) {
  const [formData, setFormData] = useState({
    subtype: "",
    habitat: "",
    hasWings: "",
    tailType: "",
    legCount: "",
    size: "",
    color: "",
    region: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSearch(formData);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setFormData({
      subtype: "",
      habitat: "",
      hasWings: "",
      tailType: "",
      legCount: "",
      size: "",
      color: "",
      region: ""
    });
  }

  return (
    <div className="form-card">
      <div className="section-header">
        <h2>Search Wildlife</h2>
        <p>
          Choose one or more animal traits to narrow likely candidate species.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="search-form-grid">
        <div className="field-group">
          <label htmlFor="subtype">Animal Type</label>
          <select
            id="subtype"
            name="subtype"
            value={formData.subtype}
            onChange={handleChange}
          >
            <option value="">Any</option>
            {animalSearchOptions.subtype.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="habitat">Habitat</label>
          <select
            id="habitat"
            name="habitat"
            value={formData.habitat}
            onChange={handleChange}
          >
            <option value="">Any</option>
            {animalSearchOptions.habitat.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="hasWings">Has Wings</label>
          <select
            id="hasWings"
            name="hasWings"
            value={formData.hasWings}
            onChange={handleChange}
          >
            <option value="">Any</option>
            {animalSearchOptions.hasWings.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="tailType">Tail Type</label>
          <select
            id="tailType"
            name="tailType"
            value={formData.tailType}
            onChange={handleChange}
          >
            <option value="">Any</option>
            {animalSearchOptions.tailType.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="legCount">Number of Legs</label>
          <select
            id="legCount"
            name="legCount"
            value={formData.legCount}
            onChange={handleChange}
          >
            <option value="">Any</option>
            {animalSearchOptions.legCount.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="size">Size</label>
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
          >
            <option value="">Any</option>
            {animalSearchOptions.size.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="color">Main Color</label>
          <select
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          >
            <option value="">Any</option>
            {animalSearchOptions.color.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="region">Region</label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
          >
            <option value="">Any</option>
            {animalSearchOptions.region.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button" disabled={isLoading}>
            {isLoading ? "Searching..." : "Find Matches"}
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

SightingForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
export default SightingForm;