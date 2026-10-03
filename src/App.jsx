import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import PaymentOptions from "./pages/PaymentOptions";
import Returns from "./pages/Returns";
import PrivacyPolicies from "./pages/PrivacyPolicies";
import OrderHistory from "./pages/OrderHistory";
import ProductDetails from "./pages/ProductDetails";
import OrderDetails from "./pages/OrderDetails";

function App() {

  // ---------------- CART ----------------

  const [cart, setCart] = useState(() => {
    const savedCart =
      localStorage.getItem("furniroCart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });


  // ---------------- WISHLIST ----------------

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist =
      localStorage.getItem("furniroWishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });


  // ---------------- ORDERS ----------------

  const [orders, setOrders] = useState(() => {
    const savedOrders =
      localStorage.getItem("furniroOrders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  });


  // ---------------- SAVE CART ----------------

  useEffect(() => {
    localStorage.setItem(
      "furniroCart",
      JSON.stringify(cart)
    );
  }, [cart]);


  // ---------------- SAVE WISHLIST ----------------

  useEffect(() => {
    localStorage.setItem(
      "furniroWishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);


  // ---------------- SAVE ORDERS ----------------

  useEffect(() => {
    localStorage.setItem(
      "furniroOrders",
      JSON.stringify(orders)
    );
  }, [orders]);


  // ---------------- CART COUNT ----------------

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  // ---------------- ADD TO CART ----------------

  const addToCart = (product) => {

    setCart((prev) => {

      const existingProduct = prev.find(
        (item) =>
          item.id === product.id
      );

      if (existingProduct) {

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1
        }
      ];
    });
  };


  // ---------------- DECREASE QUANTITY ----------------

  const decreaseQuantity = (productId) => {

    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  item.quantity - 1
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };


  // ---------------- REMOVE FROM CART ----------------

  const removeFromCart = (productId) => {

    setCart((prev) =>
      prev.filter(
        (item) =>
          item.id !== productId
      )
    );
  };


  // ---------------- CLEAR CART ----------------

  const clearCart = () => {
    setCart([]);
  };


  // ---------------- WISHLIST ----------------

  const toggleWishlist = (product) => {

    setWishlist((prev) => {

      const alreadyLiked =
        prev.some(
          (item) =>
            item.id === product.id
        );

      if (alreadyLiked) {

        return prev.filter(
          (item) =>
            item.id !== product.id
        );
      }

      return [
        ...prev,
        product
      ];
    });
  };


  // ---------------- ADD ORDER ----------------

  const addOrder = (order) => {

    setOrders((prev) => [
      order,
      ...prev
    ]);
  };


  return (

    <BrowserRouter>

      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
      />

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={
                toggleWishlist
              }
            />
          }
        />


        {/* SHOP */}

        <Route
          path="/shop"
          element={
            <Shop
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={
                toggleWishlist
              }
            />
          }
        />


        {/* PRODUCT DETAILS */}

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
            />
          }
        />


        {/* WISHLIST */}

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              addToCart={addToCart}
              toggleWishlist={
                toggleWishlist
              }
            />
          }
        />


        {/* ABOUT */}

        <Route
          path="/about"
          element={<About />}
        />


        {/* CONTACT */}

        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* CART */}

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              addToCart={addToCart}
              decreaseQuantity={
                decreaseQuantity
              }
              removeFromCart={
                removeFromCart
              }
              clearCart={
                clearCart
              }
            />
          }
        />


        {/* CHECKOUT */}

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              clearCart={clearCart}
              addOrder={addOrder}
            />
          }
        />


        {/* PROFILE */}

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* ORDER HISTORY */}

        <Route
          path="/orders"
          element={
            <OrderHistory
              orders={orders}
            />
          }
        />


        {/* PAYMENT OPTIONS */}

        <Route
          path="/payment-options"
          element={
            <PaymentOptions />
          }
        />


        {/* RETURNS */}

        <Route
          path="/returns"
          element={
            <Returns />
          }
        />


        {/* PRIVACY POLICIES */}

        <Route
          path="/privacy-policies"
          element={
            <PrivacyPolicies />
          }
        />


        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />

        <Route
          path="/orders/:id"
          element={
            <OrderDetails
              orders={orders}
            />
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;