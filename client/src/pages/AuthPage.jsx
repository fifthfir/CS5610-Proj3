import { useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import PropTypes from "prop-types";

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

      onLogin(result);
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page" aria-labelledby="auth-heading">
      <div className="auth-card">
        <header className="auth-left">
          <p className="eyebrow">Welcome to WatWildlife</p>
          <h2 id="auth-heading">
            {mode === "login"
              ? "Sign in to your wildlife journal"
              : "Create your account"}
          </h2>
          <p className="auth-description">
            Save candidate species, organize your sightings, and keep personal
            notes about wildlife you discover outdoors.
          </p>

          <ul className="auth-feature-list" aria-label="App features">
            <li>Search species by tags</li>
            <li>Identify physical traits</li>
            <li>Maintain a personal observation log</li>
          </ul>
        </header>

        <div className="auth-right">
          <form 
            className="auth-form" 
            onSubmit={handleSubmit}
            aria-label={mode === "login" ? "Login form" : "Registration form"}
          >
            {/* 使用 auth-input-group 容器来隔离 label 和 input，方便设置间距 */}
            <div className="auth-input-group">
              <label htmlFor="username" style={{ display: 'block', marginBottom: '8px' }}>
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={{ width: '100%', marginBottom: '16px' }}
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ width: '100%', marginBottom: '24px' }}
              />
            </div>

            <button
              type="submit"
              className="primary-button"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              style={{ width: '100%' }}
            >
              {isSubmitting
                ? mode === "login"
                  ? "Logging in..."
                  : "Registering..."
                : mode === "login"
                  ? "Login"
                  : "Register"}
            </button>
          </form>

          {message && (
            <div 
              className="status-message" 
              role="alert" 
              aria-live="assertive"
              style={{ marginTop: '16px', color: '#d32f2f' }}
            >
              {message}
            </div>
          )}

          <footer className="auth-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setMessage("");
              }}
              aria-label={mode === "login" ? "Switch to registration" : "Switch to login"}
            >
              {mode === "login"
                ? "Need an account? Register"
                : "Already have an account? Login"}
            </button>
          </footer>
        </div>
      </div>
    </main>
  );
}

AuthPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default AuthPage;