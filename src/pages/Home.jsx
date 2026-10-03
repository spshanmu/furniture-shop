import Hero from "../components/Hero";
import RangeSection from "../components/RangeSection";
import ProductSection from "../components/ProductSection";
import InspirationSection from "../components/InspirationSection";

function Home({ addToCart,  wishlist, toggleWishlist }) {
  return (
    <>
      <Hero />
      <RangeSection />
      <ProductSection addToCart={addToCart}  wishlist={wishlist} toggleWishlist={toggleWishlist}/>
      <InspirationSection />
    </>
  );
}

export default Home;