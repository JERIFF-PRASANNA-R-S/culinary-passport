import { Link } from "react-router-dom";

const featuredCuisines = [
  {
    name: "Indian Cuisine",
    country: "India",
    code: "IN",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=85",
    description: "Rich spices, traditional recipes, and diverse flavours from every region.",
  },
  {
    name: "Italian Cuisine",
    country: "Italy",
    code: "IT",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85",
    description: "Famous for pasta, pizza, herbs, cheese, and timeless traditions.",
  },
  {
    name: "Japanese Cuisine",
    country: "Japan",
    code: "JP",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=85",
    description: "A balance of fresh ingredients and beautiful presentation.",
  },
  {
    name: "Mexican Cuisine",
    country: "Mexico",
    code: "MX",
    image:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=85",
    description: "Bold flavours, colourful ingredients, and rich culinary heritage.",
  },
  {
    name: "Korean Cuisine",
    country: "South Korea",
    code: "KR",
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=85",
    description: "Fermented foods, bold seasonings, and distinctive flavours.",
  },
  {
    name: "Thai Cuisine",
    country: "Thailand",
    code: "TH",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=85",
    description: "A perfect combination of sweet, sour, salty, and spicy.",
  },
];

const featuredDishes = [
  {
    name: "Butter Chicken",
    cuisine: "Indian",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Margherita Pizza",
    cuisine: "Italian",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Sushi Platter",
    cuisine: "Japanese",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Tacos al Pastor",
    cuisine: "Mexican",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=700&q=85",
  },
];

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="container-fluid bg-dark text-white">
        <div className="container py-5">
          <div className="row align-items-center min-vh-75">

            {/* LEFT CONTENT */}
            <div className="col-lg-7 py-5">

              <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                🌍 Explore • Taste • Discover
              </span>

              <h1 className="display-2 fw-bold mb-4">
                Discover the World
                <br />
                <span className="text-warning">
                  One Dish at a Time.
                </span>
              </h1>

              <p className="lead text-light mb-4">
                Travel through global cuisines, discover authentic dishes,
                explore their origins, and experience the stories behind
                every flavour.
              </p>

              <div className="d-flex gap-3 flex-wrap">

                <Link
                  to="/cuisines"
                  className="btn btn-warning btn-lg px-4"
                >
                  Explore Cuisines →
                </Link>

                <Link
                  to="/dishes"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  Discover Dishes
                </Link>

              </div>

            </div>

            {/* RIGHT VISUAL */}
            <div className="col-lg-5 text-center py-5">

              <div
                className="rounded-circle bg-warning d-inline-flex align-items-center justify-content-center shadow-lg hero-emoji-spin"
                style={{
                  width: "320px",
                  height: "320px",
                  fontSize: "140px"
                }}
              >
                🍜
              </div>

              <h3 className="mt-4 fw-bold">
                Where Every Dish Has a Destination
              </h3>

              <p className="text-secondary">
                From street food to traditional cuisine — 8 cuisines,
                24+ dishes, and counting.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* FEATURED CUISINES */}
      <section className="py-5 bg-light">
        <div className="container">

          {/* SECTION HEADING */}
          <div className="text-center mb-5">

            <span className="badge bg-warning text-dark px-3 py-2 mb-3">
              🌍 Explore the World
            </span>

            <h2 className="display-5 fw-bold">
              Discover Global Cuisines
            </h2>

            <p
              className="text-muted mx-auto"
              style={{ maxWidth: "650px" }}
            >
              Explore traditional flavours, unique cooking styles,
              and authentic dishes from different cultures around
              the world.
            </p>

          </div>

          {/* CUISINE CARDS */}
          <div className="row g-4">
            {featuredCuisines.map((cuisine) => (
              <div className="col-md-6 col-lg-4" key={cuisine.code}>
                <div className="card h-100 border-0 shadow-sm home-cuisine-card">

                  <div className="home-cuisine-img-wrapper">
                    <img
                      src={cuisine.image}
                      alt={cuisine.name}
                      className="home-cuisine-img"
                    />
                    <span className="home-cuisine-code">{cuisine.code}</span>
                  </div>

                  <div className="card-body p-4">
                    <div className="text-uppercase text-warning fw-bold small mb-1">
                      {cuisine.country}
                    </div>

                    <h4 className="fw-bold">
                      {cuisine.name}
                    </h4>

                    <p className="text-muted">
                      {cuisine.description}
                    </p>

                    <Link
                      to="/cuisines"
                      className="btn btn-dark"
                    >
                      Explore Cuisine →
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/cuisines" className="btn btn-outline-dark btn-lg px-4">
              View All Cuisines →
            </Link>
          </div>

        </div>
      </section>

      {/* FEATURED DISHES */}
      <section className="py-5 bg-white">
        <div className="container">

          <div className="text-center mb-5">
            <span className="badge bg-warning text-dark px-3 py-2 mb-3">
              🍽️ Popular Picks
            </span>

            <h2 className="display-5 fw-bold">
              Featured Dishes
            </h2>

            <p className="text-muted mx-auto" style={{ maxWidth: "650px" }}>
              A quick taste of what's waiting for you — search or filter
              the full collection on the Dishes page.
            </p>
          </div>

          <div className="row g-4">
            {featuredDishes.map((dish) => (
              <div className="col-md-6 col-lg-3" key={dish.name}>
                <Link to="/dishes" className="home-dish-card d-block">
                  <div className="home-dish-img-wrapper">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="home-dish-img"
                    />
                    <div className="home-dish-overlay">
                      <span>View in Dishes →</span>
                    </div>
                  </div>
                  <div className="pt-3 text-center">
                    <h6 className="fw-bold mb-1">{dish.name}</h6>
                    <p className="text-muted small mb-0">{dish.cuisine} Cuisine</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/dishes" className="btn btn-warning btn-lg px-4 fw-bold">
              Browse All Dishes →
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}

export default Home;