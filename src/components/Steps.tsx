import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal } from "./motion";

export type Step = { title: string; text: string };

/** Numbered steps joined by a line that draws itself as you scroll. */
export default function Steps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return (
    <ol ref={ref} className="pv-steps" style={{ "--n": steps.length } as React.CSSProperties}>
      <motion.span className="pv-steps-line" style={{ scaleX: draw }} aria-hidden="true" />
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 110}>
          <span className="pv-steps-num">{String(i + 1).padStart(2, "0")}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
