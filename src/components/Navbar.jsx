import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        {/* Logo / Brand */}
        <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
          🍽️ Culinary Passport
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarContent"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarContent"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cuisines" onClick={closeMenu}>
                Cuisines
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/dishes" onClick={closeMenu}>
                Dishes
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>

            {currentUser ? (
              <>
                <li className="nav-item ms-lg-3 text-warning small d-flex align-items-center">
                  Hi, {currentUser.firstName || currentUser.name}
                </li>
                <li className="nav-item ms-lg-3">
                  <button
                    className="btn btn-outline-light px-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-lg-3">
                <Link
                  className="btn btn-outline-light px-4"
                  to="/login"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </li>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;