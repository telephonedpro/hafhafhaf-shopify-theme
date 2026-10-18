import { Link } from "react-router-dom";
import PageIntro from "@/components/PageIntro";
import Closing from "@/components/Closing";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/motion";
import { FEEDERS } from "@/data/feeders";

export default function About() {
  return (
    <>
      <Seo title="About Parveja: smart automatic pet feeders" description="Parveja makes smart feeding feel simple. Our feeders help keep meals on schedule, food fresh, and your pets cared for." />
      <PageIntro
        eyebrow="Our story"
        lines={["Life gets busy.", "Their routine shouldn’t."]}
        tone="pink"
        aside={<img className="pv-intro-img" src="/images/about-camera.webp" alt="Parveja View feeder with its camera app" />}
      >
        <p>
          Parveja makes smart feeding feel simple. Our feeders help keep meals on schedule, food fresh, and your pets cared for,
          even when your day does not go to plan.
        </p>
        <p>
          From everyday automatic feeding to app control, cameras, larger capacities and freshness-focused storage, each Parveja
          feeder is designed around one idea: less worrying, more living.
        </p>
        <Link to="/compare" className="pv-btn pv-btn-ink">
          Find your feeder <span aria-hidden="true">→</span>
        </Link>
      </PageIntro>
      <section className="pv-section">
        <div className="pv-values">
          {[
            ["On schedule", "App-controlled scheduling on all four feeders."],
            ["Fresh", "Sealed and vacuum-sealed food storage options."],
            ["In view", "1080p cameras with night vision on View and Horizon."],
            ["Room to grow", "From a compact 3L to an 11L reservoir."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 90} className={`pv-value tone-${FEEDERS[i].tone}`}>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <Closing title="Smart feeding. Peace of mind." />
    </>
  );
}
