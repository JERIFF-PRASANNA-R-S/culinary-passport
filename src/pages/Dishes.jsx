import { useState } from "react";
import "./Dishes.css";

const dishes = [
  // INDIA
  {
    name: "Butter Chicken",
    cuisineCode: "IN",
    cuisine: "Indian",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=85",
    description: "Creamy tomato-based curry with tender tandoori chicken.",
    tag: "Spicy",
  },
  {
    name: "Biryani",
    cuisineCode: "IN",
    cuisine: "Indian",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1000&q=85",
    description: "Fragrant basmati rice layered with spiced meat or vegetables.",
    tag: "Aromatic",
  },
  {
    name: "Masala Dosa",
    cuisineCode: "IN",
    cuisine: "Indian",
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=85",
    description: "Crispy fermented rice crepe filled with spiced potatoes.",
    tag: "Vegetarian",
  },
  {
    name: "Chole Bhature",
    cuisineCode: "IN",
    cuisine: "Indian",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/ebyytgsxumfvmpfhw6hp",
    description: "Spiced chickpea curry served with fluffy fried bread.",
    tag: "Vegetarian",
  },

  // ITALY
  {
    name: "Margherita Pizza",
    cuisineCode: "IT",
    cuisine: "Italian",
    image:
      "https://images.unsplash.com/photo-1664309641932-0e03e0771b97?auto=format&fit=crop&w=1000&q=85",
    description: "Classic Neapolitan pizza with tomato, mozzarella, and basil.",
    tag: "Classic",
  },
  {
    name: "Spaghetti Carbonara",
    cuisineCode: "IT",
    cuisine: "Italian",
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1000&q=85",
    description: "Silky egg and pancetta sauce tossed with al dente pasta.",
    tag: "Rich",
  },
  {
    name: "Risotto ai Funghi",
    cuisineCode: "IT",
    cuisine: "Italian",
    image:
      "https://cdn.gutekueche.ch/media/recipe/27205/risotto-ai-funghi.jpg",
    description: "Creamy Arborio rice slow-cooked with wild mushrooms.",
    tag: "Vegetarian",
  },

  // JAPAN
  {
    name: "Sushi Platter",
    cuisineCode: "JP",
    cuisine: "Japanese",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1000&q=85",
    description: "An assortment of fresh nigiri and maki rolls.",
    tag: "Fresh",
  },
  {
    name: "Ramen",
    cuisineCode: "JP",
    cuisine: "Japanese",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=85",
    description: "Rich pork or miso broth with noodles, egg, and chashu.",
    tag: "Comforting",
  },
  {
    name: "Tempura",
    cuisineCode: "JP",
    cuisine: "Japanese",
    image:
      "https://sushimon.com.tr/images/products/karides_tempura.png",
    description: "Lightly battered and fried shrimp and vegetables.",
    tag: "Crispy",
  },

  // MEXICO
  {
    name: "Tacos al Pastor",
    cuisineCode: "MX",
    cuisine: "Mexican",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=85",
    description: "Marinated pork tacos with pineapple, onion, and cilantro.",
    tag: "Spicy",
  },
  {
    name: "Guacamole",
    cuisineCode: "MX",
    cuisine: "Mexican",
    image:
      "https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=1000&q=85",
    description: "Fresh mashed avocado with lime, onion, and chili.",
    tag: "Vegetarian",
  },
  {
    name: "Enchiladas",
    cuisineCode: "MX",
    cuisine: "Mexican",
    image:
      "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=1000&q=85",
    description: "Corn tortillas rolled around filling, topped with chili sauce.",
    tag: "Hearty",
  },

  // KOREA
  {
    name: "Bibimbap",
    cuisineCode: "KR",
    cuisine: "Korean",
    image:
      "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=1000&q=85",
    description: "Mixed rice bowl with vegetables, egg, and gochujang.",
    tag: "Balanced",
  },
  {
    name: "Kimchi",
    cuisineCode: "KR",
    cuisine: "Korean",
    image:
      "https://images.unsplash.com/photo-1583224964978-2257b960c3d3?auto=format&fit=crop&w=1000&q=85",
    description: "Fermented spicy cabbage, a staple side dish.",
    tag: "Fermented",
  },
  {
    name: "Bulgogi",
    cuisineCode: "KR",
    cuisine: "Korean",
    image:
      "https://assets.unileversolutions.com/recipes-v2/110810.jpg",
    description: "Sweet and savory marinated grilled beef.",
    tag: "Grilled",
  },

  // THAILAND
  {
    name: "Pad Thai",
    cuisineCode: "TH",
    cuisine: "Thai",
    image:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1000&q=85",
    description: "Stir-fried rice noodles with shrimp, egg, and peanuts.",
    tag: "Tangy",
  },
  {
    name: "Tom Yum Soup",
    cuisineCode: "TH",
    cuisine: "Thai",
    image:
      "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=1000&q=85",
    description: "Hot and sour soup with lemongrass, lime, and shrimp.",
    tag: "Spicy",
  },
  {
    name: "Green Curry",
    cuisineCode: "TH",
    cuisine: "Thai",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1000&q=85",
    description: "Coconut curry with green chilies, basil, and chicken.",
    tag: "Creamy",
  },

  // FRANCE
  {
    name: "Croissant",
    cuisineCode: "FR",
    cuisine: "French",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=85",
    description: "Buttery, flaky, and golden French breakfast pastry.",
    tag: "Buttery",
  },
  {
    name: "Ratatouille",
    cuisineCode: "FR",
    cuisine: "French",
    image:
      "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?auto=format&fit=crop&w=1000&q=85",
    description: "Slow-stewed medley of eggplant, zucchini, and tomato.",
    tag: "Vegetarian",
  },
  {
    name: "Crêpes",
    cuisineCode: "FR",
    cuisine: "French",
    image:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1000&q=85",
    description: "Thin pancakes rolled with sweet or savory fillings.",
    tag: "Versatile",
  },

  // TURKEY
  {
    name: "Kebab",
    cuisineCode: "TR",
    cuisine: "Turkish",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1000&q=85",
    description: "Grilled skewered meat, seasoned with Turkish spices.",
    tag: "Grilled",
  },
  {
    name: "Baklava",
    cuisineCode: "TR",
    cuisine: "Turkish",
    image:
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=1000&q=85",
    description: "Layered filo pastry with nuts and sweet syrup.",
    tag: "Sweet",
  },
  {
    name: "Meze Platter",
    cuisineCode: "TR",
    cuisine: "Turkish",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=85",
    description: "Assorted small plates of dips, olives, and cheeses.",
    tag: "Shareable",
  },
];

const filters = [
  { label: "All", code: "ALL" },
  { label: "India", code: "IN" },
  { label: "Italy", code: "IT" },
  { label: "Japan", code: "JP" },
  { label: "Mexico", code: "MX" },
  { label: "Korea", code: "KR" },
  { label: "Thailand", code: "TH" },
  { label: "France", code: "FR" },
  { label: "Türkiye", code: "TR" },
];

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
                <div className="col-md-6 col-lg-4" key={dish.name}>
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