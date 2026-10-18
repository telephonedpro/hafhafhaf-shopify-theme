import { useState } from "react";
import { Link } from "react-router-dom";
import { FEEDERS } from "@/data/feeders";
import { Reveal } from "./motion";

const ROWS: { label: string; get: (f: (typeof FEEDERS)[number]) => string }[] = [
  { label: "Capacity", get: (f) => f.capacity },
  { label: "Camera", get: (f) => f.camera },
  { label: "App scheduling", get: () => "Yes" },
  { label: "Food storage", get: (f) => f.storage },
  { label: "Best suited for", get: (f) => f.bestFor },
];

/** Side-by-side comparison of all four feeders; the hovered column lights up. */
export default function CompareTable({ current }: { current?: string }) {
  const [hot, setHot] = useState<string | undefined>(current);
  return (
    <Reveal className="pv-compare">
      <div className="pv-compare-scroll" role="region" aria-label="Parveja feeder comparison" tabIndex={0}>
        <table onMouseLeave={() => setHot(current)}>
          <caption className="pv-sr">Parveja feeder comparison</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              {FEEDERS.map((f) => (
                <th key={f.slug} scope="col" className={`tone-${f.tone} ${hot === f.slug ? "is-hot" : ""}`} onMouseEnter={() => setHot(f.slug)}>
                  <img src={f.images.main} alt="" loading="lazy" />
                  <b>{f.name}</b>
                  <small>${f.price}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                {FEEDERS.map((f) => (
                  <td key={f.slug} className={hot === f.slug ? "is-hot" : ""} onMouseEnter={() => setHot(f.slug)}>
                    {r.get(f) === "Yes" ? <span className="pv-yes">✓ Yes</span> : r.get(f)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" />
              {FEEDERS.map((f) => (
                <td key={f.slug} className={hot === f.slug ? "is-hot" : ""} onMouseEnter={() => setHot(f.slug)}>
                  <Link to={`/products/${f.slug}`} className="pv-link">
                    View {f.name} <span aria-hidden="true">→</span>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="pv-compare-hint">Swipe the table to compare all four models.</p>
    </Reveal>
  );
}
