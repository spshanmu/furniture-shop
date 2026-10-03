import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiX } from "react-icons/fi";

function Wishlist({
  wishlist,
  addToCart,
  toggleWishlist
}) {
  const navigate = useNavigate();

  return (
    <section className="py-5">

      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">

          <h1 className="fw-bold">
            My Wishlist
          </h1>

          <p className="text-muted">
            Your favorite products
          </p>

        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (

          <div className="text-center py-5">

            <FiHeart size={45} />

            <h4 className="mt-3">
              Your wishlist is empty ❤️
            </h4>

            <p className="text-muted">
              Like a product to add it to your wishlist.
            </p>

            <button
              className="btn btn-warning px-4 py-3 mt-3 fw-bold"
              onClick={() => navigate("/shop")}
            >
              GO TO SHOP
            </button>

          </div>

        ) : (

          <div className="row g-4">

            {wishlist.map((product) => (

              <div
                className="col-12 col-sm-6 col-lg-3"
                key={product.id}
              >

                <div className="wishlist-card">

                  {/* Image */}
                  <div
                    className="wishlist-image-wrapper"
                    onClick={() =>
                      navigate(`/product/${product.id}`)
                    }
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      className="wishlist-product-image"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/500x500?text=No+Image";
                      }}
                    />

                  </div>

                  {/* Details */}
                  <div className="p-3">

                    <h5 className="fw-bold mb-1">
                      {product.name}
                    </h5>

                    <p className="text-muted mb-2">
                      {product.description}
                    </p>

                    <strong>
                      {product.price}
                    </strong>

                    {/* Buttons */}
                    <div className="d-flex gap-2 mt-3">

                      <button
                        className="btn btn-dark flex-grow-1"
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        <FiShoppingCart />
                        {" "}ADD TO CART
                      </button>

                      <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                          toggleWishlist(product)
                        }
                        title="Remove from wishlist"
                      >
                        <FiX />
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default Wishlist;