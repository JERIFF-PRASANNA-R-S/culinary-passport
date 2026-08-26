import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "./Auth.css";

function ForgotPassword() {
  const { requestPasswordReset } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResetLink("");

    if (!email.trim()) {
      setError("Please enter your registered email.");
      return;
    }

    const result = requestPasswordReset(email.trim());

    if (!result.success) {
      setError(result.message);
      return;
    }

    const link = `${window.location.origin}/reset-password?email=${encodeURIComponent(
      email.trim()
    )}&token=${result.token}`;

    setResetLink(link);
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <div className="auth-card shadow-lg">

        <div className="text-center mb-4">
          <span className="badge bg-warning text-dark px-3 py-2 mb-3">
            🔑 Reset Access
          </span>
          <h2 className="fw-bold">Forgot Password</h2>
          <p className="text-muted small mb-0">
            Enter your registered email to reset your password.
          </p>
        </div>

        {error && <div className="alert alert-danger py-2 small">{error}</div>}

        {!resetLink ? (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="form-label fw-semibold">Registered Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-warning fw-bold w-100 py-2">
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="alert alert-success small">
            <strong>Demo mode:</strong> no email service is connected yet, so
            here's your reset link directly —{" "}
            <Link to={resetLink.replace(window.location.origin, "")}>
              Reset my password
            </Link>
          </div>
        )}

        <p className="text-center text-muted small mt-4 mb-0">
          Remembered your password? <Link to="/login">Log In</Link>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;
