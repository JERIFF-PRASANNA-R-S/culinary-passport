import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "./Auth.css";

function ResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = resetPassword({
      email,
      token,
      newPassword: form.newPassword,
    });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate("/login"), 1500);
  };

  if (!email || !token) {
    return (
      <div className="auth-page d-flex align-items-center justify-content-center">
        <div className="auth-card shadow-lg text-center">
          <h4 className="fw-bold">Invalid Reset Link</h4>
          <p className="text-muted small">
            This password reset link is missing required information.
          </p>
          <Link to="/forgot-password" className="btn btn-warning fw-bold mt-2">
            Request a New Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <div className="auth-card shadow-lg">

        {!success ? (
          <>
            <div className="text-center mb-4">
              <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                🔒 New Password
              </span>
              <h2 className="fw-bold">Reset Password</h2>
              <p className="text-muted small mb-0">
                Resetting password for <strong>{email}</strong>
              </p>
            </div>

            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>

              <div className="mb-3">
                <label className="form-label fw-semibold">New Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    className="form-control"
                    placeholder="••••••••"
                    value={form.newPassword}
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

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="form-control"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-warning fw-bold w-100 py-2">
                Update Password
              </button>

            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div style={{ fontSize: "3rem" }}>✅</div>
            <h3 className="fw-bold mt-3">Password Updated!</h3>
            <p className="text-muted">Redirecting to login...</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default ResetPassword;