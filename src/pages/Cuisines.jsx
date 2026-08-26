import { Link } from "react-router-dom";
import "./Cuisines.css";

const cuisines = [
  {
    name: "Indian Cuisine",
    code: "IN",
    country: "India",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=85",
    description:
      "Rich spices, traditional recipes, colourful ingredients, and centuries of culinary traditions.",
    dishes: "Biryani • Butter Chicken • Masala Dosa",
  },
  {
    name: "Italian Cuisine",
    code: "IT",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85",
    description:
      "A celebrated cuisine known for pasta, pizza, cheese, herbs, and authentic regional flavours.",
    dishes: "Pizza • Pasta • Risotto",
  },
  {
    name: "Chinese Cuisine",
    code: "CN",
    country: "China",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=85",
    description:
      "A vast culinary tradition of bold stir-fries, dumplings, and regional specialties.",
    dishes: "Peking Duck • Kung Pao Chicken • Dim Sum",
  },
  {
    name: "Japanese Cuisine",
    code: "JP",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=85",
    description:
      "Fresh ingredients, delicate flavours, artistic presentation, and traditional techniques.",
    dishes: "Sushi • Ramen • Tempura",
  },
  {
    name: "Mexican Cuisine",
    code: "MX",
    country: "Mexico",
    image:
      "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1200&q=85",
    description:
      "Bold flavours, vibrant ingredients, traditional sauces, and a rich culinary heritage.",
    dishes: "Tacos • Enchiladas • Guacamole",
  },
  {
    name: "French Cuisine",
    code: "FR",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=85",
    description:
      "Elegant culinary traditions featuring refined techniques, pastries, sauces, and regional dishes.",
    dishes: "Croissant • Ratatouille • Crêpes",
  },
  {
    name: "Thai Cuisine",
    code: "TH",
    country: "Thailand",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=85",
    description:
      "A harmonious combination of sweet, sour, salty, spicy, and aromatic flavours.",
    dishes: "Pad Thai • Tom Yum • Green Curry",
  },
  {
    name: "Korean Cuisine",
    code: "KR",
    country: "South Korea",
    image:
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=85",
    description:
      "Distinctive fermented foods, seasonings, rice dishes, and traditional Korean flavours.",
    dishes: "Kimchi • Bibimbap • Bulgogi",
  },
  {
    name: "Spanish Cuisine",
    code: "ES",
    country: "Spain",
    image:
      "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=1200&q=85",
    description:
      "Sun-soaked Mediterranean flavours built around rice, seafood, and shared small plates.",
    dishes: "Paella • Tortilla Española • Churros",
  },
  {
    name: "Turkish Cuisine",
    code: "TR",
    country: "Türkiye",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=85",
    description:
      "A rich blend of Mediterranean, Middle Eastern, and Central Asian culinary influences.",
    dishes: "Kebab • Baklava • Meze",
  },
];

function Cuisines() {
  return (
    <main className="cuisines-page">

      {/* PAGE HERO */}
      <section className="cuisines-hero">
        <div className="container">
          <div className="cuisines-hero-content text-center">

            <span className="passport-badge">
              🌍 Culinary Passport
            </span>

            <h1>
              Explore World <span>Cuisines</span>
            </h1>

            <p>
              Take a culinary journey across countries and cultures.
              Discover traditional flavours, famous dishes, and the
              stories behind the food.
            </p>

          </div>
        </div>
      </section>

      {/* CUISINE COLLECTION */}
      <section className="cuisine-section">
        <div className="container">

          <div className="section-heading text-center">
            <span>DISCOVER • EXPLORE • TASTE</span>

            <h2>
              A World of Flavours
            </h2>

            <p>
              Choose a destination and discover the flavours that
              make its cuisine unique.
            </p>
          </div>

          <div className="row g-4">

            {cuisines.map((cuisine, index) => (
              <div
                className="col-md-6 col-lg-4"
                key={cuisine.code}
              >

                <article
                  className="cuisine-card"
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >

                  {/* IMAGE AREA */}
                  <div className="cuisine-image-wrapper">

                    <img
                      src={cuisine.image}
                      alt={cuisine.name}
                      className="cuisine-image"
                    />

                    {/* DARK GRADIENT */}
                    <div className="image-gradient"></div>

                    {/* COUNTRY CODE */}
                    <div className="country-code">
                      {cuisine.code}
                    </div>

                    {/* HOVER DISCOVER */}
                    <div className="image-hover-content">
                      <span>
                        Explore
                      </span>
                    </div>

                  </div>

                  {/* CARD CONTENT */}
                  <div className="cuisine-content">

                    <div className="country-name">
                      {cuisine.country}
                    </div>

                    <h3>
                      {cuisine.name}
                    </h3>

                    <p>
                      {cuisine.description}
                    </p>

                    <div className="popular-dishes">
                      <strong>Popular:</strong>
                      <br />
                      {cuisine.dishes}
                    </div>

                    <Link
                      to="/dishes"
                      className="explore-button"
                    >
                      <span>Explore Dishes</span>
                      <span className="arrow">→</span>
                    </Link>

                  </div>

                </article>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="cuisine-cta">
        <div className="container">
          <div className="cta-box text-center">

            <span>YOUR NEXT FLAVOUR AWAITS</span>

            <h2>
              Where will your taste buds travel next?
            </h2>

            <p>
              Explore our collection of dishes and discover
              something delicious from around the world.
            </p>

            <Link
              to="/dishes"
              className="cta-button"
            >
              Discover Dishes →
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}

export default Cuisines;