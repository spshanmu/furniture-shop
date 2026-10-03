function About() {
  return (
    <section className="about-section py-5">

      <div className="container">

        {/* Page heading */}

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            About Furniro
          </h1>

          <p className="text-muted mt-3">
            Discover our story, values and passion for beautiful
            furniture.
          </p>

        </div>

        {/* About content */}

        <div className="row align-items-center g-5">

          <div className="col-lg-6">

            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
              alt="Beautiful furniture interior"
              className="img-fluid about-image"
            />

          </div>

          <div className="col-lg-6">

            <h2 className="fw-bold mb-3">
              We Make Your Home Beautiful
            </h2>

            <p className="text-muted">
              Furniro is a modern furniture store focused on
              bringing stylish, comfortable and functional
              furniture into your home.
            </p>

            <p className="text-muted">
              From elegant chairs and comfortable sofas to
              beautiful bedroom furniture, our collection is
              designed to help you create a home that reflects
              your personality.
            </p>

            <p className="text-muted">
              We believe good furniture should combine
              attractive design, comfort and practicality.
            </p>

          </div>

        </div>

        {/* Values */}

        <div className="row g-4 mt-5">

          <div className="col-12 col-md-4">

            <div className="about-value text-center p-4">

              <h4 className="fw-bold">
                Quality
              </h4>

              <p className="text-muted mt-2 mb-0">
                We focus on furniture that is designed for
                comfort and everyday use.
              </p>

            </div>

          </div>

          <div className="col-12 col-md-4">

            <div className="about-value text-center p-4">

              <h4 className="fw-bold">
                Modern Design
              </h4>

              <p className="text-muted mt-2 mb-0">
                Our collection combines modern styles with
                practical functionality.
              </p>

            </div>

          </div>

          <div className="col-12 col-md-4">

            <div className="about-value text-center p-4">

              <h4 className="fw-bold">
                Customer First
              </h4>

              <p className="text-muted mt-2 mb-0">
                We aim to provide a simple and enjoyable
                shopping experience.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;