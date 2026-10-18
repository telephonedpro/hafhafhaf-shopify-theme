import { Link } from "react-router-dom";
import { Magnetic, Marquee, Reveal } from "./motion";

/** The closing band: a giant ticker and one clear call to action. */
export default function Closing({ title = "Found your fit?", cta = "Find your feeder", to = "/compare", href }: { title?: string; cta?: string; to?: string; href?: string }) {
  return (
    <section className="pv-closing">
      <Marquee
        className="pv-closing-marquee"
        speed={28}
        items={Array.from({ length: 4 }, () => (
          <>
            Good food. <em>Good mood.</em> <i>●</i>
          </>
        ))}
      />
      <Reveal className="pv-closing-inner">
        <p className="pv-eyebrow">Make mealtime yours</p>
        <h2>{title}</h2>
        <Magnetic>
          {href ? (
            <a href={href} className="pv-btn pv-btn-blue pv-btn-lg">
              {cta} <span aria-hidden="true">→</span>
            </a>
          ) : (
            <Link to={to} className="pv-btn pv-btn-blue pv-btn-lg">
              {cta} <span aria-hidden="true">→</span>
            </Link>
          )}
        </Magnetic>
      </Reveal>
    </section>
  );
}
