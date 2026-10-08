import { Link } from "react-router-dom";

function RoomInspiration() {
  return (
    <section className="room-inspiration">
      <div className="container">
        <div className="row align-items-center g-4">

          {/* LEFT CONTENT */}
          <div className="col-lg-4">
            <div className="room-inspiration-content">
              <h2>50+ Beautiful rooms inspiration</h2>

              <p>
                Our designer already created a lot of beautiful room
                inspiration for your home.
              </p>

              <Link
                to="/shop"
                className="room-explore-btn"
              >
                Explore More
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE GALLERY */}
          <div className="col-lg-8">
            <div className="room-gallery">

              {/* Main image */}
              <div className="room-main">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
                  alt="Beautiful living room"
                />

                <div className="room-caption">
                  <span>01 — Bed Room</span>
                  <h3>Inner Peace</h3>
                </div>
              </div>

              {/* Side images */}
              <div className="room-side">

                <div className="room-side-image">
                  <img
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
                    alt="Beautiful interior"
                  />
                </div>

                <div className="room-side-image">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
                    alt="Beautiful room"
                  />
                </div>

                <button
                  className="room-next-btn"
                  aria-label="Next room"
                >
                  →
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default RoomInspiration;