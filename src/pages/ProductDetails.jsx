import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import products from "../data/products";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("Purple");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedSize("L");
      setSelectedColor("Purple");
      setSelectedImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <section className="pd-not-found">
        <h2>Product Not Found</h2>

        <button onClick={() => navigate("/shop")}>
          Back to Shop
        </button>
      </section>
    );
  }

  const increaseQuantity = () => {
    setQuantity((previous) => previous + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((previous) =>
      Math.max(1, previous - 1)
    );
  };

  const handleAddToCart = () => {
    const selectedProduct = {
      ...product,
      selectedSize,
      selectedColor,
    };

    for (let i = 0; i < quantity; i++) {
      addToCart(selectedProduct);
    }

    alert(`${product.name} added to cart!`);
  };

  const handleCompare = () => {
    const savedComparison =
      JSON.parse(
        localStorage.getItem("furniroComparison")
      ) || [];

    const alreadyAdded = savedComparison.some(
      (item) => item.id === product.id
    );

    let updatedComparison = savedComparison;

    if (!alreadyAdded) {
      updatedComparison = [
        ...savedComparison,
        product,
      ];
    }

    updatedComparison = updatedComparison.slice(-3);

    localStorage.setItem(
      "furniroComparison",
      JSON.stringify(updatedComparison)
    );

    navigate("/comparison");
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (product.rating >= i) {
        stars.push(
          <FaStar
            key={i}
            className="pd-star"
          />
        );
      } else if (product.rating >= i - 0.5) {
        stars.push(
          <FaStarHalfAlt
            key={i}
            className="pd-star"
          />
        );
      } else {
        stars.push(
          <FaStar
            key={i}
            className="pd-empty-star"
          />
        );
      }
    }

    return stars;
  };

  const thumbnailImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <section className="pd-page">

      {/* BREADCRUMB */}

      <div className="pd-breadcrumb">

        <span onClick={() => navigate("/")}>
          Home
        </span>

        <span>›</span>

        <span onClick={() => navigate("/shop")}>
          Shop
        </span>

        <span>›</span>

        <span className="pd-breadcrumb-product">
          {product.name}
        </span>

      </div>

      {/* MAIN PRODUCT AREA */}

      <div className="pd-container">

        {/* LEFT SIDE */}

        <div className="pd-left">

          {/* THUMBNAILS */}

          <div className="pd-thumbnails">

            {thumbnailImages.map(
              (image, index) => (
                <button
                  key={index}
                  className={`pd-thumbnail ${
                    selectedImage === image
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedImage(image)
                  }
                >
                  <img
                    src={image}
                    alt={`${product.name} ${
                      index + 1
                    }`}
                  />
                </button>
              )
            )}

          </div>

          {/* MAIN IMAGE */}

          <div className="pd-main-image-wrapper">

            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="pd-main-image"
            />

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="pd-information">

          <h1 className="pd-product-name">
            {product.name}
          </h1>

          <div className="pd-price">
            {product.price}
          </div>

          {/* RATING */}

          <div className="pd-rating-row">

            <div className="pd-stars">
              {renderStars()}
            </div>

            <span className="pd-rating-number">
              {product.rating}
            </span>

            <span className="pd-review-divider">
              |
            </span>

            <span className="pd-reviews">
              {product.reviews} Customer Reviews
            </span>

          </div>

          {/* DESCRIPTION */}

          <p className="pd-description">
            {product.description}
          </p>

          {/* SIZE */}

          <div className="pd-option-group">

            <h4>Size</h4>

            <div className="pd-size-options">

              {["L", "XL", "XS"].map(
                (size) => (
                  <button
                    key={size}
                    className={`pd-size-button ${
                      selectedSize === size
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedSize(size)
                    }
                  >
                    {size}
                  </button>
                )
              )}

            </div>

          </div>

          {/* COLOR */}

          <div className="pd-option-group">

            <h4>Color</h4>

            <div className="pd-color-options">

              <button
                className={`pd-color-button pd-purple ${
                  selectedColor === "Purple"
                    ? "selected"
                    : ""
                }`}
                aria-label="Purple"
                title="Purple"
                onClick={() =>
                  setSelectedColor("Purple")
                }
              />

              <button
                className={`pd-color-button pd-black ${
                  selectedColor === "Black"
                    ? "selected"
                    : ""
                }`}
                aria-label="Black"
                title="Black"
                onClick={() =>
                  setSelectedColor("Black")
                }
              />

              <button
                className={`pd-color-button pd-gold ${
                  selectedColor === "Gold"
                    ? "selected"
                    : ""
                }`}
                aria-label="Gold"
                title="Gold"
                onClick={() =>
                  setSelectedColor("Gold")
                }
              />

            </div>

            <p className="pd-selected-color">
              Selected Color:{" "}
              <strong>{selectedColor}</strong>
            </p>

          </div>

          {/* ACTION BUTTONS */}

          <div className="pd-action-row">

            {/* QUANTITY */}

            <div className="pd-quantity">

              <button
                onClick={decreaseQuantity}
                aria-label="Decrease quantity"
              >
                <FiMinus />
              </button>

              <span>{quantity}</span>

              <button
                onClick={increaseQuantity}
                aria-label="Increase quantity"
              >
                <FiPlus />
              </button>

            </div>

            {/* ADD TO CART */}

            <button
              className="pd-add-cart"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>

            {/* COMPARE */}

            <button
              className="pd-compare"
              onClick={handleCompare}
            >
              + Compare
            </button>

          </div>

          {/* EXTRA INFORMATION */}

          <div className="pd-extra-info">

            <div>
              <span>SKU</span>
              <span>:</span>
              <strong>
                FURN-
                {String(product.id).padStart(
                  3,
                  "0"
                )}
              </strong>
            </div>

            <div>
              <span>Category</span>
              <span>:</span>
              <strong>
                {product.category}
              </strong>
            </div>

            <div>
              <span>Color</span>
              <span>:</span>
              <strong>
                {selectedColor}
              </strong>
            </div>

            <div>
              <span>Size</span>
              <span>:</span>
              <strong>
                {selectedSize}
              </strong>
            </div>

          </div>

        </div>
      </div>

      {/* BOTTOM DESCRIPTION */}

      <div className="pd-bottom-section">

        <div className="pd-tabs">

          <button className="active">
            Description
          </button>

          <button>
            Additional Information
          </button>

          <button>
            Reviews [{product.reviews}]
          </button>

        </div>

        <div className="pd-bottom-content">

          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <p>
            This product belongs to our{" "}
            <strong>
              {product.category}
            </strong>{" "}
            collection and is designed to
            complement modern interior spaces.
          </p>

          <div className="pd-selected-details">

            <div>
              <strong>Selected Color:</strong>{" "}
              {selectedColor}
            </div>

            <div>
              <strong>Selected Size:</strong>{" "}
              {selectedSize}
            </div>

            <div>
              <strong>Quantity:</strong>{" "}
              {quantity}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;