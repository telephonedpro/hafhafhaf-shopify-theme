import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import CompareTable from "@/components/CompareTable";
import CameraFeature from "@/components/CameraFeature";
import Quiz from "@/components/Quiz";
import FaqList from "@/components/FaqList";
import Closing from "@/components/Closing";
import Seo from "@/components/Seo";
import { BlurWords, Reveal } from "@/components/motion";
import { GENERAL_FAQS } from "@/data/feeders";

export default function Home() {
  return (
    <>
      <Seo
        title="Automatic Pet Feeders for Cats & Dogs | Parveja"
        description="Shop Parveja automatic pet feeders with app scheduling, Wi-Fi control, camera options, night vision and large-capacity designs. Free U.S. shipping."
      />
      <Hero />

      <section className="pv-statement">
        <Reveal>
          <p className="pv-eyebrow">View / Camera feeder</p>
        </Reveal>
        <h2>
          <BlurWords text="Dinner’s handled." inView />{" "}
          <BlurWords text="Plans? Keep them." inView delay={250} className="pv-accent" />
        </h2>
        <Reveal delay={200} className="pv-statement-body">
          <h3>Smart Automatic Pet Feeders for Cats &amp; Dogs</h3>
          <p>
            Parveja automatic pet feeders help keep meals on schedule whether you’re home, at work or away. Choose from Wi-Fi
            app-controlled feeders, camera-equipped models, vacuum-sealed food storage and large-capacity options for cats and
            dogs.
          </p>
        </Reveal>
      </section>

      <section className="pv-section">
        <Reveal className="pv-section-head">
          <p className="pv-eyebrow">Compare</p>
          <h2>
            Compare the details that matter <span className="pv-accent">to your routine.</span>
          </h2>
        </Reveal>
        <CompareTable />
      </section>

      <CameraFeature />

      <Quiz />

      <section className="pv-section pv-faq-section">
        <Reveal className="pv-section-head">
          <p className="pv-eyebrow">Good to know.</p>
          <h2>A closer look before the first bowl.</h2>
          <Link to="/faq" className="pv-link">
            All your questions <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <FaqList items={GENERAL_FAQS.slice(0, 4)} />
      </section>

      <Closing title="Less guessing. More good days." />
    </>
  );
}
