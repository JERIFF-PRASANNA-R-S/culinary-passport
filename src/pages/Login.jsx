import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "./Auth.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.identifier.trim() || !form.password) {
      setError("Please enter both email/username and password.");
      return;
    }

    const result = await login(form);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (result.isNewUser) {
      navigate("/user-info");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <div className="auth-card shadow-lg">

        <div className="text-center mb-4">
          <span className="badge bg-warning text-dark px-3 py-2 mb-3">
            🍽️ Welcome Back
          </span>
          <h2 className="fw-bold">Log In</h2>
          <p className="text-muted small mb-0">
            Continue your culinary journey.
          </p>
        </div>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email / Username</label>
            <input
              type="text"
              name="identifier"
              className="form-control"
              placeholder="Enter email or name"
              value={form.identifier}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((p) => !p)}
                tabIndex={-1}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="text-end mb-4">
            <Link to="/forgot-password" className="small auth-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-warning fw-bold w-100 py-2">
            Login
          </button>

        </form>

        <div className="auth-divider my-4">
          <span>OR</span>
        </div>

        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-outline-dark btn-sm px-3" type="button" disabled>
            Google
          </button>
          <button className="btn btn-outline-dark btn-sm px-3" type="button" disabled>
            GitHub
          </button>
        </div>
        <p
          className="text-center text-muted small mt-2 mb-0"
          style={{ fontSize: "0.75rem" }}
        >
          (Third-party login coming soon)
        </p>

        <p className="text-center text-muted small mt-4 mb-0">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;