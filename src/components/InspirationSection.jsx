import { useNavigate } from "react-router-dom";

function InspirationSection() {
  const navigate = useNavigate();
  return (
    <section className="inspiration-section py-5">

      <div className="container">

        <div className="row align-items-center g-5">

          {/* Left Content */}
          <div className="col-lg-5">

            <h2 className="fw-bold display-6">
              50+ Beautiful Rooms
              <br />
              Inspiration
            </h2>

            <p className="text-muted mt-3">
              Our designer already created a lot of beautiful
              prototypes of rooms that inspire you.
            </p>

            <button
              className="btn btn-warning px-4 py-3 mt-3 fw-bold"
              onClick={() => navigate("/shop")}
            >
              Explore More
            </button>

          </div>

          {/* Right Images */}
          <div className="col-lg-7">

            <div className="row g-3">

              <div className="col-12 col-md-7">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
                  alt="Modern living room"
                  className="img-fluid inspiration-main-image"
                />
              </div>

              <div className="col-12 col-md-5">

                <img
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
                  alt="Beautiful interior"
                  className="img-fluid inspiration-small-image mb-3"
                />

                <img
                  src="https://images.unsplash.com/photo-1618220179428-22790b461013"
                  alt="Modern furniture"
                  className="img-fluid inspiration-small-image"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default InspirationSection;