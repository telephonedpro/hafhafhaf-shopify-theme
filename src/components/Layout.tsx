import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FEEDERS } from "@/data/feeders";
import Logo from "./Logo";
import { Magnetic, Marquee } from "./motion";

const NAV = [
  { to: "/compare", label: "Find your fit" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQs" },
  { to: "/contact", label: "Contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <div className="pv-announce">
        <Marquee
          speed={40}
          items={Array.from({ length: 6 }, () => (
            <>
              Free U.S. shipping <i>●</i> No minimum order <i>●</i> App-controlled feeding <i>●</i>
            </>
          ))}
        />
      </div>
      <header className={`pv-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="pv-header-inner">
          <Link to="/" className="pv-header-logo" aria-label="Parveja home">
            <Logo />
          </Link>
          <nav className="pv-nav" aria-label="Primary">
            <div className="pv-nav-shop">
              <button type="button" className="pv-nav-link">Shop</button>
              <div className="pv-shop-menu">
                {FEEDERS.map((f) => (
                  <Link key={f.slug} to={`/products/${f.slug}`} className={`pv-shop-item tone-${f.tone}`}>
                    <img src={f.images.main} alt="" loading="lazy" />
                    <span>
                      <b>{f.name}</b>
                      <small>{f.capacity} · ${f.price}</small>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className="pv-nav-link">
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="pv-header-cta">
            <Magnetic>
              <Link to="/compare" className="pv-btn pv-btn-ink pv-btn-sm">
                Find your feeder <span aria-hidden="true">→</span>
              </Link>
            </Magnetic>
          </div>
          <button
            type="button"
            className={`pv-burger ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="pv-drawer"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pv-drawer-feeders">
              {FEEDERS.map((f, i) => (
                <motion.div key={f.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <Link to={`/products/${f.slug}`} className={`pv-drawer-feeder tone-${f.tone}`}>
                    <img src={f.images.main} alt="" />
                    <b>{f.name}</b>
                    <small>${f.price}</small>
                  </Link>
                </motion.div>
              ))}
            </div>
            <nav className="pv-drawer-nav" aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }}>
                  <Link to={n.to}>{n.label}</Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="pv-footer">
      <div className="pv-footer-top">
        <div className="pv-footer-brand">
          <Logo />
          <p>Good food. Good mood.</p>
        </div>
        <div className="pv-footer-cols">
          <div>
            <h3>Shop</h3>
            {FEEDERS.map((f) => (
              <Link key={f.slug} to={`/products/${f.slug}`}>
                {f.name}
              </Link>
            ))}
            <Link to="/compare">Compare feeders</Link>
          </div>
          <div>
            <h3>Help</h3>
            <Link to="/contact">Contact</Link>
            <Link to="/shipping">Shipping &amp; returns</Link>
            <Link to="/faq">FAQs</Link>
            <Link to="/how-it-works">How it works</Link>
          </div>
          <div>
            <h3>Parveja</h3>
            <Link to="/about">Our story</Link>
          </div>
        </div>
      </div>
      <div className="pv-footer-giant" aria-hidden="true">
        parveja<span>.</span>
      </div>
      <div className="pv-footer-bottom">
        <small>© {new Date().getFullYear()} Parveja</small>
        <small>Free U.S. shipping · Secure checkout</small>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="pv-skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
