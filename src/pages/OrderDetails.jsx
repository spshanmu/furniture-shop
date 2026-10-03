import { useNavigate, useParams } from "react-router-dom";

function OrderDetails({ orders }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = orders.find(
    (item) => String(item.id) === String(id)
  );

  if (!order) {
    return (
      <section className="py-5">
        <div className="container text-center py-5">

          <h2 className="fw-bold">
            Order Not Found
          </h2>

          <p className="text-muted mt-3">
            We couldn't find this order.
          </p>

          <button
            className="btn btn-warning mt-3 px-4 py-2 fw-bold"
            onClick={() => navigate("/orders")}
          >
            BACK TO ORDERS
          </button>

        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">

        {/* Heading */}

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Order Details
          </h1>

          <p className="text-muted">
            Order #{order.id}
          </p>

        </div>


        {/* Order Status */}

        <div className="order-details-header mb-4">

          <div>
            <h5 className="fw-bold mb-1">
              Order #{order.id}
            </h5>

            <p className="text-muted mb-0">
              Placed on {order.date}
            </p>
          </div>

          <span
            className={
              order.status === "Cancelled"
                ? "order-status cancelled"
                : "order-status"
            }
          >
            {order.status}
          </span>

        </div>


        <div className="row g-4">

          {/* Billing */}

          <div className="col-12 col-md-6">

            <div className="order-details-card">

              <h5 className="fw-bold mb-4">
                Billing Details
              </h5>

              <p>
                <strong>Full Name</strong>
                <br />
                {order.customer.name}
              </p>

              <p>
                <strong>Email</strong>
                <br />
                {order.customer.email}
              </p>

              <p>
                <strong>Phone</strong>
                <br />
                {order.customer.phone}
              </p>

              <p className="mb-0">
                <strong>Delivery Address</strong>
                <br />
                {order.customer.address}
              </p>

            </div>

          </div>


          {/* Payment */}

          <div className="col-12 col-md-6">

            <div className="order-details-card">

              <h5 className="fw-bold mb-4">
                Payment Details
              </h5>

              <p>
                <strong>Payment Method</strong>
                <br />

                <span className="text-uppercase">
                  {order.paymentMethod}
                </span>
              </p>

              <p className="mb-0">
                <strong>Order Status</strong>
                <br />
                {order.status}
              </p>

            </div>

          </div>

        </div>


        {/* Products */}

        <div className="order-details-card mt-4">

          <h5 className="fw-bold mb-4">
            Ordered Products
          </h5>

          <div className="order-products">

            {order.products.map((product) => (

              <div
                className="order-product-item"
                key={product.id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="order-product-image"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/100x100?text=No+Image";
                  }}
                />

                <div className="flex-grow-1">

                  <h6 className="fw-bold mb-1">
                    {product.name}
                  </h6>

                  <p className="text-muted mb-1">
                    {product.description}
                  </p>

                  <small>
                    Quantity: {product.quantity}
                  </small>

                </div>

                <strong>
                  {product.price}
                </strong>

              </div>

            ))}

          </div>


          {/* Total */}

          <div className="order-price-summary">

  <div className="d-flex justify-content-between mb-3">
    <span className="text-muted">
      Subtotal
    </span>

    <strong>
      {typeof order.total === "number"
        ? `Rp ${order.total.toLocaleString()}`
        : order.total}
    </strong>
  </div>

  <div className="d-flex justify-content-between mb-3">
    <span className="text-muted">
      Delivery
    </span>

    <strong>
      Free
    </strong>
  </div>

  <hr />

  <div className="d-flex justify-content-between align-items-center">
    <span className="fw-bold">
      Total Amount
    </span>

    <strong className="fs-5">
      {typeof order.total === "number"
        ? `Rp ${order.total.toLocaleString()}`
        : order.total}
    </strong>
  </div>

</div>

        </div>


        {/* Buttons */}

        <div className="text-center mt-4">

          <button
            className="btn btn-outline-dark px-4 py-2 me-2"
            onClick={() => navigate("/orders")}
          >
            BACK TO ORDERS
          </button>

          <button
            className="btn btn-warning px-4 py-2 fw-bold"
            onClick={() => navigate("/shop")}
          >
            CONTINUE SHOPPING
          </button>

        </div>

      </div>
    </section>
  );
}

export default OrderDetails;