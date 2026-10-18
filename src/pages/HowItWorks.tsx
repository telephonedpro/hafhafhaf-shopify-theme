import { Link } from "react-router-dom";
import PageIntro from "@/components/PageIntro";
import Steps from "@/components/Steps";
import Closing from "@/components/Closing";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/motion";

export default function HowItWorks() {
  return (
    <>
      <Seo
        title="How Automatic Pet Feeders Work | Parveja"
        description="An automatic pet feeder helps organize scheduled meals with app control and portion control. All four Parveja models support app-based feeding schedules."
      />
      <PageIntro
        eyebrow="How automatic pet feeders work"
        lines={["More rhythm.", "Less rushing."]}
        tone="butter"
        aside={<img className="pv-intro-photo" src="/images/lifestyle-cat.webp" alt="A cat eating next to a Parveja feeder" />}
      >
        <p>
          An automatic pet feeder helps organize scheduled meals with app control and portion control. All four Parveja models
          support app-based feeding schedules; View and Horizon add cameras for remote check-ins. Start with compatible food and
          your model’s setup guide.
        </p>
      </PageIntro>
      <section className="pv-section">
        <Reveal className="pv-section-head">
          <p className="pv-eyebrow">A little planning.</p>
          <h2>
            A lovely <span className="pv-accent">everyday.</span>
          </h2>
        </Reveal>
        <Steps
          steps={[
            { title: "Make a little space.", text: "Place your feeder on a stable surface and follow the supplied guide to connect the power." },
            { title: "Make it yours.", text: "Pair with the companion app and set feeding times and portions for your pet." },
            { title: "Let dinner happen.", text: "Scheduled meals fit into your day. Check feeding records where your model supports them." },
            { title: "Stay close.", text: "With View or Horizon, check in through the camera. Keep refills and regular cleaning part of the routine." },
          ]}
        />
      </section>
      <section className="pv-section pv-split">
        <Reveal className="pv-section-head">
          <p className="pv-eyebrow">Start with their food.</p>
          <h2>
            Then find <span className="pv-accent">their feeder.</span>
          </h2>
        </Reveal>
        <Reveal delay={150} className="pv-prose">
          <p>
            Essential supports dry kibble approximately 2–12mm; Preserve supports kibble up to 8mm. Check compatibility for View
            and Horizon before ordering. For camera check-ins, choose <Link to="/products/view">View</Link> or{" "}
            <Link to="/products/horizon">Horizon</Link>. For vacuum-sealed storage, meet <Link to="/products/preserve">Preserve</Link>.
          </p>
          <p className="pv-muted">
            Use your model’s supplied instructions for pairing, power, setup and cleaning. Automatic feeding supports care—it does
            not replace checking in on your pet.
          </p>
        </Reveal>
      </section>
      <Closing title="Compare automatic pet feeders" cta="Compare all four" />
    </>
  );
}
