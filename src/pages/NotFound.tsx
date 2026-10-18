import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { BlurWords } from "@/components/motion";

export default function NotFound() {
  return (
    <section className="pv-404">
      <Seo title="Page not found | Parveja" description="This page could not be found." />
      <p className="pv-404-num">404</p>
      <h1>
        <BlurWords text="This bowl is empty." />
      </h1>
      <p className="pv-muted">The page you’re looking for isn’t here.</p>
      <Link to="/" className="pv-btn pv-btn-blue">
        Back to Parveja <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
