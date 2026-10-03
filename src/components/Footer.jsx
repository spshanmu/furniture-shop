import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiLinkedin
} from "react-icons/fi";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setMessage("Please enter your email.");
      return;
    }

    setMessage("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="footer-section">

      <div className="container">

        <div className="row g-4 py-5">

          {/* BRAND */}
          <div className="col-12 col-md-6 col-lg-3">

            <h3 className="fw-bold">
              Furniro
            </h3>

            <p className="text-muted mt-3">
              400 University Drive Suite 200
              <br />
              Coral Gables, FL 33134
              <br />
              USA
            </p>

          </div>


          {/* LINKS */}
          <div className="col-6 col-md-6 col-lg-2">

            <h6 className="fw-bold mb-4">
              Links
            </h6>

            <ul className="list-unstyled">

              <li className="mb-3">
                <Link to="/">
                  Home
                </Link>
              </li>

              <li className="mb-3">
                <Link to="/shop">
                  Shop
                </Link>
              </li>

              <li className="mb-3">
                <Link to="/about">
                  About
                </Link>
              </li>

              <li>
                <Link to="/contact">
                  Contact
                </Link>
              </li>

            </ul>

          </div>


          {/* HELP */}
          <div className="col-6 col-md-6 col-lg-2">

            <h6 className="fw-bold mb-4">
              Help
            </h6>

            <ul className="list-unstyled">

                <li className="mb-3">
                  <Link to="/payment-options">
                    Payment Options
                  </Link>
                </li>

                <li className="mb-3">
                  <Link to="/returns">
                    Returns
                  </Link>
                </li>

                <li>
                  <Link to="/privacy-policies">
                    Privacy Policies
                  </Link>
                </li>

            </ul>

          </div>


          {/* NEWSLETTER */}
          <div className="col-12 col-md-6 col-lg-5">

            <h6 className="fw-bold mb-4">
              Newsletter
            </h6>

            <form
              className="d-flex gap-2"
              onSubmit={handleSubscribe}
            >

              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <button
                type="submit"
                className="btn btn-dark"
              >
                SUBSCRIBE
              </button>

            </form>

            {message && (
              <p className="mt-2 mb-0 text-success">
                {message}
              </p>
            )}


            {/* SOCIAL ICONS */}
            <div className="d-flex gap-3 mt-4">

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>

            </div>

          </div>

        </div>

        <hr />

        <div className="text-center py-3">

          <p className="mb-0 text-muted">
            © 2026 Furniro. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;