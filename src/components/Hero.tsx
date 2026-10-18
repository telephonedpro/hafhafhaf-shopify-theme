import { useLayoutEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { FEEDERS, type Feeder } from "@/data/feeders";
import { BlurWords, Magnetic, Reveal, useMedia, useNow } from "./motion";
import { LineupGrid } from "./Lineup";

/** Scroll phases of the pinned hero (0 → 1). */
const COPY_OUT = 0.16; // the headline has left
const MORPH_START = 0.12; // View starts to travel into the lineup
const MORPH_END = 0.56; // View has taken its place in the row
const CAPTIONS = 0.6; // names, prices and links are in

/** An illustrative feeding schedule for the countdown (labelled as an example). */
const SCHEDULE = [
  [7, 0],
  [12, 30],
  [18, 30],
] as const;

function nextMeal(now: Date) {
  const times = SCHEDULE.flatMap(([h, m]) => [0, 1].map((d) => new Date(now.getFullYear(), now.getMonth(), now.getDate() + d, h, m)));
  const next = times.find((t) => t > now)!;
  const prev = [...times, ...SCHEDULE.map(([h, m]) => new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, h, m))]
    .filter((t) => t <= now)
    .sort((a, b) => +b - +a)[0];
  const left = Math.max(0, Math.floor((+next - +now) / 1000));
  const done = (+now - +prev) / (+next - +prev);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    clock: `${pad(Math.floor(left / 3600))}:${pad(Math.floor((left % 3600) / 60))}:${pad(left % 60)}`,
    at: next.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    done,
  };
}

/** A live countdown to the next meal on the example schedule. */
function NextMealCard({ className, style }: { className?: string; style?: CSSProperties }) {
  const now = useNow();
  const m = nextMeal(now);
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <div className={`pv-meal ${className ?? ""}`} style={style}>
      <svg className="pv-meal-ring" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r={r} />
        <circle cx="28" cy="28" r={r} style={{ strokeDasharray: c, strokeDashoffset: c * (1 - m.done) }} />
        <text x="28" y="33">🍽️</text>
      </svg>
      <div>
        <small>Next meal · {m.at}</small>
        <b className="pv-meal-clock" aria-live="off">
          {m.clock}
        </b>
        <span className="pv-meal-note">Example schedule · 7:00 · 12:30 · 18:30</span>
      </div>
    </div>
  );
}

type Float = { emoji: string; tone: string; title: string; sub: string; extra?: "rec" | "wave"; pos: string };
const FLOATS: Float[] = [
  { emoji: "📷", tone: "sky", title: "Live check-in", sub: "1080p HD · night vision", extra: "rec", pos: "is-tl" },
  { emoji: "🎙️", tone: "butter", title: "“It’s mealtime!”", sub: "10-second voice message", extra: "wave", pos: "is-tr" },
  { emoji: "🔒", tone: "pink", title: "Vacuum-sealed storage", sub: "≈ −20kPa · Preserve", pos: "is-r" },
  { emoji: "🚚", tone: "lilac", title: "Free U.S. shipping", sub: "No minimum order", pos: "is-br" },
];
const WAVE = [0.4, 0.8, 0.55, 1, 0.65, 0.9, 0.5, 0.75];

function FloatCard({ f, i }: { f: Float; i: number }) {
  return (
    <div className={`pv-float tone-${f.tone} ${f.pos}`} style={{ "--i": i } as CSSProperties}>
      <span className="pv-float-emoji" aria-hidden="true">
        {f.emoji}
      </span>
      <span className="pv-float-text">
        <b>{f.title}</b>
        <small>{f.sub}</small>
      </span>
      {f.extra === "rec" && <span className="pv-rec" aria-hidden="true" />}
      {f.extra === "wave" && (
        <span className="pv-wave" aria-hidden="true">
          {WAVE.map((h, k) => (
            <i key={k} style={{ "--h": h, "--k": k } as CSSProperties} />
          ))}
        </span>
      )}
    </div>
  );
}

/** The rotating “Good food · Good mood” seal. */
function Seal({ className }: { className?: string }) {
  return (
    <svg className={`pv-seal ${className ?? ""}`} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <path id="pv-seal-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
      </defs>
      <circle cx="60" cy="60" r="58" />
      <text>
        <textPath href="#pv-seal-path">GOOD FOOD · GOOD MOOD · GOOD FOOD · GOOD MOOD ·</textPath>
      </text>
      <circle className="pv-seal-dot" cx="60" cy="60" r="9" />
    </svg>
  );
}

