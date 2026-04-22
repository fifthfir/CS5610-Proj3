import { useState } from "react";
import PropTypes from "prop-types";
import SightingForm from "../components/SightingForm/SightingForm";
import CandidateResults from "../components/CandidateResults/CandidateResults";
import { searchMatches } from "../services/matchingService";

function SearchPage({ currentUser }) {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState("");

  async function handleSearch(data) {
    try {
      setSearchError("");
      const res = await searchMatches(data);
      setResults(res);
      setHasSearched(true);
    } catch (error) {
      setResults([]);
      setHasSearched(true);
      setSearchError(error.message || "Failed to search for matches.");
    }
  }

  return (
    <div className="page-layout">
      <section className="search-panel">
        <SightingForm onSearch={handleSearch} />
      </section>

      <section className="results-panel">
        {searchError && (
          <div className="status-message" role="alert" aria-live="polite">
            {searchError}
          </div>
        )}

        <CandidateResults
          results={results}
          hasSearched={hasSearched}
          currentUser={currentUser}
        />
      </section>
    </div>
  );
}

SearchPage.propTypes = {
  currentUser: PropTypes.shape({
    userId: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
  }),
};

SearchPage.defaultProps = {
  currentUser: null,
};

export default SearchPage;