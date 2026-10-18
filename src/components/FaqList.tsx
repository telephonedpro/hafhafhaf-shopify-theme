import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** An accordion that opens one answer at a time with a smooth height change. */
export default function FaqList({ items, first = 0 }: { items: [string, string][]; first?: number | null }) {
  const [open, setOpen] = useState<number | null>(first);
  const id = useId();
  return (
    <div className="pv-faq">
      {items.map(([q, a], i) => {
        const on = open === i;
        return (
          <div key={q} className={`pv-faq-item ${on ? "is-open" : ""}`}>
            <h3>
              <button type="button" aria-expanded={on} aria-controls={`${id}-${i}`} onClick={() => setOpen(on ? null : i)}>
                {q}
                <span className="pv-faq-icon" aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${id}-${i}`}
                  className="pv-faq-a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {a.split("\n\n").map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
