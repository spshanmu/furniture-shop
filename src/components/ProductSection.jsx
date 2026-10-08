import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShareAlt,
  FaShoppingCart,
} from "react-icons/fa";
import products from "../data/products";

function ProductSection({
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const navigate = useNavigate();

  // Home page shows only the first 8 products
  const homeProducts = products.slice(0, 8);

  const isLiked = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  return (
    <section className="products-section py-5">
      <div className="container">

        {/* HEADING */}
        <h2 className="products-heading text-center">
          Our Products
        </h2>

        {/* PRODUCTS */}
        <div className="row g-4">

          {homeProducts.map((product) => (
            <div
              className="col-12 col-sm-6 col-lg-3"
              key={product.id}
            >
              <div className="product-card">

                {/* IMAGE */}
                <div
                  className="product-image-container"
                  onClick={() =>
                    navigate(
                      `/product/${product.id}`
                    )
                  }
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />

                  {/* DISCOUNT BADGE */}
                  {product.discount && (
                    <span className="product-badge discount-badge">
                      {product.discount}
                    </span>
                  )}

                  {/* NEW BADGE */}
                  {product.badge && (
                    <span className="product-badge new-badge">
                      {product.badge}
                    </span>
                  )}

                  {/* HOVER ACTIONS */}
                  <div
                    className="product-overlay"
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                  >
                    <button
                      className="add-cart-button"
                      onClick={() =>
                        addToCart(product)
                      }
                    >
                      <FaShoppingCart />
                      Add to cart
                    </button>

                    <div className="product-action-buttons">

                      {/* LIKE */}
                      <button
                        onClick={() =>
                          toggleWishlist(product)
                        }
                      >
                        <FaHeart
                          style={{
                            color: isLiked(
                              product.id
                            )
                              ? "#b88e2f"
                              : "white",
                          }}
                        />

                        {isLiked(product.id)
                          ? "Liked"
                          : "Like"}
                      </button>

                      {/* SHARE */}
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(
                            window.location.origin +
                              `/product/${product.id}`
                          );
                        }}
                      >
                        <FaShareAlt />
                        Share
                      </button>

                    </div>
                  </div>
                </div>

                {/* PRODUCT INFO */}
                <div className="product-info">

                  <h5
                    onClick={() =>
                      navigate(
                        `/product/${product.id}`
                      )
                    }
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {product.name}
                  </h5>

                  <p>
                    {product.description}
                  </p>

                  {/* PRICE */}
                  <div className="price-container">
                    <strong>
                      {product.price}
                    </strong>

                    {product.oldPrice && (
                      <del>
                        {product.oldPrice}
                      </del>
                    )}
                  </div>

                  {/* RATING */}
                  <div className="product-rating">

                    <span className="stars">

                      {Array.from(
                        { length: 5 },
                        (_, index) => {
                          const rating =
                            product.rating;

                          if (
                            index + 1 <=
                            Math.floor(rating)
                          ) {
                            return (
                              <span key={index}>
                                ★
                              </span>
                            );
                          }

                          if (
                            index < rating
                          ) {
                            return (
                              <span
                                key={index}
                                className="half-star"
                              >
                                ★
                              </span>
                            );
                          }

                          return (
                            <span
                              key={index}
                              className="empty-star"
                            >
                              ★
                            </span>
                          );
                        }
                      )}

                    </span>

                    <strong>
                      {product.rating}
                    </strong>

                    <span className="review-count">
                      ({product.reviews} reviews)
                    </span>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* SHOW MORE */}
        <div className="text-center mt-5">
          <button
            className="show-more-button"
            onClick={() => navigate("/shop")}
          >
            Show More
          </button>
        </div>

      </div>
    </section>
  );
}

export default ProductSection;