import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Shop({
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const [searchParams] = useSearchParams();

  const searchQuery =
    searchParams.get("search") || "";

  const categoryQuery =
    searchParams.get("category") || "All";

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedCategory, setSelectedCategory] =
    useState(categoryQuery);

  const [sortBy, setSortBy] =
    useState("default");

  const productsPerPage = 4;

  /* =========================================
     CATEGORIES
  ========================================= */

  const categories = [
    "All",
    "Dining",
    "Living",
    "Bedroom",
  ];

  /* =========================================
     FILTER + SEARCH PRODUCTS
  ========================================= */

  let filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  /* =========================================
     SORT PRODUCTS
  ========================================= */

  if (sortBy === "price-low") {
    filteredProducts = [
      ...filteredProducts,
    ].sort((a, b) => {
      const priceA = Number(
        a.price.replace(/[^\d]/g, "")
      );

      const priceB = Number(
        b.price.replace(/[^\d]/g, "")
      );

      return priceA - priceB;
    });
  }

  if (sortBy === "price-high") {
    filteredProducts = [
      ...filteredProducts,
    ].sort((a, b) => {
      const priceA = Number(
        a.price.replace(/[^\d]/g, "")
      );

      const priceB = Number(
        b.price.replace(/[^\d]/g, "")
      );

      return priceB - priceA;
    });
  }

  if (sortBy === "rating-high") {
    filteredProducts = [
      ...filteredProducts,
    ].sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sortBy === "name") {
    filteredProducts = [
      ...filteredProducts,
    ].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  /* =========================================
     RESET PAGE WHEN FILTER / SEARCH / SORT
     CHANGES
  ========================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    sortBy,
  ]);

  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages = Math.ceil(
    filteredProducts.length /
      productsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      endIndex
    );

  /* =========================================
     PAGE CHANGE
  ========================================= */

  const goToPage = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  /* =========================================
     CATEGORY CHANGE
  ========================================= */

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="shop-page">

      {/* =====================================
          SHOP CONTENT
      ===================================== */}

      <section className="shop-products-section">

        <div className="container">

          {/* =================================
              SEARCH RESULT
          ================================= */}

          {searchQuery && (
            <div className="shop-search-result">

              <h2>
                Search Results for "
                {searchQuery}"
              </h2>

              <p>
                {filteredProducts.length}{" "}
                product
                {filteredProducts.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>

            </div>
          )}

          {/* =================================
              FILTER + SORT
          ================================= */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px",
              marginBottom: "30px",
              padding: "20px",
              backgroundColor:
                "#f9f1e7",
            }}
          >

            {/* CATEGORY FILTER */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >

              <strong>
                Filter:
              </strong>

              {categories.map(
                (category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      handleCategoryChange(
                        category
                      )
                    }
                    style={{
                      border: "none",
                      padding:
                        "9px 16px",
                      backgroundColor:
                        selectedCategory ===
                        category
                          ? "#b88e2f"
                          : "#ffffff",
                      color:
                        selectedCategory ===
                        category
                          ? "#ffffff"
                          : "#333333",
                      cursor:
                        "pointer",
                      borderRadius:
                        "4px",
                    }}
                  >
                    {category}
                  </button>
                )
              )}

            </div>

            {/* SORT */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >

              <strong>
                Sort By:
              </strong>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value
                  )
                }
                style={{
                  padding:
                    "9px 14px",
                  border:
                    "1px solid #ddd",
                  backgroundColor:
                    "#ffffff",
                  cursor:
                    "pointer",
                  outline:
                    "none",
                }}
              >

                <option value="default">
                  Default
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="rating-high">
                  Rating: High to Low
                </option>

                <option value="name">
                  Name: A to Z
                </option>

              </select>

            </div>

          </div>

          {/* =================================
              PRODUCT COUNT
          ================================= */}

          <div
            style={{
              marginBottom: "20px",
              color: "#777",
            }}
          >
            Showing{" "}
            {filteredProducts.length === 0
              ? 0
              : startIndex + 1}
            -
            {Math.min(
              endIndex,
              filteredProducts.length
            )}{" "}
            of{" "}
            {filteredProducts.length}{" "}
            products
          </div>

          {/* =================================
              PRODUCTS
          ================================= */}

          {currentProducts.length > 0 ? (

            <div className="row g-4">

              {currentProducts.map(
                (product) => (

                  <div
                    className="col-12 col-sm-6 col-lg-3"
                    key={product.id}
                  >

                    <ProductCard
                      product={product}
                      addToCart={addToCart}
                      wishlist={wishlist}
                      toggleWishlist={
                        toggleWishlist
                      }
                    />

                  </div>

                )
              )}

            </div>

          ) : (

            /* =================================
               NO PRODUCTS
            ================================= */

            <div className="shop-no-products">

              <h2>
                No products found
              </h2>

              <p>
                Try changing your filter,
                search, or sort option.
              </p>

            </div>

          )}

          {/* =================================
              PAGINATION
          ================================= */}

          {totalPages > 1 && (

            <div className="shop-pagination">

              {/* PREVIOUS */}

              <button
                className={
                  currentPage === 1
                    ? "pagination-button disabled"
                    : "pagination-button"
                }
                disabled={
                  currentPage === 1
                }
                onClick={
                  goToPreviousPage
                }
              >
                Prev
              </button>

              {/* PAGE NUMBERS */}

              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => {

                  const page =
                    index + 1;

                  return (
                    <button
                      key={page}
                      className={
                        currentPage ===
                        page
                          ? "pagination-button active"
                          : "pagination-button"
                      }
                      onClick={() =>
                        goToPage(page)
                      }
                    >
                      {page}
                    </button>
                  );

                }
              )}

              {/* NEXT */}

              <button
                className={
                  currentPage ===
                  totalPages
                    ? "pagination-button disabled"
                    : "pagination-button"
                }
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={
                  goToNextPage
                }
              >
                Next
              </button>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}

export default Shop;