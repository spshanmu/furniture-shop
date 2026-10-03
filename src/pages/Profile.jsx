import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [loggedIn, setLoggedIn] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <section className="py-5">
        <div className="container text-center py-5">

          <h1 className="fw-bold">
            You have been logged out
          </h1>

          <p className="text-muted mt-3">
            Thank you for visiting Furniro.
          </p>

          <button
            className="btn btn-warning px-4 py-3 mt-3 fw-bold"
            onClick={() => setLoggedIn(true)}
          >
            LOGIN AGAIN
          </button>

        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">

        {/* Page Heading */}

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            My Profile
          </h1>

          <p className="text-muted">
            Manage your Furniro account
          </p>

        </div>


        <div className="row justify-content-center">

          <div className="col-12 col-md-8 col-lg-6">

            <div className="profile-card p-4">

              {/* Profile */}

              <div className="text-center mb-4">

                <div className="profile-avatar">
                  👤
                </div>

                <h4 className="fw-bold mt-3">
                  Furniro Customer
                </h4>

                <p className="text-muted">
                  customer@example.com
                </p>

              </div>


              {/* Account Information */}

              <div className="profile-info">

                <div className="d-flex justify-content-between mb-3">
                  <span>Name</span>

                  <strong>
                    Furniro Customer
                  </strong>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Email</span>

                  <strong>
                    customer@example.com
                  </strong>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Account</span>

                  <strong>
                    Active
                  </strong>
                </div>

              </div>


              {/* Account Navigation */}

              <div className="mt-4">

                {/* My Orders */}

                <button
                  className="btn btn-outline-dark w-100 py-3 mb-3"
                  onClick={() => navigate("/orders")}
                >
                  📦 MY ORDERS
                </button>


                {/* My Cart */}

                <button
                  className="btn btn-outline-dark w-100 py-3 mb-3"
                  onClick={() => navigate("/cart")}
                >
                  🛒 MY CART
                </button>


                {/* My Wishlist */}

                <button
                  className="btn btn-outline-dark w-100 py-3 mb-3"
                  onClick={() => navigate("/wishlist")}
                >
                  ❤️ MY WISHLIST
                </button>


                {/* Continue Shopping */}

                <button
                  className="btn btn-warning w-100 py-3 mb-3 fw-bold"
                  onClick={() => navigate("/shop")}
                >
                  🛍️ CONTINUE SHOPPING
                </button>


                {/* Logout */}

                <button
                  className="btn btn-dark w-100 py-3"
                  onClick={handleLogout}
                >
                  LOG OUT
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Profile;