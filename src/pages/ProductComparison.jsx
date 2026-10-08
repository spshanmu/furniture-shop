import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import products from "../data/products";

function ProductComparison({ addToCart }) {
  const navigate = useNavigate();

  // Read comparison products immediately when page loads
  const [comparisonProducts, setComparisonProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("furniroComparison");

      if (!saved) {
        return [];
      }

      const parsed = JSON.parse(saved);

      // Make sure it is an array
      if (Array.isArray(parsed)) {
        return parsed;
      }

      return [];
    } catch (error) {
      console.error(
        "Error reading comparison products:",
        error
      );

      return [];
    }
  });

  const [showProducts, setShowProducts] = useState(false);

  /* =====================================================
     SAVE COMPARISON PRODUCTS
  ===================================================== */

  const saveComparison = (updatedProducts) => {
    setComparisonProducts(updatedProducts);

    localStorage.setItem(
      "furniroComparison",
      JSON.stringify(updatedProducts)
    );
  };

  /* =====================================================
     ADD PRODUCT
  ===================================================== */

  const addProduct = (product) => {
    const alreadyExists = comparisonProducts.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      setShowProducts(false);
      return;
    }

    if (comparisonProducts.length >= 3) {
      alert("You can compare maximum 3 products.");
      return;
    }

    const updatedProducts = [
      ...comparisonProducts,
      product,
    ];

    saveComparison(updatedProducts);

    setShowProducts(false);
  };

  /* =====================================================
     REMOVE PRODUCT
  ===================================================== */

  const removeProduct = (productId) => {
    const updatedProducts =
      comparisonProducts.filter(
        (product) => product.id !== productId
      );

    saveComparison(updatedProducts);
  };

  /* =====================================================
     VIEW PRODUCT
  ===================================================== */

  const viewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const handleAddToCart = (product) => {
    addToCart(product);

    alert(
      `${product.name} added to cart!`
    );
  };

  /* =====================================================
     STARS
  ===================================================== */

  const renderStars = (rating) => {
    return Array.from(
      { length: 5 },
      (_, index) => {

        const number = index + 1;

        if (number <= Math.floor(rating)) {
          return (
            <span key={index}>
              ★
            </span>
          );
        }

        if (number - 0.5 <= rating) {
          return (
            <span key={index}>
              ★
            </span>
          );
        }

        return (
          <span
            key={index}
            className="comparison-empty-star"
          >
            ★
          </span>
        );
      }
    );
  };

  return (
    <div className="comparison-page">

      {/* =================================================
          CSS
      ================================================= */}

      <style>
        {`

        .comparison-page {
          width: 100%;
          background: #ffffff;
          min-height: 100vh;
          color: #333;
        }

        /* BANNER */

        .comparison-banner {
          width: 100%;
          height: 300px;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.35),
              rgba(255,255,255,0.35)
            ),
            url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6");

          background-size: cover;
          background-position: center;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .comparison-banner-content {
          text-align: center;
        }

        .comparison-banner h1 {
          margin: 0 0 15px;
          font-size: 42px;
          font-weight: 600;
          color: #333;
        }

        .comparison-breadcrumb {
          font-size: 15px;
          color: #555;
        }

        .comparison-breadcrumb a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
        }

        .comparison-breadcrumb span {
          margin: 0 8px;
        }

        /* MAIN */

        .comparison-content {
          max-width: 1250px;
          margin: 0 auto;
          padding: 65px 25px 90px;
        }

        .comparison-heading {
          text-align: center;
          margin-bottom: 50px;
        }

        .comparison-heading h2 {
          margin: 0 0 12px;
          font-size: 32px;
          font-weight: 600;
        }

        .comparison-heading p {
          margin: 0;
          color: #777;
          font-size: 16px;
        }

        /* EMPTY */

        .comparison-empty {
          text-align: center;
          padding: 70px 20px;
        }

        .comparison-empty h3 {
          font-size: 28px;
          margin-bottom: 15px;
        }

        .comparison-empty p {
          color: #777;
          margin-bottom: 25px;
        }

        .comparison-shop-button {
          display: inline-block;
          padding: 14px 30px;
          background: #b88e2f;
          color: white;
          text-decoration: none;
          font-weight: 600;
        }

        /* PRODUCTS */

        .comparison-scroll {
          width: 100%;
          overflow-x: auto;
        }

        .comparison-products {
          min-width: 950px;

          display: grid;

          grid-template-columns:
            210px
            repeat(3, 1fr);

          border-top: 1px solid #ddd;
          border-left: 1px solid #ddd;
        }

        .comparison-label {
          min-height: 400px;

          padding: 25px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;

          background: #fafafa;
        }

        .comparison-label h3 {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }

        .comparison-column {
          min-height: 400px;

          position: relative;

          padding: 25px;

          text-align: center;

          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
        }

        .comparison-image {
          width: 100%;
          height: 210px;

          object-fit: cover;

          margin-bottom: 18px;

          background: #f5f5f5;
        }

        .comparison-column h3 {
          margin: 0 0 8px;

          font-size: 20px;
          font-weight: 600;
        }

        .comparison-price {
          font-weight: 600;
          margin-bottom: 10px;
        }

        .comparison-rating {
          color: #b88e2f;
          margin-bottom: 18px;
        }

        .comparison-rating-number {
          color: #777;
          margin-left: 8px;
          font-size: 14px;
        }

        .comparison-empty-star {
          color: #ddd;
        }

        /* REMOVE */

        .comparison-remove {
          position: absolute;

          top: 12px;
          right: 12px;

          width: 30px;
          height: 30px;

          border: none;
          border-radius: 50%;

          background: #eee;
          color: #666;

          font-size: 20px;

          cursor: pointer;

          z-index: 5;
        }

        .comparison-remove:hover {
          background: #b88e2f;
          color: white;
        }

        /* BUTTONS */

        .comparison-buttons {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .comparison-view-button,
        .comparison-cart-button {
          border: none;
          padding: 10px 15px;
          cursor: pointer;
          font-weight: 600;
        }

        .comparison-view-button {
          background: #f9f1e7;
          color: #333;
        }

        .comparison-cart-button {
          background: #b88e2f;
          color: white;
        }

        /* ADD PRODUCT */

        .add-product-column {
          min-height: 400px;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          padding: 25px;

          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
        }

        .add-product-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 18px;
        }

        .add-product-button {
          border: none;
          background: #b88e2f;
          color: white;

          padding: 12px 22px;

          cursor: pointer;
          font-weight: 600;
        }

        .product-list {
          width: 100%;
          max-height: 230px;

          overflow-y: auto;

          margin-top: 15px;

          border: 1px solid #ddd;
          background: white;
        }

        .product-list-item {
          width: 100%;

          display: flex;
          align-items: center;

          gap: 10px;

          padding: 10px;

          border: none;
          border-bottom: 1px solid #eee;

          background: white;

          cursor: pointer;
          text-align: left;
        }

        .product-list-item:hover {
          background: #f9f1e7;
        }

        .product-list-item img {
          width: 45px;
          height: 45px;
          object-fit: cover;
        }

        /* TABLE */

        .comparison-table-wrapper {
          width: 100%;
          overflow-x: auto;
          margin-top: 45px;
        }

        .comparison-table {
          width: 100%;
          min-width: 950px;

          border-collapse: collapse;
        }

        .comparison-table th,
        .comparison-table td {
          border: 1px solid #ddd;
          padding: 20px;
          text-align: left;
        }

        .comparison-table th {
          width: 210px;
          background: #fafafa;
          font-weight: 600;
        }

        .comparison-table td {
          color: #666;
          vertical-align: top;
        }

        .comparison-section-row td {
          background: #f9f1e7;
          color: #333;
          font-size: 18px;
          font-weight: 600;
        }

        @media (max-width: 768px) {

          .comparison-banner {
            height: 230px;
          }

          .comparison-banner h1 {
            font-size: 32px;
          }

          .comparison-content {
            padding: 45px 15px 60px;
          }

        }

        `}
      </style>

      {/* =================================================
          BANNER
      ================================================= */}

      <section className="comparison-banner">

        <div className="comparison-banner-content">

          <h1>
            Product Comparison
          </h1>

          <div className="comparison-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>›</span>

            <span>
              Product Comparison
            </span>

          </div>

        </div>

      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <main className="comparison-content">

        <div className="comparison-heading">

          <h2>
            Compare Products
          </h2>

          <p>
            Compare your favourite furniture products
            and choose the one that suits you best.
          </p>

        </div>

        {/* =================================================
            PRODUCTS
        ================================================= */}

        {comparisonProducts.length === 0 ? (

          <div className="comparison-empty">

            <h3>
              No Products Selected
            </h3>

            <p>
              Add products from the product details
              page to compare them here.
            </p>

            <Link
              to="/shop"
              className="comparison-shop-button"
            >
              Go to Shop
            </Link>

          </div>

        ) : (

          <>

            <div className="comparison-scroll">

              <div className="comparison-products">

                {/* LABEL */}

                <div className="comparison-label">

                  <h3>
                    Product
                  </h3>

                </div>

                {/* SELECTED PRODUCTS */}

                {comparisonProducts.map(
                  (product) => (

                    <div
                      className="comparison-column"
                      key={product.id}
                    >

                      <button
                        className="comparison-remove"
                        onClick={() =>
                          removeProduct(
                            product.id
                          )
                        }
                      >
                        ×
                      </button>

                      <img
                        src={product.image}
                        alt={product.name}
                        className="comparison-image"
                      />

                      <h3>
                        {product.name}
                      </h3>

                      <div className="comparison-price">
                        {product.price}
                      </div>

                      <div className="comparison-rating">

                        {renderStars(
                          product.rating
                        )}

                        <span className="comparison-rating-number">
                          {product.rating}
                        </span>

                      </div>

                      <div className="comparison-buttons">

                        <button
                          className="comparison-view-button"
                          onClick={() =>
                            viewProduct(
                              product.id
                            )
                          }
                        >
                          View Product
                        </button>

                        <button
                          className="comparison-cart-button"
                          onClick={() =>
                            handleAddToCart(
                              product
                            )
                          }
                        >
                          Add to Cart
                        </button>

                      </div>

                    </div>

                  )
                )}

                {/* ADD PRODUCT */}

                {comparisonProducts.length < 3 && (

                  <div className="add-product-column">

                    <div className="add-product-title">
                      Add A Product
                    </div>

                    <button
                      className="add-product-button"
                      onClick={() =>
                        setShowProducts(
                          !showProducts
                        )
                      }
                    >
                      + Add Product
                    </button>

                    {showProducts && (

                      <div className="product-list">

                        {products
                          .filter(
                            (product) =>
                              !comparisonProducts.some(
                                (selected) =>
                                  selected.id ===
                                  product.id
                              )
                          )
                          .map(
                            (product) => (

                              <button
                                key={product.id}
                                className="product-list-item"
                                onClick={() =>
                                  addProduct(
                                    product
                                  )
                                }
                              >

                                <img
                                  src={product.image}
                                  alt={product.name}
                                />

                                <span>
                                  {product.name}
                                </span>

                              </button>

                            )
                          )}

                      </div>

                    )}

                  </div>

                )}

              </div>

            </div>

            {/* =================================================
                DETAILS TABLE
            ================================================= */}

            <div className="comparison-table-wrapper">

              <table className="comparison-table">

                <tbody>

                  {/* GENERAL */}

                  <tr className="comparison-section-row">

                    <td colSpan="4">
                      General
                    </td>

                  </tr>

                  <tr>

                    <th>
                      Product Name
                    </th>

                    {comparisonProducts.map(
                      (product) => (
                        <td key={product.id}>
                          {product.name}
                        </td>
                      )
                    )}

                  </tr>

                  <tr>

                    <th>
                      Category
                    </th>

                    {comparisonProducts.map(
                      (product) => (
                        <td key={product.id}>
                          {product.category}
                        </td>
                      )
                    )}

                  </tr>

                  <tr>

                    <th>
                      Rating
                    </th>

                    {comparisonProducts.map(
                      (product) => (
                        <td key={product.id}>
                          ★ {product.rating}
                        </td>
                      )
                    )}

                  </tr>

                  <tr>

                    <th>
                      Reviews
                    </th>

                    {comparisonProducts.map(
                      (product) => (
                        <td key={product.id}>
                          {product.reviews}
                        </td>
                      )
                    )}

                  </tr>

                  {/* PRODUCT */}

                  <tr className="comparison-section-row">

                    <td colSpan="4">
                      Product
                    </td>

                  </tr>

                  <tr>

                    <th>
                      Price
                    </th>

                    {comparisonProducts.map(
                      (product) => (
                        <td key={product.id}>
                          {product.price}
                        </td>
                      )
                    )}

                  </tr>

                  <tr>

                    <th>
                      Description
                    </th>

                    {comparisonProducts.map(
                      (product) => (
                        <td key={product.id}>
                          {product.description}
                        </td>
                      )
                    )}

                  </tr>

                  {/* DIMENSIONS */}

                  <tr className="comparison-section-row">

                    <td colSpan="4">
                      Dimensions
                    </td>

                  </tr>

                  <tr>

                    <th>
                      Product Dimensions
                    </th>

                    {comparisonProducts.map(
                      (product) => (
                        <td key={product.id}>
                          Not specified
                        </td>
                      )
                    )}

                  </tr>

                  {/* WARRANTY */}

                  <tr className="comparison-section-row">

                    <td colSpan="4">
                      Warranty
                    </td>

                  </tr>

                  <tr>

                    <th>
                      Warranty
                    </th>

                    {comparisonProducts.map(
                      (product) => (
                        <td key={product.id}>
                          Not specified
                        </td>
                      )
                    )}

                  </tr>

                </tbody>

              </table>

            </div>

          </>

        )}

      </main>

    </div>
  );
}

export default ProductComparison;