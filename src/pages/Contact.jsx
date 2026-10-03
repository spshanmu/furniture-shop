import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <section className="contact-section py-5">

      <div className="container">

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            Contact Us
          </h1>

          <p className="text-muted mt-3">
            Have a question? We'd love to hear from you.
          </p>

        </div>

        <div className="row justify-content-center">

          <div className="col-12 col-lg-8">

            <div className="contact-form-wrapper p-4 p-md-5">

              {submitted && (
                <div className="alert alert-success">
                  Thank you! Your message has been
                  submitted successfully.
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Enter subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label">
                    Message
                  </label>

                  <textarea
                    name="message"
                    className="form-control"
                    rows="6"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>

                </div>

                <button
                  type="submit"
                  className="btn btn-warning px-5 py-3 fw-bold"
                >
                  SEND MESSAGE
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;