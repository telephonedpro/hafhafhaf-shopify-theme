import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = { children: ReactNode; delay?: number; className?: string; y?: number; as?: "div" | "li" | "article" | "section" };

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ children, delay = 0, className, y = 28, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Headline words that rise out of a blur one after another. */
export function BlurWords({ text, delay = 0, className, inView = false }: { text: string; delay?: number; className?: string; inView?: boolean }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const from = { opacity: 0, y: "0.35em", filter: "blur(12px)" };
  const to = { opacity: 1, y: "0em", filter: "blur(0px)" };
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="pv-word"
          initial={reduced ? false : from}
          {...(inView ? { whileInView: to, viewport: { once: true } } : { animate: to })}
          transition={{ duration: 0.9, delay: delay / 1000 + i * 0.08, ease: EASE }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}

/** A link or button that leans toward the pointer. */
export function Magnetic({ children, className, strength = 0.28 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-flex" }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** Text that loops sideways forever, like a ticker. */
export function Marquee({ items, className, speed = 32 }: { items: ReactNode[]; className?: string; speed?: number }) {
  const row = items.map((it, i) => (
    <span className="pv-marquee-item" key={i}>
      {it}
    </span>
  ));
  return (
    <div className={`pv-marquee ${className ?? ""}`} style={{ "--speed": `${speed}s` } as CSSProperties}>
      <div className="pv-marquee-track" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}

/** True when the media query matches; follows changes. */
export function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

/** The current time, updated every second. */
export function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return now;
}
