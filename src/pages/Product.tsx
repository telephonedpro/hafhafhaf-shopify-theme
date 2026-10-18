import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { RETURNS_NOTE, SHIPPING_NOTE, bySlug } from "@/data/feeders";
import CompareTable from "@/components/CompareTable";
import FaqList from "@/components/FaqList";
import Closing from "@/components/Closing";
import Seo from "@/components/Seo";
import { BlurWords, Magnetic, Reveal } from "@/components/motion";
import NotFound from "./NotFound";

/** Large image with thumbnails; the image follows the pointer slightly. */
function Gallery({ images, alt, tone }: { images: string[]; alt: string; tone: string }) {
  const [i, setI] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <div className="pv-gallery">
      <div
        className={`pv-gallery-stage tone-${tone}`}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
        }}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={images[i]}
            src={images[i]}
            alt={`${alt} — image ${i + 1} of ${images.length}`}
            initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: tilt.x * -18, y: tilt.y * -14 }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <span className="pv-gallery-count">
          {i + 1} / {images.length}
        </span>
        <button type="button" className="pv-gallery-nav is-prev" aria-label="Previous image" onClick={() => setI((i - 1 + images.length) % images.length)}>
          ←
        </button>
        <button type="button" className="pv-gallery-nav is-next" aria-label="Next image" onClick={() => setI((i + 1) % images.length)}>
          →
        </button>
      </div>
      <div className="pv-thumbs" role="tablist" aria-label="Product images">
        {images.map((src, k) => (
          <button key={src} type="button" role="tab" aria-selected={k === i} className={k === i ? "is-on" : ""} onClick={() => setI(k)}>
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Product() {
  const { slug } = useParams();
  const f = bySlug(slug);
  const buy = useRef<HTMLDivElement>(null);
  const buyVisible = useInView(buy, { margin: "0px 0px -40px 0px" });
  const life = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: life, offset: ["start end", "end start"] });
  const lifeA = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const lifeB = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  if (!f) return <NotFound />;

  const images = [f.images.main, ...f.images.gallery];
  const life1 = f.images.gallery[1];
  const life2 = f.images.gallery[2];

  return (
    <>
      <Seo title={f.seoTitle} description={`${f.fullTitle}. ${f.intro} Free U.S. shipping.`} />
      <section className={`pv-pdp tone-wash-${f.tone}`}>
        <nav className="pv-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/compare">Automatic Pet Feeders</Link> <span>/</span> <b>{f.name}</b>
        </nav>
        <div className="pv-pdp-grid">
          <Gallery images={images} alt={f.fullTitle} tone={f.tone} />
          <div className="pv-pdp-summary">
            <p className={`pv-chip tone-${f.tone}`}>{f.label}</p>
            <h1 className="pv-pdp-name">
              <BlurWords text={f.name} />
              <span className="pv-dot">.</span>
            </h1>
            <p className="pv-pdp-full">{f.fullTitle}</p>
            <p className="pv-pdp-tagline">{f.tagline}</p>
            <p className="pv-pdp-price">${f.price}</p>
            <p className="pv-pdp-intro">{f.intro}</p>
            <ul className="pv-checks">
              {f.highlights.map((h, k) => (
                <Reveal as="li" key={h} delay={k * 70} y={12}>
                  {h}
                </Reveal>
              ))}
            </ul>
            <div ref={buy} className="pv-pdp-buy">
              <Magnetic>
                <a className="pv-btn pv-btn-blue pv-btn-lg" href={f.shopUrl}>
                  Buy {f.name} — ${f.price} <span aria-hidden="true">→</span>
                </a>
              </Magnetic>
              <p className="pv-stock">
                <i /> In stock
              </p>
            </div>
            <ul className="pv-trust">
              <li>
                <b>Free U.S.</b> shipping
              </li>
              <li>
                <b>Estimated</b> delivery
              </li>
              <li>
                <b>Secure</b> checkout
              </li>
            </ul>
            <p className="pv-small">{SHIPPING_NOTE}</p>
            <div className="pv-pdp-links">
              <a href="#specs" className="pv-link">
                All specifications ↓
              </a>
              <Link to="/compare" className="pv-link">
                Compare automatic pet feeders →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pv-section pv-feature">
        <Reveal className="pv-section-head">
          <p className="pv-eyebrow">{f.feature.eyebrow}</p>
          <h2>
            {f.feature.title[0]} <span className="pv-accent">{f.feature.title[1]}</span>
          </h2>
          <p className="pv-muted pv-feature-text">{f.feature.text}</p>
        </Reveal>
        <div className="pv-feature-cards">
          {f.feature.cards.map((c, k) => (
            <Reveal as="article" key={c.title} delay={k * 110} className={`pv-feature-card tone-${f.tone}`}>
              <span className="pv-feature-num">{String(k + 1).padStart(2, "0")}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section ref={life} className={`pv-life tone-${f.tone}`} aria-hidden="true">
        <motion.img src={life1} alt="" style={{ y: lifeA }} loading="lazy" />
        <p className="pv-life-text">
          Less guessing.
          <br />
          More good days.
        </p>
        <motion.img src={life2} alt="" style={{ y: lifeB }} loading="lazy" />
      </section>

      <section className="pv-section pv-specs" id="specs">
        <Reveal className="pv-section-head">
          <p className="pv-eyebrow">Good to know.</p>
          <h2>A closer look at {f.name}.</h2>
        </Reveal>
        <dl className="pv-spec-grid">
          {f.specs.map(([k, v], i) => (
            <Reveal key={k} delay={(i % 4) * 60} y={14}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="pv-section pv-pdp-faq">
        <Reveal className="pv-section-head">
          <p className="pv-eyebrow">A little more detail</p>
          <h2>
            {f.name} questions, <span className="pv-accent">answered.</span>
          </h2>
          <Link to="/contact" className="pv-link">
            Need help with your setup? Talk to Parveja →
          </Link>
        </Reveal>
        <FaqList
          first={null}
          items={[
            ...f.faqs,
            ["Full product specifics", [...f.details, `Key features: ${f.keyFeatures.join(" · ")}.`, f.note].join("\n\n")],
            ["Delivery & returns", `Free U.S. shipping. ${SHIPPING_NOTE} Tracking information is supplied when available.\n\n${RETURNS_NOTE}`],
            ["Warranty & box contents", "Warranty terms are not specified in the current product information. Contact Parveja to confirm coverage and full box contents."],
          ]}
        />
      </section>

      <section className="pv-section">
        <Reveal className="pv-section-head">
          <p className="pv-eyebrow">Not sure which one is right?</p>
          <h2>
            Compare the details that matter <span className="pv-accent">to your routine.</span>
          </h2>
        </Reveal>
        <CompareTable current={f.slug} />
      </section>

      <Closing title="Found your fit?" cta={`Choose ${f.name}`} href={f.shopUrl} />

      <AnimatePresence>
        {!buyVisible && (
          <motion.div
            className="pv-buybar"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <img src={f.images.main} alt="" />
            <span>
              <b>{f.name}</b>
              <small>${f.price} · Free U.S. shipping</small>
            </span>
            <a className="pv-btn pv-btn-blue pv-btn-sm" href={f.shopUrl}>
              Buy now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
