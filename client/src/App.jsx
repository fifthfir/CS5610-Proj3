import { useEffect, useState } from "react";
import SearchPage from "./pages/SearchPage";
import MySightingsPage from "./pages/MySightingsPage";
import AuthPage from "./pages/AuthPage";
import "./styles/global.css";

function App() {
  const [page, setPage] = useState("search");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("watwildlifeUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("watwildlifeUser");
    setCurrentUser(null);
    setPage("search");
  }

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="brand-block">
          <div className="brand-mark">🌿</div>
          <div>
            <h1>WatWildlife</h1>
            <p className="brand-subtitle">Wildlife search and personal sightings tracker</p>
          </div>
        </div>

        <div className="nav-links">
          <button
            className={page === "search" ? "nav-button active" : "nav-button"}
            onClick={() => setPage("search")}
          >
            Search
          </button>

          <button
            className={page === "my" ? "nav-button active" : "nav-button"}
            onClick={() => setPage("my")}
          >
            My Sightings
          </button>

          {!currentUser && (
            <button
              className={page === "auth" ? "nav-button active" : "nav-button"}
              onClick={() => setPage("auth")}
            >
              Login
            </button>
          )}

          {currentUser && (
            <button className="nav-button logout" onClick={handleLogout}>
              Logout ({currentUser.username})
            </button>
          )}
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">Outdoor discovery made easier</p>
          <h2>Search wildlife, review likely matches, and build your own sightings collection.</h2>
          <p className="hero-text">
            WatWildlife helps users narrow species candidates by tags such as category and region,
            then save interesting discoveries into a personal sightings list.
          </p>
        </div>
      </header>

      <main className="page-container">
        {page === "search" && <SearchPage currentUser={currentUser} />}
        {page === "my" && <MySightingsPage currentUser={currentUser} />}
        {page === "auth" && <AuthPage onLogin={setCurrentUser} />}
      </main>
    </div>
  );
}

export default App;