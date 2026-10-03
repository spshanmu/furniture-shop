import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <h2>Product Not Found</h2>

          <button
            className="btn btn-warning mt-3"
            onClick={() => navigate("/shop")}
          >
            BACK TO SHOP
          </button>
        </div>
      </section>
    );
  }

  const visualRating =
    Math.floor(product.rating) +
    (product.rating % 1 >= 0.5 ? 0.5 : 0);

  return (
    <section className="py-5">
      <div className="container">

        <div className="row g-5">

          {/* Product Image */}

          <div className="col-12 col-md-6">

            <img
              src={product.image}
              alt={product.name}
              className="product-details-image"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x600?text=No+Image";
              }}
            />

          </div>


          {/* Product Information */}

          <div className="col-12 col-md-6">

            <h1 className="fw-bold">
              {product.name}
            </h1>


            {/* Rating */}

            <div className="product-details-rating mb-3">

              <span className="details-rating-stars">

                <span className="details-empty-stars">
                  ★★★★★
                </span>

                <span
                  className="details-filled-stars"
                  style={{
                    width: `${visualRating * 20}%`
                  }}
                >
                  ★★★★★
                </span>

              </span>

              <span className="ms-2 text-muted">
                {product.rating} / 5
              </span>

              <span className="ms-2 text-muted">
                ({product.reviews} reviews)
              </span>

            </div>


            {/* Price */}

            <h3 className="fw-bold mb-2">
              {product.price}
            </h3>


            {/* Old Price */}

            {product.oldPrice && (
              <p className="text-muted text-decoration-line-through mb-2">
                {product.oldPrice}
              </p>
            )}


            {/* Discount */}

            {product.discount && (
              <span className="badge bg-danger mb-3">
                {product.discount}
              </span>
            )}


            {/* Category */}

            <p className="mt-3">
              Category:{" "}
              <strong>{product.category}</strong>
            </p>


            {/* Short Description */}

            <p className="text-muted fs-5 mt-3">
              {product.description}
            </p>


            {/* Buttons */}

            <div className="mt-4">

              <button
                className="btn btn-dark px-4 py-3"
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}
              >
                ADD TO CART
              </button>

              <button
                className="btn btn-outline-secondary px-4 py-3 ms-2"
                onClick={() => navigate("/shop")}
              >
                CONTINUE SHOPPING
              </button>

            </div>

          </div>

        </div>


        {/* Detailed Description Section */}

        <div className="row mt-5">

          <div className="col-12">

            <hr />

            <h3 className="fw-bold mt-4">
              Product Description
            </h3>

            <p className="text-muted mt-3">
              {product.description}
            </p>

          </div>

        </div>


        {/* Product Details Section */}

        <div className="row mt-4">

          <div className="col-12 col-md-6">

            <h4 className="fw-bold">
              Product Details
            </h4>

            <ul className="list-group mt-3">

              <li className="list-group-item">
                <strong>Product:</strong> {product.name}
              </li>

              <li className="list-group-item">
                <strong>Category:</strong> {product.category}
              </li>

              <li className="list-group-item">
                <strong>Rating:</strong> {product.rating} / 5
              </li>

              <li className="list-group-item">
                <strong>Price:</strong> {product.price}
              </li>

            </ul>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ProductDetails;