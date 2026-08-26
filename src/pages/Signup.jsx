import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "./Auth.css";

const countryCodes = [
  { code: "+91", country: "India" },
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+61", country: "Australia" },
  { code: "+81", country: "Japan" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+971", country: "UAE" },
];

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{7,12}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");

    if (!validate()) return;

    const result = signup(form);

    if (!result.success) {
      setErrors({ form: result.message });
      return;
    }

    setSuccessMsg("Account created! Redirecting to login...");

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <div className="auth-card shadow-lg">

        <div className="text-center mb-4">
          <span className="badge bg-warning text-dark px-3 py-2 mb-3">
            🍽️ Join Culinary Passport
          </span>
          <h2 className="fw-bold">Create Your Account</h2>
          <p className="text-muted small mb-0">
            Start exploring cuisines from around the world.
          </p>
        </div>

        {errors.form && (
          <div className="alert alert-danger py-2 small">{errors.form}</div>
        )}

        {successMsg && (
          <div className="alert alert-success py-2 small">{successMsg}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <div className="d-flex gap-2">
              <select
                name="countryCode"
                className="form-select"
                style={{ maxWidth: "110px" }}
                value={form.countryCode}
                onChange={handleChange}
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                name="phone"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            {errors.phone && (
              <div className="text-danger small mt-1">{errors.phone}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
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
            {errors.password && (
              <div className="text-danger small mt-1">{errors.password}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Confirm Password</label>
            <div className="input-group">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirm((p) => !p)}
                tabIndex={-1}
              >
                {showConfirm ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="text-danger small mt-1">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-warning fw-bold w-100 py-2">
            Sign Up
          </button>

        </form>

        <p className="text-center text-muted small mt-4 mb-0">
          Already have an account? <Link to="/login">Log In</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;