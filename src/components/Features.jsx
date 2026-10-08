import {
  FaTrophy,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaTrophy />,
      title: "High Quality",
      text: "Crafted from top materials",
    },
    {
      icon: <FaShieldAlt />,
      title: "Warranty Protection",
      text: "Over 2 years",
    },
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      text: "Order over 150 $",
    },
    {
      icon: <FaHeadset />,
      title: "24 / 7 Support",
      text: "Dedicated support",
    },
  ];

  return (
    <section className="furniro-features">
      <div className="container">
        <div className="row g-0">
          {features.map((feature, index) => (
            <div className="col-lg-3 col-md-6 col-12" key={index}>
              <div className="furniro-feature-item">
                <div className="furniro-feature-icon">
                  {feature.icon}
                </div>

                <div>
                  <h5>{feature.title}</h5>
                  <p>{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;