function HeroCopy({ onFind }: { onFind?: () => void }) {
  return (
    <>
      <Reveal delay={40}>
        <p className="pv-pill">
          <span className="pv-pill-dot" /> Smart automatic pet feeders
        </p>
      </Reveal>
      <h1 className="pv-hero-title">
        <BlurWords text="Meals set." delay={120} />
        <br />
        <BlurWords text="Worries off." delay={320} className="pv-accent" />
      </h1>
      <Reveal delay={520}>
        <p className="pv-hero-lede">
          Smart feeding. More living. Parveja automatic pet feeders help keep meals on schedule whether you’re home, at work or
          away.
        </p>
      </Reveal>
      <Reveal delay={640} className="pv-hero-ctas">
        <Magnetic>
          {onFind ? (
            <button type="button" className="pv-btn pv-btn-blue" onClick={onFind}>
              Find your feeder <span aria-hidden="true">↓</span>
            </button>
          ) : (
            <a className="pv-btn pv-btn-blue" href="#lineup">
              Find your feeder <span aria-hidden="true">↓</span>
            </a>
          )}
        </Magnetic>
        <Link className="pv-btn pv-btn-ghost" to="/how-it-works">
          How it works
        </Link>
      </Reveal>
      <Reveal delay={760}>
        <ul className="pv-hero-badges">
          <li>App-controlled scheduling</li>
          <li>Four feeder options</li>
          <li>Free U.S. shipping</li>
        </ul>
      </Reveal>
    </>
  );
}

/** One arch in the pinned lineup. View (index 1) starts as the big hero arch. */
function Arch({ f, i, p, geo }: { f: Feeder; i: number; p: MotionValue<number>; geo: Geo }) {
  const isHero = i === 1;
  const start = MORPH_START + 0.14 + Math.abs(i - 1) * 0.05;
  const x = useTransform(p, [MORPH_START, MORPH_END], isHero ? [geo.dx, 0] : [0, 0]);
  const y = useTransform(p, isHero ? [MORPH_START, MORPH_END] : [start, start + 0.22], isHero ? [geo.dy, 0] : [140, 0]);
  const scale = useTransform(p, [MORPH_START, MORPH_END], isHero ? [geo.s, 1] : [1, 1]);
  const opacity = useTransform(p, isHero ? [0, 1] : [start, start + 0.14], isHero ? [1, 1] : [0, 1]);
  const caption = useTransform(p, [CAPTIONS - 0.06, CAPTIONS + 0.06], [0, 1]);
  const captionY = useTransform(p, [CAPTIONS - 0.06, CAPTIONS + 0.06], [16, 0]);
  const seal = useTransform(p, [0, MORPH_START + 0.1], [1, 0]);
  return (
    <div className="pv-arch-slot">
      <motion.div className="pv-arch-move" style={{ x, y, scale, opacity }}>
        <Link to={`/products/${f.slug}`} className={`pv-arch tone-${f.tone}`} aria-label={`${f.name}, $${f.price}`}>
          <img src={f.images.main} alt={f.fullTitle} className="pv-arch-img" />
        </Link>
        {isHero && (
          <motion.div className="pv-arch-seal" style={{ opacity: seal }}>
            <Seal />
          </motion.div>
        )}
      </motion.div>
      <motion.div className="pv-arch-caption" style={{ opacity: caption, y: captionY }}>
        <small>{f.short}</small>
        <b>{f.name}</b>
        <span>
          {f.capacity} · <strong>${f.price}</strong>
        </span>
        <Link to={`/products/${f.slug}`} className="pv-link">
          View product <span aria-hidden="true">→</span>
        </Link>
      </motion.div>
    </div>
  );
}

type Geo = { dx: number; dy: number; s: number };

