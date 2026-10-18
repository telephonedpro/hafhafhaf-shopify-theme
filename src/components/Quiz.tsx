import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FEEDERS } from "@/data/feeders";
import { Reveal } from "./motion";

const CHOICES = [
  { n: "01", text: "Keep scheduled feeding simple.", slug: "essential" },
  { n: "02", text: "See my pet while I’m away.", slug: "view" },
  { n: "03", text: "Help keep their food fresh.", slug: "preserve" },
  { n: "04", text: "Go big on capacity & camera.", slug: "horizon" },
];

/** “Which Parveja fits your routine?” — pick what matters, see the match. */
export default function Quiz() {
  const [pick, setPick] = useState(0);
  const f = FEEDERS.find((x) => x.slug === CHOICES[pick].slug)!;
  return (
    <section className="pv-section pv-quiz">
      <Reveal className="pv-quiz-copy">
        <p className="pv-eyebrow">Find your fit</p>
        <h2>Which Parveja fits your routine?</h2>
        <p className="pv-muted">Tell us what matters most. We’ll start there.</p>
        <div className="pv-quiz-choices" role="radiogroup" aria-label="What matters most">
          {CHOICES.map((c, i) => (
            <button key={c.n} type="button" role="radio" aria-checked={pick === i} className={pick === i ? "is-on" : ""} onClick={() => setPick(i)}>
              <span>{c.n}</span>
              <em>{c.text}</em>
              {pick === i && <motion.i layoutId="pv-quiz-bg" className="pv-quiz-bg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            </button>
          ))}
        </div>
      </Reveal>
      <Reveal delay={150}>
        <motion.div className={`pv-match tone-${f.tone}`} layout aria-live="polite">
          <p className="pv-match-kicker">Your mealtime match · {f.capacity}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={f.slug}
              className="pv-match-body"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={f.images.main} alt={f.fullTitle} />
              <div>
                <h3>{f.name}</h3>
                <p>{f.bestFor}</p>
                <Link to={`/products/${f.slug}`} className="pv-btn pv-btn-ink">
                  Meet {f.name} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Reveal>
    </section>
  );
}
