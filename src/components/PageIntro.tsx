import type { ReactNode } from "react";
import { BlurWords, Reveal } from "./motion";

/** The opening block of an inner page: eyebrow, two-line headline, text. */
export default function PageIntro({ eyebrow, lines, children, aside, tone = "butter" }: { eyebrow: string; lines: [string, string]; children?: ReactNode; aside?: ReactNode; tone?: string }) {
  return (
    <section className={`pv-intro tone-wash-${tone}`}>
      <div className="pv-blobs" aria-hidden="true">
        <span className="b1" />
        <span className="b2" />
      </div>
      <div className="pv-intro-copy">
        <Reveal>
          <p className="pv-eyebrow">{eyebrow}</p>
        </Reveal>
        <h1>
          <BlurWords text={lines[0]} delay={80} />
          <br />
          <BlurWords text={lines[1]} delay={260} className="pv-accent" />
        </h1>
        {children && (
          <Reveal delay={360} className="pv-intro-body">
            {children}
          </Reveal>
        )}
      </div>
      {aside && (
        <Reveal delay={250} className="pv-intro-aside">
          {aside}
        </Reveal>
      )}
    </section>
  );
}
