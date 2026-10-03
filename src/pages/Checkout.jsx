import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, clearCart, addOrder }) {
  const navigate = useNavigate();

  // =========================
  // BILLING DETAILS
  // =========================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // =========================
  // PAYMENT
  // =========================

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [paymentDetails, setPaymentDetails] =
    useState({
      cardNumber: "",
      expiry: "",
      cvv: "",
      upiId: ""
    });

  // =========================
  // ORDER
  // =========================

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const [orderDetails, setOrderDetails] =
    useState(null);

  // =========================
  // SAFE PRICE
  // =========================

  const getNumericPrice = (price) => {
    if (typeof price === "string") {
      return Number(
        price.replace(/[^\d]/g, "")
      );
    }

    return Number(price);
  };

  // =========================
  // TOTAL
  // =========================

  const total = cart.reduce(
    (sum, item) => {
      const price =
        getNumericPrice(item.price);

      return (
        sum +
        price * item.quantity
      );
    },
    0
  );

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // PAYMENT CHANGE
  // =========================

  const handlePaymentChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // PLACE ORDER
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      id: Date.now(),
      customer: {
        ...formData
      },
      products: [...cart],
      total: total,
      paymentMethod: paymentMethod,
      date: new Date().toLocaleString(),
      status: "Order Placed"
    };

    addOrder(newOrder)
    
    setOrderDetails(newOrder);

    setOrderPlaced(true);

    clearCart();
  };

  // =========================
  // ORDER SUCCESS
  // =========================

  if (orderPlaced && orderDetails) {
    return (
      <section className="py-5">

        <div className="container">

          {/* SUCCESS */}

          <div className="text-center mb-5">

            <h1 className="fw-bold">
              Order Placed Successfully! 🎉
            </h1>

            <p className="text-muted mt-2">
              Thank you for shopping with Furniro.
            </p>

          </div>

          <div className="row g-4">

            {/* ========================= */}
            {/* BILLING DETAILS */}
            {/* ========================= */}

            <div className="col-12 col-lg-5">

              <div className="checkout-summary p-4">

                <h4 className="fw-bold mb-4">
                  Billing Details
                </h4>

                <div className="mb-3">

                  <strong>
                    Full Name
                  </strong>

                  <p className="text-muted mb-0">
                    {orderDetails.customer.name}
                  </p>

                </div>

                <div className="mb-3">

                  <strong>
                    Email
                  </strong>

                  <p className="text-muted mb-0">
                    {orderDetails.customer.email}
                  </p>

                </div>

                <div className="mb-3">

                  <strong>
                    Phone
                  </strong>

                  <p className="text-muted mb-0">
                    {orderDetails.customer.phone}
                  </p>

                </div>

                <div className="mb-3">

                  <strong>
                    Delivery Address
                  </strong>

                  <p className="text-muted mb-0">
                    {orderDetails.customer.address}
                  </p>

                </div>

                <hr />

                <div className="d-flex justify-content-between">

                  <strong>
                    Payment
                  </strong>

                  <span>
                    {orderDetails.paymentMethod ===
                      "card" &&
                      "Credit / Debit Card"}

                    {orderDetails.paymentMethod ===
                      "upi" &&
                      "UPI"}

                    {orderDetails.paymentMethod ===
                      "cod" &&
                      "Cash on Delivery"}
                  </span>

                </div>

              </div>

            </div>

            {/* ========================= */}
            {/* ORDER DETAILS */}
            {/* ========================= */}

            <div className="col-12 col-lg-7">

              <div className="checkout-summary p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <h4 className="fw-bold mb-0">
                    Order Details
                  </h4>

                  <span className="badge bg-success">
                    {orderDetails.status}
                  </span>

                </div>

                <p className="text-muted">
                  Order ID: #
                  {orderDetails.id}
                </p>

                <p className="text-muted">
                  Date: {orderDetails.date}
                </p>

                <hr />

                {/* PRODUCTS */}

                {orderDetails.products.map(
                  (item) => {

                    const price =
                      getNumericPrice(
                        item.price
                      );

                    const itemTotal =
                      price *
                      item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="d-flex align-items-center justify-content-between mb-4"
                      >

                        <div className="d-flex align-items-center gap-3">

                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                              borderRadius: "6px"
                            }}
                          />

                          <div>

                            <strong>
                              {item.name}
                            </strong>

                            <p className="text-muted mb-0">
                              Qty: {item.quantity}
                            </p>

                          </div>

                        </div>

                        <strong>
                          Rp{" "}
                          {itemTotal.toLocaleString()}
                        </strong>

                      </div>
                    );
                  }
                )}

                <hr />

                {/* TOTAL */}

                <div className="d-flex justify-content-between">

                  <strong>
                    Total
                  </strong>

                  <strong className="checkout-total">
                    Rp{" "}
                    {orderDetails.total.toLocaleString()}
                  </strong>

                </div>

              </div>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="text-center mt-5">

            <button
              className="btn btn-warning px-4 py-3 fw-bold me-2"
              onClick={() =>
                navigate("/shop")
              }
            >
              CONTINUE SHOPPING
            </button>

            <button
              className="btn btn-outline-dark px-4 py-3 fw-bold"
              onClick={() =>
                navigate("/")
              }
            >
              GO TO HOME
            </button>

          </div>

        </div>

      </section>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <section className="py-5">

        <div className="container text-center py-5">

          <h1 className="fw-bold">
            Your Cart is Empty 🛒
          </h1>

          <p className="text-muted mt-3">
            Add some products to your cart
            before proceeding to checkout.
          </p>

          <button
            className="btn btn-warning px-4 py-3 mt-3 fw-bold"
            onClick={() =>
              navigate("/shop")
            }
          >
            GO TO SHOP
          </button>

        </div>

      </section>
    );
  }

  // =========================
  // CHECKOUT PAGE
  // =========================

  return (
    <section className="py-5">

      <div className="container">

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Checkout
          </h1>

          <p className="text-muted">
            Complete your order
          </p>

        </div>

        <div className="row g-5">

          {/* BILLING */}

          <div className="col-12 col-lg-7">

            <div className="checkout-form-wrapper p-4">

              <h4 className="fw-bold mb-4">
                Billing Details
              </h4>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label
                    htmlFor="name"
                    className="form-label"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label
                    htmlFor="email"
                    className="form-label"
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label
                    htmlFor="phone"
                    className="form-label"
                  >
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-4">

                  <label
                    htmlFor="address"
                    className="form-label"
                  >
                    Address
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    className="form-control"
                    rows="4"
                    placeholder="Enter your delivery address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>

                </div>

                {/* PAYMENT */}

                <div className="payment-section mt-4">

                  <h4 className="fw-bold mb-3">
                    Payment Method
                  </h4>

                  <div className="payment-choice">

                    <label className="payment-option">

                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={
                          paymentMethod === "card"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span>
                        💳 Credit / Debit Card
                      </span>

                    </label>

                    <label className="payment-option">

                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={
                          paymentMethod === "upi"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span>
                        📱 UPI
                      </span>

                    </label>

                    <label className="payment-option">

                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={
                          paymentMethod === "cod"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span>
                        🚚 Cash on Delivery
                      </span>

                    </label>

                  </div>

                  {/* CARD */}

                  {paymentMethod === "card" && (

                    <div className="payment-details mt-3">

                      <div className="mb-3">

                        <label
                          htmlFor="cardNumber"
                          className="form-label"
                        >
                          Card Number
                        </label>

                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          className="form-control"
                          placeholder="Enter card number"
                          value={
                            paymentDetails.cardNumber
                          }
                          onChange={
                            handlePaymentChange
                          }
                          required
                        />

                      </div>

                      <div className="row">

                        <div className="col-6 mb-3">

                          <label
                            htmlFor="expiry"
                            className="form-label"
                          >
                            Expiry Date
                          </label>

                          <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            className="form-control"
                            placeholder="MM/YY"
                            value={
                              paymentDetails.expiry
                            }
                            onChange={
                              handlePaymentChange
                            }
                            required
                          />

                        </div>

                        <div className="col-6 mb-3">

                          <label
                            htmlFor="cvv"
                            className="form-label"
                          >
                            CVV
                          </label>

                          <input
                            type="password"
                            id="cvv"
                            name="cvv"
                            className="form-control"
                            placeholder="CVV"
                            value={
                              paymentDetails.cvv
                            }
                            onChange={
                              handlePaymentChange
                            }
                            required
                          />

                        </div>

                      </div>

                    </div>

                  )}

                  {/* UPI */}

                  {paymentMethod === "upi" && (

                    <div className="payment-details mt-3">

                      <label
                        htmlFor="upiId"
                        className="form-label"
                      >
                        UPI ID
                      </label>

                      <input
                        type="text"
                        id="upiId"
                        name="upiId"
                        className="form-control"
                        placeholder="example@upi"
                        value={
                          paymentDetails.upiId
                        }
                        onChange={
                          handlePaymentChange
                        }
                        required
                      />

                    </div>

                  )}

                  {/* COD */}

                  {paymentMethod === "cod" && (

                    <div className="cod-message mt-3">

                      <p className="mb-0">
                        You can pay when your
                        order is delivered.
                      </p>

                    </div>

                  )}

                </div>

                <button
                  type="submit"
                  className="btn btn-warning w-100 py-3 fw-bold mt-4"
                >
                  PLACE ORDER
                </button>

              </form>

            </div>

          </div>

          {/* ORDER SUMMARY */}

          <div className="col-12 col-lg-5">

            <div className="checkout-summary p-4">

              <h4 className="fw-bold mb-4">
                Your Order
              </h4>

              {cart.map((item) => {

                const price =
                  getNumericPrice(item.price);

                const itemTotal =
                  price * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between align-items-center mb-3"
                  >

                    <div>

                      <strong>
                        {item.name}
                      </strong>

                      <p className="text-muted mb-0">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <span>
                      Rp{" "}
                      {itemTotal.toLocaleString()}
                    </span>

                  </div>
                );
              })}

              <hr />

              <div className="d-flex justify-content-between mb-3">

                <strong>
                  Total
                </strong>

                <strong className="checkout-total">
                  Rp {total.toLocaleString()}
                </strong>

              </div>

              <hr />

              <div className="d-flex justify-content-between">

                <strong>
                  Payment
                </strong>

                <span>

                  {paymentMethod === "card" &&
                    "Credit / Debit Card"}

                  {paymentMethod === "upi" &&
                    "UPI"}

                  {paymentMethod === "cod" &&
                    "Cash on Delivery"}

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Checkout;