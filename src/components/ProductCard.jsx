import {
  FiHeart,
  FiShare2,
  FiShoppingCart
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  wishlist,
  toggleWishlist
}) {
  const navigate = useNavigate();

  const liked = wishlist.some(
    (item) => item.id === product.id
  );

  const handleShare = async (e) => {
    e.stopPropagation();

    const shareData = {
      title: product.name,
      text: `Check out ${product.name} - ${product.description}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      alert(
        "Copy this page link to share: " +
          window.location.href
      );
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const openProductDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="product-card"
      onClick={openProductDetails}
    >

      {/* Product Image */}
      <div
        className="product-image-container"
        onClick={openProductDetails}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        {/* Discount Badge */}
        {product.discount && (
          <span className="product-badge discount-badge">
            {product.discount}
          </span>
        )}

        {/* New Badge */}
        {product.badge && (
          <span className="product-badge new-badge">
            {product.badge}
          </span>
        )}

        {/* Product Overlay */}
        <div className="product-overlay">

          {/* Add To Cart */}
          <button
            className="add-cart-button"
            onClick={handleAddToCart}
          >
            <FiShoppingCart />
            Add to cart
          </button>

          {/* Share and Like */}
          <div className="product-action-buttons">

            {/* Share */}
            <button
              onClick={handleShare}
            >
              <FiShare2 />
              <span>Share</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
            >
              <FiHeart
                fill={liked ? "currentColor" : "none"}
              />

              <span>
                {liked ? "Liked" : "Like"}
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="product-info">

        <h5
          onClick={openProductDetails}
          style={{ cursor: "pointer" }}
        >
          {product.name}
        </h5>

        <p>{product.description}</p>

        {/* Price */}
        <div className="price-container">
          <strong>{product.price}</strong>

          {product.oldPrice && (
            <del>{product.oldPrice}</del>
          )}
        </div>

        {/* Rating and Reviews */}
           <div className="product-rating mt-2">

  <span className="rating-stars">

    <span className="empty-stars">
      ★★★★★
    </span>

    <span
      className="filled-stars"
      style={{
        width: `${(Math.floor(product.rating) + (product.rating % 1 >= 0.5 ? 0.5 : 0)) * 20}%`
      }}
    >
      ★★★★★
    </span>

  </span>

  <span className="rating-value">
    {product.rating}
  </span>

  <span className="review-count">
    ({product.reviews} reviews)
  </span>

</div>

      </div>

    </div>
  );
}

export default ProductCard;