import { useParams, Link } from "react-router-dom";
import { dishes } from "../data/dishesData";
import "./DishDetail.css";

function StarRating({ rating }) {
  const fullStars = Math.round(rating);
  return (
    <div className="star-rating" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= fullStars ? "star filled" : "star"}>
          ★
        </span>
      ))}
      <span className="rating-number">{rating.toFixed(1)}</span>
    </div>
  );
}

function DishDetail() {
  const { id } = useParams();
  const dish = dishes.find((d) => d.id === id);

  if (!dish) {
    return (
      <div className="dish-not-found">
        <h2>Dish not found</h2>
        <p>We couldn't find that recipe.</p>
        <Link to="/dishes" className="back-link">← Back to Dishes</Link>
      </div>
    );
  }

  return (
    <main className="dish-detail-page">

      {/* HERO IMAGE */}
      <section className="dish-detail-hero">
        <img src={dish.image} alt={dish.name} className="dish-detail-hero-img" />
        <div className="dish-detail-hero-overlay">
          <Link to="/dishes" className="back-link">← Back to Dishes</Link>
          <span className="dish-detail-cuisine">{dish.cuisine} Cuisine</span>
          <h1>{dish.name}</h1>
          <StarRating rating={dish.rating} />
        </div>
      </section>

      {/* CONTENT */}
      <section className="dish-detail-body">
        <div className="container">
          <div className="row g-5">

            {/* LEFT: DESCRIPTION + INGREDIENTS */}
            <div className="col-lg-5">
              <p className="dish-detail-description">{dish.description}</p>

              <span className="dish-detail-tag">{dish.tag}</span>

              <h3 className="section-title">Ingredients</h3>
              <ul className="ingredients-list">
                {dish.ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* RIGHT: PROCEDURE */}
            <div className="col-lg-7">
              <h3 className="section-title">Cooking Procedure</h3>
              <ol className="procedure-list">
                {dish.procedure.map((step, i) => (
                  <li key={i}>
                    <span className="step-number">{i + 1}</span>
                    <span className="step-text">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

export default DishDetail;