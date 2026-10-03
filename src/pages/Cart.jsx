import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Cart({
  cart,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart
}) {
  const navigate = useNavigate();

  const getNumericPrice = (price) => {
    if (typeof price === "string") {
      return Number(price.replace(/[^\d]/g, ""));
    }

    return Number(price);
  };

  const subtotal = cart.reduce((total, item) => {
    const numericPrice = getNumericPrice(item.price);

    return total + numericPrice * item.quantity;
  }, 0);

  return (
    <section className="py-5">
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">
            Shopping Cart
          </h1>

          <p className="text-muted">
            Review your selected products
          </p>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (

          <div className="text-center py-5">

            <h4>
              Your cart is empty 🛒
            </h4>

            <p className="text-muted">
              Add some products to your cart.
            </p>

            <button
              className="btn btn-warning px-4 py-3 mt-3 fw-bold"
              onClick={() => navigate("/shop")}
            >
              CONTINUE SHOPPING
            </button>

          </div>

        ) : (

          <div className="row g-4">

            {/* Cart Products */}
            <div className="col-lg-8">

              {cart.map((item) => (

                <div
                  className="cart-item d-flex align-items-center gap-3 mb-4 p-3"
                  key={item.id}
                >

                  {/* Product Image */}
                  <div className="cart-image-wrapper">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-product-image"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/200x200?text=No+Image";
                      }}
                    />

                  </div>

                  {/* Product Information */}
                  <div className="flex-grow-1">

                    <h5 className="mb-1">
                      {item.name}
                    </h5>

                    <p className="text-muted mb-2">
                      {item.description}
                    </p>

                    <strong>
                      {typeof item.price === "string"
                        ? item.price
                        : `Rp ${Number(
                            item.price
                          ).toLocaleString()}
                        `}
                    </strong>

                  </div>

                  {/* Quantity */}
                  <div className="quantity-control">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        addToCart(item)
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    aria-label={`Remove ${item.name}`}
                  >
                    <FiTrash2 />
                  </button>

                </div>

              ))}

              {/* Cart Buttons */}
              <div className="cart-actions d-flex justify-content-between align-items-center gap-3">

                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => navigate("/shop")}
                >
                  CONTINUE SHOPPING
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={clearCart}
                >
                  CLEAR CART
                </button>

              </div>

            </div>

            {/* Cart Summary */}
            <div className="col-lg-4">

              <div className="cart-summary p-4">

                <h4 className="fw-bold mb-4">
                  Cart Summary
                </h4>

                <div className="d-flex justify-content-between mb-3">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    Rp {subtotal.toLocaleString()}
                  </strong>

                </div>

                <hr />

                <div className="d-flex justify-content-between mb-4">

                  <strong>
                    Total
                  </strong>

                  <strong className="cart-total">
                    Rp {subtotal.toLocaleString()}
                  </strong>

                </div>

                <button
                  type="button"
                  className="btn btn-warning w-100 py-3 fw-bold"
                  onClick={() => navigate("/checkout")}
                >
                  CHECKOUT
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    </section>
  );
}

export default Cart;