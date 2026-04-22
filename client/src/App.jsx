import { useEffect, useMemo, useState } from "react";
import BrowsePage from "./pages/BrowsePage";
import SearchPage from "./pages/SearchPage";
import MySightingsPage from "./pages/MySightingsPage";
import AuthPage from "./pages/AuthPage";
import { getCurrentUser, logoutUser } from "./services/authService";
import "./styles/global.css";

const heroContentByPage = {
  browse: {
    eyebrow: "Field guide exploration",
    title: "Browse animal profiles like a digital wildlife field guide.",
    text:
      "Browse is for slower, curiosity-driven exploration. Read species profiles, compare habitats and regions, and learn what this site already knows before you try to identify something unknown.",
  },
  search: {
    eyebrow: "Wildlife identification",
    title: "Start with what you saw and narrow down likely animal matches.",
    text:
      "Search is for moments when you do not know the animal’s name. Use visible traits, habitat, region, and safety clues to narrow the possibilities and save likely matches to My Sightings.",
  },
  my: {
    eyebrow: "Personal wildlife record",
    title: "Review the animals you have saved and build your own sightings history.",
    text:
      "My Sightings keeps track of the species you decided to save, along with personal notes that help you remember what you observed and why it stood out.",
  },
  auth: {
    eyebrow: "Account access",
    title: "Sign in or register to save matches and manage your personal sightings.",
    text:
      "Accounts let you store likely matches, revisit saved animals later, and build a more personal record of wildlife you encounter outdoors.",
  },
};

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
      } catch {
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
    } catch {
      // Keep the UI responsive even if logout fails server-side.
    } finally {
      setCurrentUser(null);
      setPage("search");
    }
  }

  function handleLogin(user) {
    setCurrentUser(user);
    setPage("my");
  }

  const hero = useMemo(
    () => heroContentByPage[page] || heroContentByPage.search,
    [page]
  );

  if (!authChecked) {
    return (
      <div className="app-shell">
        <main className="page-container">Loading...</main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <nav className="navbar" aria-label="Primary navigation">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            🦊
          </div>
          <div>
            <h1>WatWildlife</h1>
            <p className="brand-subtitle">
              Wildlife encyclopedia, identification, and sightings tracker
            </p>
          </div>
        </div>

        <div className="nav-links">
          <button
            type="button"
            className={page === "browse" ? "nav-button active" : "nav-button"}
            onClick={() => setPage("browse")}
          >
            Browse
          </button>

          <button
            type="button"
            className={page === "search" ? "nav-button active" : "nav-button"}
            onClick={() => setPage("search")}
          >
            Search
          </button>

          <button
            type="button"
            className={page === "my" ? "nav-button active" : "nav-button"}
            onClick={() => setPage("my")}
          >
            My Sightings
          </button>

          {!currentUser && (
            <button
              type="button"
              className={page === "auth" ? "nav-button active" : "nav-button"}
              onClick={() => setPage("auth")}
            >
              Login
            </button>
          )}

          {currentUser && (
            <button
              type="button"
              className="nav-button logout"
              onClick={handleLogout}
            >
              Logout ({currentUser.username})
            </button>
          )}
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h2>{hero.title}</h2>
          <p className="hero-text">{hero.text}</p>
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