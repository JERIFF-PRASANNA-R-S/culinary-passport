import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row g-4">

          <div className="col-md-4">
            <h5 className="fw-bold mb-3">🍽️ Culinary Passport</h5>
            <p className="text-secondary small mb-0">
              Where every dish has a destination. Explore global cuisines,
              discover authentic dishes, and travel the world one flavour
              at a time.
            </p>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Explore</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/" className="text-secondary text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cuisines" className="text-secondary text-decoration-none">
                  Cuisines
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/dishes" className="text-secondary text-decoration-none">
                  Dishes
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-secondary text-decoration-none">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Connect</h6>
            <p className="text-secondary small mb-0">
              Built as a learning project exploring React, React Router,
              and Bootstrap.
            </p>
          </div>

        </div>

        <hr className="border-secondary my-4" />

        <p className="text-center text-secondary small mb-0">
          © {new Date().getFullYear()} Culinary Passport. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;