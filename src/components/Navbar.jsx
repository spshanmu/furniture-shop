import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX
} from "react-icons/fi";

function Navbar({ cartCount, wishlistCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchText.trim() !== "") {
      navigate(`/shop?search=${searchText}`);
      setSearchOpen(false);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3">
      <div className="container">

        <Link
          to="/"
          className="navbar-brand furniro-logo"
          onClick={closeMenu}
        >
          Furniro
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
        >
          {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

        <div
          className={`collapse navbar-collapse ${
            menuOpen ? "show" : ""
          }`}
        >

          <ul className="navbar-nav mx-auto navbar-links">

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/shop" ? "active" : ""
                }`}
                to="/shop"
                onClick={closeMenu}
              >
                Shop
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
                onClick={closeMenu}
              >
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
                to="/contact"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>

          </ul>

          <div className="navbar-icons">

            <Link
              to="/profile"
              className="icon-button"
            >
              <FiUser />
            </Link>

            {/* SEARCH */}
            <button
              className="icon-button"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FiSearch />
            </button>

            <Link
              to="/wishlist"
              className="icon-button position-relative"
            >
              <FiHeart />

              {wishlistCount > 0 && (
                <span className="cart-badge">
                  {wishlistCount}
                </span>
              )}
            </Link>

           <Link
  to="/cart"
  className="icon-button cart-icon"
>
  <FiShoppingCart />

  {cartCount > 0 && (
    <span className="cart-badge">
      {cartCount}
    </span>
  )}
</Link>

          </div>

        </div>
      </div>

      {/* SEARCH BOX */}

      {searchOpen && (
        <form
          onSubmit={handleSearch}
          className="search-box"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
          />

          <button type="submit">
            <FiSearch />
          </button>
        </form>
      )}

    </nav>
  );
}

export default Navbar;