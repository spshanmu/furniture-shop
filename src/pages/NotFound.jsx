import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="not-found-section py-5">
      <div className="container text-center py-5">

        <h1 className="not-found-number">
          404
        </h1>

        <h2 className="fw-bold">
          Page Not Found
        </h2>

        <p className="text-muted mt-3">
          Sorry, the page you are looking for
          does not exist.
        </p>

        <button
          className="btn btn-warning px-4 py-3 mt-3 fw-bold"
          onClick={() => navigate("/")}
        >
          GO TO HOME
        </button>

      </div>
    </section>
  );
}

export default NotFound;