/** Desktop: the pinned hero that turns into the lineup as you scroll. */
function PinnedHero() {
  const track = useRef<HTMLElement>(null);
  const target = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  // A function mapping keeps every effect on the JS path. Framer would
  // otherwise hand scroll-linked opacity to a native scroll timeline, which
  // tracks the whole page rather than this section.
  const p = useTransform(scrollYProgress, (v) => v);
  const [geo, setGeo] = useState<Geo>({ dx: 0, dy: 0, s: 1.6 });

  // Where View's arch sits in the row, and where it should start in the hero.
  useLayoutEffect(() => {
    const measure = () => {
      const slot = row.current?.children[1] as HTMLElement | undefined;
      const arch = slot?.firstElementChild as HTMLElement | undefined;
      const t = target.current;
      if (!slot || !arch || !t) return;
      // The slot is never transformed, so its box is the arch's resting place.
      const a = slot.getBoundingClientRect();
      const b = t.getBoundingClientRect();
      const ay = a.top + arch.offsetHeight / 2;
      setGeo({ dx: b.left + b.width / 2 - (a.left + a.width / 2), dy: b.top + b.height / 2 - ay, s: b.width / a.width });
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Pointer parallax for the floating cards.
  const mx = useSpring(useMotionValue(0), { stiffness: 45, damping: 16 });
  const my = useSpring(useMotionValue(0), { stiffness: 45, damping: 16 });
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const copyOpacity = useTransform(p, [0, COPY_OUT], [1, 0]);
  const copyY = useTransform(p, [0, COPY_OUT], [0, -90]);
  const orbitOpacity = useTransform(p, [0.02, 0.14], [1, 0]);
  const orbitScale = useTransform(p, [0, 0.14], [1, 1.25]);
  const orbitX = useTransform(mx, (v) => v * -26);
  const orbitY = useTransform(my, (v) => v * -18);
  const headOpacity = useTransform(p, [0.42, 0.56], [0, 1]);
  const headY = useTransform(p, [0.42, 0.56], [40, 0]);
  const bg = useTransform(p, [0, 0.5], ["#fff3d1", "#fbfaf6"]);
  const blobs = useTransform(p, [0, 0.5], [1, 0.35]);

  const toLineup = () => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (CAPTIONS + 0.08) * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  };

  return (
    <section ref={track} className="pv-pin" aria-labelledby="pv-hero-title" onPointerMove={onMove}>
      <motion.div className="pv-pin-stage" style={{ backgroundColor: bg }}>
        <motion.div className="pv-blobs" style={{ opacity: blobs }} aria-hidden="true">
          <span className="b1" />
          <span className="b2" />
          <span className="b3" />
        </motion.div>

        <motion.div className="pv-pin-copy" style={{ opacity: copyOpacity, y: copyY }} id="pv-hero-title">
          <HeroCopy onFind={toLineup} />
        </motion.div>

        <div ref={target} className="pv-pin-target" aria-hidden="true" />

        <motion.div className="pv-pin-orbit" style={{ opacity: orbitOpacity, scale: orbitScale, x: orbitX, y: orbitY }}>
          {FLOATS.map((f, i) => (
            <FloatCard key={f.title} f={f} i={i} />
          ))}
          <NextMealCard className="is-bl" style={{ "--i": 4 } as CSSProperties} />
        </motion.div>

        <motion.div className="pv-pin-head" style={{ opacity: headOpacity, y: headY }}>
          <p className="pv-eyebrow">The lineup</p>
          <h2>
            Four feeders. <span className="pv-accent">Find your fit.</span>
          </h2>
        </motion.div>

        <div ref={row} className="pv-pin-row" id="lineup">
          {FEEDERS.map((f, i) => (
            <Arch key={f.slug} f={f} i={i} p={p} geo={geo} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/** Phones, tablets and reduced motion: the same story without pinning. */
function StaticHero() {
  return (
    <>
      <section className="pv-hero-static">
        <div className="pv-blobs" aria-hidden="true">
          <span className="b1" />
          <span className="b2" />
          <span className="b3" />
        </div>
        <div className="pv-hero-static-copy">
          <HeroCopy />
        </div>
        <Reveal className="pv-hero-static-visual" delay={300}>
          <div className="pv-arch tone-sky pv-arch-hero">
            <img src={FEEDERS[1].images.main} alt={FEEDERS[1].fullTitle} className="pv-arch-img" />
          </div>
          <div className="pv-arch-seal">
            <Seal />
          </div>
          <FloatCard f={FLOATS[0]} i={0} />
          <NextMealCard className="is-bl" />
        </Reveal>
      </section>
      <section className="pv-section" id="lineup">
        <Reveal className="pv-section-head is-center">
          <p className="pv-eyebrow">The lineup</p>
          <h2>
            Four feeders. <span className="pv-accent">Find your fit.</span>
          </h2>
        </Reveal>
        <LineupGrid />
      </section>
    </>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const wide = useMedia("(min-width: 1024px) and (min-height: 640px)");
  return wide && !reduced ? <PinnedHero /> : <StaticHero />;
}
