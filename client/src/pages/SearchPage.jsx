import { useState } from "react";
import SightingForm from "../components/SightingForm/SightingForm";
import CandidateResults from "../components/CandidateResults/CandidateResults";
import { searchMatches } from "../services/matchingService";

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

export default SearchPage;