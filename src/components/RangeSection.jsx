const categories = [
  {
    id: 1,
    name: "Dining",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200"
  },
  {
    id: 2,
    name: "Living",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
  },
  {
    id: 3,
    name: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"
  }
];

function RangeSection() {
  return (
    <section className="range-section py-5">

      <div className="container">

        <div className="range-heading text-center mb-4">

          <h2>
            Browse The Range
          </h2>

          <p>
            Explore our furniture collection
          </p>

        </div>

        <div className="row g-4">

          {categories.map((category) => (
            <div
              className="col-12 col-md-4"
              key={category.id}
            >
              <div className="range-card">

                <div className="range-image-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                  />
                </div>

                <h5>
                  {category.name}
                </h5>

              </div>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default RangeSection;