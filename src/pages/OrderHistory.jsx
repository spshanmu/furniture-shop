import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderHistory({ orders }) {
  const navigate = useNavigate();

  const [orderList, setOrderList] = useState(orders);

  const cancelOrder = (orderId) => {
    const updatedOrders = orderList.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: "Cancelled"
          }
        : order
    );

    setOrderList(updatedOrders);

    localStorage.setItem(
      "furniroOrders",
      JSON.stringify(updatedOrders)
    );
  };

  if (orderList.length === 0) {
    return (
      <section className="py-5">
        <div className="container text-center">

          <h1 className="fw-bold mb-3">
            Order History
          </h1>

          <p className="text-muted mb-4">
            You haven't placed any orders yet.
          </p>

          <button
            className="btn btn-warning px-4 py-2 fw-bold"
            onClick={() => navigate("/shop")}
          >
            START SHOPPING
          </button>

        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Order History
          </h1>

          <p className="text-muted">
            View your previous orders and order details.
          </p>

        </div>

        {orderList.map((order) => (

          <div
            className="order-history-card mb-4"
            key={order.id}
          >

            {/* Order Header */}

            <div className="order-history-header">

              <div>

                <h5 className="fw-bold mb-1">
                  Order #{order.id}
                </h5>

                <small className="text-muted">
                  {order.date}
                </small>

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


            {/* Billing Details */}

            <div className="order-billing mb-4">

              <h6 className="fw-bold">
                Billing Details
              </h6>

              <p className="mb-1">
                <strong>Name:</strong>{" "}
                {order.customer.name}
              </p>

              <p className="mb-1">
                <strong>Email:</strong>{" "}
                {order.customer.email}
              </p>

              <p className="mb-1">
                <strong>Phone:</strong>{" "}
                {order.customer.phone}
              </p>

              <p className="mb-0">
                <strong>Address:</strong>{" "}
                {order.customer.address}
              </p>

            </div>


            {/* Products */}

            <h6 className="fw-bold mb-3">
              Products
            </h6>

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


            {/* Footer */}

            <div className="order-history-footer">

              <div>

                <span className="text-muted">
                  Payment Method
                </span>

                <strong className="d-block text-uppercase">
                  {order.paymentMethod}
                </strong>

              </div>

              <div className="text-end">

                <span className="text-muted">
                  Total Amount
                </span>

                <h5 className="fw-bold mb-0">
                  {typeof order.total === "number"
                    ? `Rp ${order.total.toLocaleString()}`
                    : order.total}
                </h5>

              </div>

            </div>


            {/* Cancel Button */}

            {order.status !== "Cancelled" && (

              

                <div className="d-flex justify-content-end gap-2 mt-4">

                    <button
                        className="btn btn-outline-dark"
                        onClick={() =>
                        navigate(`/orders/${order.id}`)
                        }
                    >
                        VIEW DETAILS
                    </button>

                    {order.status !== "Cancelled" && (
                        <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                            cancelOrder(order.id)
                        }
                        >
                        CANCEL ORDER
                        </button>
                    )}

                 </div>

              

            )}

          </div>

        ))}

      </div>
    </section>
  );
}

export default OrderHistory;