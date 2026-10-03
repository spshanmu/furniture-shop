import { useNavigate } from "react-router-dom";
import {
  FiCreditCard,
  FiSmartphone,
  FiTruck
} from "react-icons/fi";

function PaymentOptions() {
  const navigate = useNavigate();

  const paymentMethods = [
    {
      id: 1,
      icon: <FiCreditCard />,
      title: "Credit / Debit Card",
      description:
        "Pay securely using your credit or debit card during checkout."
    },
    {
      id: 2,
      icon: <FiSmartphone />,
      title: "UPI",
      description:
        "Pay quickly using your preferred UPI application."
    },
    {
      id: 3,
      icon: <FiTruck />,
      title: "Cash on Delivery",
      description:
        "Pay for your order when it is delivered to your address."
    }
  ];

  return (
    <section className="py-5">

      <div className="container">

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Payment Options
          </h1>

          <p className="text-muted">
            Choose a convenient payment method for your order.
          </p>

        </div>

        <div className="row g-4 justify-content-center">

          {paymentMethods.map((method) => (

            <div
              className="col-12 col-md-6 col-lg-4"
              key={method.id}
            >

              <div className="payment-method-card">

                <div className="payment-method-icon">
                  {method.icon}
                </div>

                <h4 className="fw-bold mt-3">
                  {method.title}
                </h4>

                <p className="text-muted">
                  {method.description}
                </p>

              </div>

            </div>

          ))}

        </div>

        <div className="text-center mt-5">

          <button
            className="btn btn-warning px-4 py-3 fw-bold"
            onClick={() => navigate("/checkout")}
          >
            GO TO CHECKOUT
          </button>

        </div>

      </div>

    </section>
  );
}

export default PaymentOptions;