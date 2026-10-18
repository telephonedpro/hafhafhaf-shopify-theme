import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { BlurWords, Reveal, useNow } from "./motion";

/** “Hello from the other side.” A camera viewfinder with a working night-vision switch. */
export default function CameraFeature() {
  const [night, setNight] = useState(false);
  const now = useNow();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const feedY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const feederY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const stamp = now.toLocaleString("en-US", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  return (
    <section ref={ref} className="pv-camera">
      <div className="pv-camera-copy">
        <Reveal>
          <p className="pv-eyebrow is-light">View · camera model</p>
        </Reveal>
        <h2>
          <BlurWords text="Hello from" inView />
          <br />
          <BlurWords text="the other side." inView delay={200} className="pv-accent-sky" />
        </h2>
        <Reveal delay={200}>
          <p className="pv-camera-lede">A closer look at mealtime with the built-in camera.</p>
          <p>View’s wide-angle 1080p camera and infrared night vision keep mealtime in view, day or night.</p>
        </Reveal>
        <Reveal delay={320} className="pv-camera-actions">
          <Link to="/products/view" className="pv-btn pv-btn-sky">
            Meet View <span aria-hidden="true">→</span>
          </Link>
          <div className="pv-switch" role="group" aria-label="Camera mode">
            <button type="button" aria-pressed={!night} onClick={() => setNight(false)}>
              ☀️ Day
            </button>
            <button type="button" aria-pressed={night} onClick={() => setNight(true)}>
              🌙 Night vision
            </button>
            <span className={`pv-switch-knob ${night ? "is-right" : ""}`} aria-hidden="true" />
          </div>
        </Reveal>
      </div>

      <Reveal className="pv-viewfinder-wrap" delay={150}>
        <div className={`pv-viewfinder ${night ? "is-night" : ""}`}>
          <motion.img src="/images/lifestyle-cat.webp" alt="A cat eating from a Parveja feeder, seen through the camera" style={{ y: feedY }} loading="lazy" />
          <div className="pv-vf-scan" aria-hidden="true" />
          <div className="pv-vf-ui" aria-hidden="true">
            <span className="pv-vf-corner tl" />
            <span className="pv-vf-corner tr" />
            <span className="pv-vf-corner bl" />
            <span className="pv-vf-corner br" />
            <span className="pv-vf-rec">
              <i /> REC
            </span>
            <span className="pv-vf-mode">{night ? "IR · NIGHT VISION" : "1080p HD · WIDE"}</span>
            <span className="pv-vf-time">CAM 01 · {stamp}</span>
            <span className="pv-vf-focus" />
          </div>
        </div>
        <motion.img className="pv-camera-feeder" src="/images/view-1.webp" alt="" style={{ y: feederY }} loading="lazy" />
      </Reveal>
    </section>
  );
}
