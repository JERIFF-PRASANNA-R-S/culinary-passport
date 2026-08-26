import { useState } from "react";

function About() {
  // Lazy initializer: reads localStorage once, on first render only
  const [feedbackList, setFeedbackList] = useState(() => {
    return JSON.parse(localStorage.getItem("culinaryFeedbackDB")) || [];
  });

  const [form, setForm] = useState({ name: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) return;

    const newEntry = {
      name: form.name.trim(),
      message: form.message.trim(),
      date: new Date().toLocaleDateString(),
    };

    const updatedList = [newEntry, ...feedbackList];
    setFeedbackList(updatedList);
    localStorage.setItem("culinaryFeedbackDB", JSON.stringify(updatedList));

    setForm({ name: "", message: "" });
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-light min-vh-100">

      {/* Page Header */}
      <section className="bg-dark text-white py-5">
        <div className="container text-center">

          <span className="badge bg-warning text-dark px-3 py-2 mb-3">
            📖 Our Story
          </span>

          <h1 className="display-4 fw-bold">
            About Culinary Passport
          </h1>

          <p className="lead text-light mx-auto" style={{ maxWidth: "700px" }}>
            Where every dish has a destination.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="py-5">
        <div className="container">

          <div className="row g-4 align-items-center">

            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">Why We Built This</h2>
              <p className="text-muted">
                Culinary Passport is a small project built to celebrate how food
                connects cultures. Every dish carries a story — where it came
                from, what it means to the people who make it, and how it has
                travelled across the world.
              </p>
              <p className="text-muted">
                Our goal is simple: to help you explore global cuisines, discover
                new dishes, and appreciate the traditions behind every flavour.
              </p>
            </div>

            <div className="col-lg-6 text-center">
              <div
                className="rounded-circle bg-warning d-inline-flex align-items-center justify-content-center shadow-lg"
                style={{
                  width: "260px",
                  height: "260px",
                  fontSize: "120px",
                }}
              >
                🌍
              </div>
            </div>

          </div>

          {/* Quick stats */}
          <div className="row g-4 mt-5 text-center">

            <div className="col-md-4">
              <h3 className="fw-bold text-warning">24+</h3>
              <p className="text-muted mb-0">Dishes featured</p>
            </div>

            <div className="col-md-4">
              <h3 className="fw-bold text-warning">8+</h3>
              <p className="text-muted mb-0">Cuisines explored</p>
            </div>

            <div className="col-md-4">
              <h3 className="fw-bold text-warning">∞</h3>
              <p className="text-muted mb-0">Flavours to discover</p>
            </div>

          </div>

        </div>
      </section>

      {/* Meet the Creator */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4 align-items-center">

            <div className="col-lg-4 text-center">
              <div
                className="rounded-circle bg-dark text-warning d-inline-flex align-items-center justify-content-center shadow-lg"
                style={{
                  width: "200px",
                  height: "200px",
                  fontSize: "80px",
                }}
              >
                👩‍💻
              </div>
            </div>

            <div className="col-lg-8">
              <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                👤 Meet the Creator
              </span>
              <h2 className="fw-bold mb-3">Lena Sanita JR</h2>
              <p className="text-muted mb-2">
                <strong>Age:</strong> 21
              </p>
              <p className="text-muted mb-2">
                <strong>Education:</strong> B.Sc. Computer Science &amp; Hotel
                Management (completed)
              </p>
              <p className="text-muted mb-2">
                <strong>Currently:</strong> Pursuing an MBA
              </p>
              <p className="text-muted">
                i created Culinary Passport by combining a background in
                computer science with a passion for hospitality and food
                culture. This project reflects that blend — a technical
                platform built to celebrate the world's culinary traditions.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why, Uses & Conclusion */}
      <section className="py-5">
        <div className="container">

          <div className="text-center mb-5">
            <span className="badge bg-warning text-dark px-3 py-2 mb-3">
              💡 About the Platform
            </span>
            <h2 className="fw-bold">Purpose, Uses &amp; Conclusion</h2>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="p-4 h-100 bg-white rounded shadow-sm">
                <h5 className="fw-bold mb-2">Why This Website?</h5>
                <p className="text-muted small mb-0">
                  Food is one of the simplest ways to understand a culture.
                  This website was built to make that exploration easy,
                  visual, and enjoyable for anyone curious about global
                  cuisines.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 h-100 bg-white rounded shadow-sm">
                <h5 className="fw-bold mb-2">How It's Used</h5>
                <p className="text-muted small mb-0">
                  Browse cuisines by country, search or filter specific
                  dishes, and read short descriptions of each dish's origin
                  and flavour profile — all in one place.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 h-100 bg-white rounded shadow-sm">
                <h5 className="fw-bold mb-2">Final Note</h5>
                <p className="text-muted small mb-0">
                  Culinary Passport will keep growing with more cuisines,
                  dishes, and features over time. Thank you for exploring
                  it — feedback below helps shape what comes next.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container">

          <div className="text-center mb-4">
            <span className="badge bg-warning text-dark px-3 py-2 mb-3">
              💬 We'd Love Your Feedback
            </span>
            <h2 className="fw-bold">Share Your Thoughts</h2>
            <p className="text-light mx-auto" style={{ maxWidth: "600px" }}>
              Your name and message are saved so we can keep improving
              Culinary Passport based on real feedback.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-6">

              <form onSubmit={handleSubmit} className="bg-white rounded p-4 shadow-lg">

                <div className="mb-3">
                  <label className="form-label text-dark fw-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-dark fw-semibold">
                    Your Feedback
                  </label>
                  <textarea
                    name="message"
                    className="form-control"
                    rows="4"
                    placeholder="Tell us what you think..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-warning fw-bold w-100">
                  Submit Feedback
                </button>

                {submitted && (
                  <p className="text-success text-center mt-3 mb-0 fw-semibold">
                    ✅ Thank you! Your feedback has been saved.
                  </p>
                )}

              </form>

            </div>
          </div>

          {/* Saved feedback preview */}
          {feedbackList.length > 0 && (
            <div className="row justify-content-center mt-5">
              <div className="col-lg-8">
                <h5 className="fw-bold mb-3 text-warning">Recent Feedback</h5>
                <div className="row g-3">
                  {feedbackList.slice(0, 4).map((entry, i) => (
                    <div className="col-md-6" key={i}>
                      <div className="bg-white text-dark rounded p-3 h-100 shadow-sm">
                        <p className="mb-1 small">{entry.message}</p>
                        <p className="mb-0 small text-muted">
                          — {entry.name}, {entry.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}

export default About;