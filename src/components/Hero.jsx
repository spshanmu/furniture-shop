import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row justify-content-end align-items-center min-vh-75">

          <div className="col-lg-6">
            <div className="hero-content p-4 p-md-5">

              <p className="small fw-semibold mb-2">
                New Arrival
              </p>

              <h1 className="display-4 fw-bold">
                Discover Our
                <br />
                New Collection
              </h1>

              <p className="mt-3">
                Discover our beautiful collection of furniture
                designed to make your home comfortable and stylish.
              </p>

              <button className="btn btn-warning px-4 py-3 mt-3 fw-bold" 
                onClick={() => navigate("/shop")}>
                BUY NOW
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;