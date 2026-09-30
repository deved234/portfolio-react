import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="page-heading not-found section-shell">
      <p className="eyebrow">404 / Page not found</p>
      <h1>
        This page took
        <br />a different turn.
      </h1>
      <Link to="/" className="pill selected">
        Back to home ↗
      </Link>
    </section>
  );
}
