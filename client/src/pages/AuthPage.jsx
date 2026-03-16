import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import PropTypes from 'prop-types';

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const payload = { username, password };

      const result =
        mode === "login"
          ? await loginUser(payload)
          : await registerUser(payload);

      localStorage.setItem("watwildlifeUser", JSON.stringify(result));
      onLogin(result);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <p className="eyebrow">Welcome to WatWildlife</p>
          <h2>{mode === "login" ? "Sign in to your wildlife journal" : "Create your account"}</h2>
          <p className="auth-description">
            Save candidate species, organize your sightings, and keep personal notes
            about wildlife you discover outdoors.
          </p>

          <ul className="auth-feature-list">
            <li>Search species by tags</li>
            <li>Save records into My Sightings</li>
            <li>Edit notes and filter by tags</li>
          </ul>
        </div>

        <div className="auth-right">
          <h3>{mode === "login" ? "Login" : "Register"}</h3>

          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <button type="submit" className="primary-button" disabled={isSubmitting}>
              {isSubmitting
                ? mode === "login"
                  ? "Logging in..."
                  : "Registering..."
                : mode === "login"
                  ? "Login"
                  : "Register"}
            </button>
          </form>

          {message && <div className="status-message">{message}</div>}

          <button
            type="button"
            className="text-button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login"
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </section>
  );
}

AuthPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
export default AuthPage;