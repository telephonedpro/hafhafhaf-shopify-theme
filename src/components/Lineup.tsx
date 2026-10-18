import { Link } from "react-router-dom";
import { FEEDERS } from "@/data/feeders";
import { Reveal } from "./motion";

/** The four feeders as arch cards. */
export function LineupGrid() {
  return (
    <div className="pv-lineup">
      {FEEDERS.map((f, i) => (
        <Reveal key={f.slug} delay={i * 90} as="article" className="pv-card">
          <Link to={`/products/${f.slug}`} className={`pv-arch tone-${f.tone}`} aria-label={`${f.name}, $${f.price}`}>
            <img src={f.images.main} alt={f.fullTitle} className="pv-arch-img" loading="lazy" />
          </Link>
          <div className="pv-arch-caption">
            <small>{f.short}</small>
            <b>{f.name}</b>
            <span>
              {f.capacity} · <strong>${f.price}</strong>
            </span>
            <Link to={`/products/${f.slug}`} className="pv-link">
              View product <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
