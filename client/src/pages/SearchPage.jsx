import { useState } from "react";
import SightingForm from "../components/SightingForm/SightingForm";
import CandidateResults from "../components/CandidateResults/CandidateResults";
import { searchMatches } from "../services/matchingService";
import PropTypes from 'prop-types';

function SearchPage({ currentUser }) {
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(data) {
    const res = await searchMatches(data);
    setResults(res);
    setHasSearched(true);
  }

  return (
    <div className="page-layout">
      <section className="search-panel">
        <SightingForm onSearch={handleSearch} />
      </section>

      <section className="results-panel">
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
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};
export default SearchPage;