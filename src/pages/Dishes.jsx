import { useState } from "react";
import { Link } from "react-router-dom";
import { dishes, filters } from "../data/dishesData";
import "./Dishes.css";

function Dishes() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDishes = dishes.filter((dish) => {
    const matchesFilter =
      activeFilter === "ALL" || dish.cuisineCode === activeFilter;

    const matchesSearch =
      searchTerm.trim() === "" ||
      dish.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      dish.cuisine.toLowerCase().includes(searchTerm.trim().toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <main className="dishes-page">

      {/* PAGE HERO */}
      <section className="dishes-hero">
        <div className="container">
          <div className="dishes-hero-content text-center">
            <span className="dishes-badge">🍽️ Global Flavours</span>
            <h1>
              Explore Delicious <span>Dishes</span>
            </h1>
            <p>
              From street food classics to comfort staples — browse
              iconic dishes from every cuisine on your culinary passport.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="dishes-search-section">
        <div className="container">
          <div className="search-bar-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search for a dish or cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="dishes-filter-section">
        <div className="container">
          <div className="filter-tabs">
            {filters.map((f) => (
              <button
                key={f.code}
                className={`filter-tab ${
                  activeFilter === f.code ? "active" : ""
                }`}
                onClick={() => setActiveFilter(f.code)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DISHES GRID */}
      <section className="dishes-section">
        <div className="container">

          {filteredDishes.length > 0 ? (
            <div className="row g-4">
              {filteredDishes.map((dish, index) => (
                <div className="col-md-6 col-lg-4" key={dish.id}>
                  <Link to={`/dishes/${dish.id}`} className="dish-card-link">
                    <article
                      className="dish-card"
                      style={{ animationDelay: `${index * 70}ms` }}
                    >
                      <div className="dish-image-wrapper">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="dish-image"
                        />
                        <div className="dish-image-gradient"></div>
                        <div className="dish-tag">{dish.tag}</div>
                        <div className="dish-hover-content">
                          <span>View Recipe</span>
                        </div>
                      </div>

                      <div className="dish-content">
                        <div className="dish-cuisine-label">
                          {dish.cuisine} Cuisine
                        </div>
                        <h3>{dish.name}</h3>
                        <p>{dish.description}</p>
                      </div>
                    </article>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-dishes-msg">
              <span className="no-dishes-icon">🍽️</span>
              <h3>NOT IN THE LIST</h3>
              <p>
                We couldn't find "<strong>{searchTerm}</strong>" in our
                collection yet. Try another dish or cuisine.
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default Dishes;