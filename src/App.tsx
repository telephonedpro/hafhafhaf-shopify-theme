import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Compare from "./pages/Compare";
import About from "./pages/About";
import Faq from "./pages/Faq";
import HowItWorks from "./pages/HowItWorks";
import Shipping from "./pages/Shipping";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/** Fades and un-blurs each page in, and starts it at the top. */
function Page({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={reduced ? undefined : { opacity: 0, y: -12, filter: "blur(6px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  const page = (el: React.ReactNode) => <Page>{el}</Page>;
  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={page(<Home />)} />
          <Route path="/products/:slug" element={page(<Product />)} />
          <Route path="/compare" element={page(<Compare />)} />
          <Route path="/about" element={page(<About />)} />
          <Route path="/faq" element={page(<Faq />)} />
          <Route path="/how-it-works" element={page(<HowItWorks />)} />
          <Route path="/shipping" element={page(<Shipping />)} />
          <Route path="/contact" element={page(<Contact />)} />
          <Route path="*" element={page(<NotFound />)} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}
