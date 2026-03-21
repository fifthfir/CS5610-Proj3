import { useEffect, useState } from "react";
import BrowsePage from "./pages/BrowsePage";
import SearchPage from "./pages/SearchPage";
import MySightingsPage from "./pages/MySightingsPage";
import AuthPage from "./pages/AuthPage";
import { getCurrentUser, logoutUser } from "./services/authService";
import "./styles/global.css";

function App() {
  const [page, setPage] = useState("search");
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadCurrentUser() {
      try {
        const user = await getCurrentUser();

        if (!cancelled) {
          setCurrentUser(user);
        }
      } catch (error) {
        if (!cancelled) {
          setCurrentUser(null);
        }
      } finally {
        if (!cancelled) {
          setAuthChecked(true);
        }
      }
    }

    loadCurrentUser();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setCurrentUser(null);
      setPage("search");
    }
  }

  function handleLogin(user) {
    setCurrentUser(user);
    setPage("search");
  }

  if (!authChecked) {
    return (
      <div className="app-shell">
        <main className="page-container">Loading...</main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="brand-block">
          <div className="brand-mark">🦊</div>
          <div>
            <h1>WatWildlife</h1>
            <p className="brand-subtitle">
              Wildlife search and personal sightings tracker
            </p>
          </div>
        </div>

        <div className="nav-links">
          <button
            className={page === "browse" ? "nav-button active" : "nav-button"}
            onClick={() => setPage("browse")}
          >
            Browse
          </button>

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
          <h2>
            Search wildlife, review likely matches, and build your own sightings
            collection.
          </h2>
          <p className="hero-text">
            WatWildlife helps users narrow species candidates by tags such as
            category and region, then save interesting discoveries into a
            personal sightings list.
          </p>
        </div>
      </header>

      <main className="page-container">
        {page === "browse" && <BrowsePage currentUser={currentUser} />}
        {page === "search" && <SearchPage currentUser={currentUser} />}
        {page === "my" && <MySightingsPage currentUser={currentUser} />}
        {page === "auth" && <AuthPage onLogin={handleLogin} />}
      </main>
    </div>
  );
}

export default App;