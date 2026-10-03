import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import products from "../data/products";

function Shop({
  addToCart,
  wishlist,
  toggleWishlist
}) {
  const [searchParams] = useSearchParams();

  const searchText =
    searchParams.get("search") || "";

  const urlCategory =
    searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] =
    useState(urlCategory);

  const [sortOption, setSortOption] =
    useState("default");

  const categories = [
    "All",
    "Dining",
    "Living",
    "Bedroom"
  ];

  // Filter products
let filteredProducts = products.filter(
  (product) => {

    const searchValue = searchText.toLowerCase();

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchValue) ||

      product.description
        .toLowerCase()
        .includes(searchValue) ||

      product.category
        .toLowerCase()
        .includes(searchValue);

    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  }
);

  // Sort products
  if (sortOption === "lowToHigh") {
    filteredProducts.sort(
      (a, b) =>
        Number(
          a.price.replace(/[^\d]/g, "")
        ) -
        Number(
          b.price.replace(/[^\d]/g, "")
        )
    );
  }

  if (sortOption === "highToLow") {
    filteredProducts.sort(
      (a, b) =>
        Number(
          b.price.replace(/[^\d]/g, "")
        ) -
        Number(
          a.price.replace(/[^\d]/g, "")
        )
    );
  }

  return (
    <section className="shop-section py-5">

      <div className="container">

        {/* Shop Heading */}
        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Shop
          </h1>

          <p className="text-muted mt-2">
            Explore our complete furniture collection.
          </p>

        </div>


        {/* FILTER SECTION */}
        <div className="shop-filter-panel mb-5">

          {/* Category Buttons */}
          <div className="category-buttons">

            <h6 className="fw-bold mb-3">
              Category
            </h6>

            <div className="d-flex flex-wrap gap-2">

              {categories.map((category) => {

                const categoryValue =
                  category === "All"
                    ? ""
                    : category;

                return (
                  <button
                    key={category}
                    type="button"
                    className={
                      selectedCategory === categoryValue
                        ? "btn btn-dark"
                        : "btn btn-outline-dark"
                    }
                    onClick={() =>
                      setSelectedCategory(categoryValue)
                    }
                  >
                    {category}
                  </button>
                );

              })}

            </div>

          </div>


          {/* Sort Dropdown */}
          <div className="sort-section">

            <label
              htmlFor="sortProducts"
              className="fw-bold d-block mb-2"
            >
              Sort by
            </label>

            <select
              id="sortProducts"
              className="form-select shop-sort-select"
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value)
              }
            >

              <option value="default">
                Default
              </option>

              <option value="lowToHigh">
                Price: Low to High
              </option>

              <option value="highToLow">
                Price: High to Low
              </option>

            </select>

          </div>

        </div>


        {/* Search Result */}
        {searchText && (
          <p className="text-muted mb-4">
            Search results for "{searchText}"
          </p>
        )}


        {/* Product Count */}
        <p className="text-muted mb-4">
          Showing {filteredProducts.length} products
        </p>


        {/* Products */}
        {filteredProducts.length > 0 ? (

          <div className="row g-4">

            {filteredProducts.map((product) => (

              <div
                className="col-12 col-sm-6 col-lg-3"
                key={product.id}
              >

                <ProductCard
                  product={product}
                  addToCart={addToCart}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />

              </div>

            ))}

          </div>

        ) : (

          <div className="text-center py-5">

            <h4>
              No products found
            </h4>

            <p className="text-muted">
              Try another category or search term.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}

export default Shop;