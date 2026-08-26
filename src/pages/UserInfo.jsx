import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { countries, indianStates, countryCodes } from "../data/locationData";
import "./Auth.css";

function UserInfo() {
  const { currentUser, completeUserInfo } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    dob: "",
    countryCode: currentUser?.countryCode || "+91",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
    gender: "",
    country: "India",
    state: "",
    city: "",
    occupationType: "college", // "college" | "occupation"
    institutionName: "",
    department: "",
    companyName: "",
    designation: "",
    orgCity: "",
  });

  const [acknowledged, setAcknowledged] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form"); // "form" | "confirmation"

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      // Reset dependent fields when country changes
      setForm((prev) => ({ ...prev, country: value, state: "", city: "" }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.dob) newErrors.dob = "Date of birth is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.gender) newErrors.gender = "Please select a gender.";
    if (!form.country) newErrors.country = "Please select a country.";

    if (form.country === "India" && !form.state) {
      newErrors.state = "Please select a state.";
    }
    if (!form.city.trim()) newErrors.city = "City is required.";

    if (form.occupationType === "college") {
      if (!form.institutionName.trim())
        newErrors.institutionName = "Institution name is required.";
      if (!form.department.trim())
        newErrors.department = "Department is required.";
      if (!form.orgCity.trim())
        newErrors.orgCity = "Institution city is required.";
    } else {
      if (!form.companyName.trim())
        newErrors.companyName = "Company name is required.";
      if (!form.designation.trim())
        newErrors.designation = "Designation is required.";
      if (!form.orgCity.trim())
        newErrors.orgCity = "Company city is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!acknowledged) return; // Submit is disabled anyway, this is a safety net

    if (!validate()) return;

    completeUserInfo(form);
    setStep("confirmation");

    setTimeout(() => {
      navigate("/");
    }, 1600);
  };

  if (!currentUser) return null;

  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <div className="auth-card user-info-card shadow-lg">

        {step === "form" ? (
          <>
            <div className="text-center mb-4">
              <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                👋 One Last Step
              </span>
              <h2 className="fw-bold">Tell Us About You</h2>
              <p className="text-muted small mb-0">
                Welcome, {currentUser.name}! Complete your profile to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>

              {/* ROW 1 — Name */}
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                    value={form.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                    value={form.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>

              {/* ROW 2 — Date of Birth */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                  value={form.dob}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                />
                {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
              </div>

              {/* ROW 3 — Phone */}
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
                      <option key={`${c.code}-${c.country}`} value={c.code}>
                        {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && (
                  <div className="text-danger small mt-1">{errors.phone}</div>
                )}
              </div>

              {/* ROW 4 — Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  disabled
                />
                <div className="form-text">
                  This is your account email and can't be changed here.
                </div>
              </div>

              {/* ROW 5 — Gender */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Gender</label>
                <select
                  name="gender"
                  className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}</div>
                )}
              </div>

              {/* ROW 6 — Location */}
              <div className="row g-3 mb-3">
                <div className={form.country === "India" ? "col-12 col-md-4" : "col-12 col-md-6"}>
                  <label className="form-label fw-semibold">Country</label>
                  <select
                    name="country"
                    className="form-select"
                    value={form.country}
                    onChange={handleChange}
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {form.country === "India" && (
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">State</label>
                    <select
                      name="state"
                      className={`form-select ${errors.state ? "is-invalid" : ""}`}
                      value={form.state}
                      onChange={handleChange}
                    >
                      <option value="">Select state</option>
                      {indianStates.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <div className="invalid-feedback">{errors.state}</div>
                    )}
                  </div>
                )}

                <div className={form.country === "India" ? "col-12 col-md-4" : "col-12 col-md-6"}>
                  <label className="form-label fw-semibold">City</label>
                  <input
                    type="text"
                    name="city"
                    className={`form-control ${errors.city ? "is-invalid" : ""}`}
                    value={form.city}
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                </div>
              </div>

              {/* Occupation type toggle */}
              <div className="mb-3">
                <label className="form-label fw-semibold d-block">I am a</label>
                <div className="d-flex gap-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="occupationType"
                      id="occTypeCollege"
                      value="college"
                      checked={form.occupationType === "college"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="occTypeCollege">
                      College Student
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="occupationType"
                      id="occTypeWork"
                      value="occupation"
                      checked={form.occupationType === "occupation"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="occTypeWork">
                      Working Professional
                    </label>
                  </div>
                </div>
              </div>

              {/* Dynamic occupation fields */}
              {form.occupationType === "college" ? (
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">Institution Name</label>
                    <input
                      type="text"
                      name="institutionName"
                      className={`form-control ${errors.institutionName ? "is-invalid" : ""}`}
                      value={form.institutionName}
                      onChange={handleChange}
                    />
                    {errors.institutionName && (
                      <div className="invalid-feedback">{errors.institutionName}</div>
                    )}
                  </div>
                  <div className="col-12 col-md-3">
                    <label className="form-label fw-semibold">Department</label>
                    <input
                      type="text"
                      name="department"
                      className={`form-control ${errors.department ? "is-invalid" : ""}`}
                      value={form.department}
                      onChange={handleChange}
                    />
                    {errors.department && (
                      <div className="invalid-feedback">{errors.department}</div>
                    )}
                  </div>
                  <div className="col-12 col-md-3">
                    <label className="form-label fw-semibold">Institution City</label>
                    <input
                      type="text"
                      name="orgCity"
                      className={`form-control ${errors.orgCity ? "is-invalid" : ""}`}
                      value={form.orgCity}
                      onChange={handleChange}
                    />
                    {errors.orgCity && (
                      <div className="invalid-feedback">{errors.orgCity}</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
                      value={form.companyName}
                      onChange={handleChange}
                    />
                    {errors.companyName && (
                      <div className="invalid-feedback">{errors.companyName}</div>
                    )}
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Designation</label>
                    <input
                      type="text"
                      name="designation"
                      className={`form-control ${errors.designation ? "is-invalid" : ""}`}
                      value={form.designation}
                      onChange={handleChange}
                    />
                    {errors.designation && (
                      <div className="invalid-feedback">{errors.designation}</div>
                    )}
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label fw-semibold">Company City</label>
                    <input
                      type="text"
                      name="orgCity"
                      className={`form-control ${errors.orgCity ? "is-invalid" : ""}`}
                      value={form.orgCity}
                      onChange={handleChange}
                    />
                    {errors.orgCity && (
                      <div className="invalid-feedback">{errors.orgCity}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Acknowledgement */}
              <div className="form-check mb-4 mt-4 acknowledgement-box">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="acknowledge"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                />
                <label className="form-check-label small" htmlFor="acknowledge">
                  I hereby acknowledge that the information provided is correct.
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-warning fw-bold w-100 py-2"
                disabled={!acknowledged}
              >
                Submit &amp; Continue →
              </button>

            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div style={{ fontSize: "3rem" }}>✅</div>
            <h3 className="fw-bold mt-3">You're All Set!</h3>
            <p className="text-muted">
              Thanks, {form.firstName}. Taking you to the home page...
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default UserInfo;