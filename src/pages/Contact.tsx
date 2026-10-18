import PageIntro from "@/components/PageIntro";
import Seo from "@/components/Seo";
import { Magnetic, Reveal } from "@/components/motion";

/** The live store's contact form, where messages are actually received. */
const CONTACT_FORM = "https://parveja.com/contact";

const TOPICS = [
  ["📦", "Order inquiry"],
  ["🐾", "Product question"],
  ["💬", "Product feedback"],
  ["↩️", "Returns & exchanges"],
  ["✉️", "Other"],
];

export default function Contact() {
  return (
    <>
      <Seo title="Contact Parveja" description="Choosing a feeder, looking for setup guidance or sharing your experience? Send Parveja a message." />
      <PageIntro eyebrow="Contact Parveja" lines={["Questions?", "We’re here to help."]} tone="lilac">
        <p>Choosing a feeder, looking for setup guidance or sharing your experience? Send us a message.</p>
        <Magnetic>
          <a href={CONTACT_FORM} className="pv-btn pv-btn-blue pv-btn-lg">
            Send us a message <span aria-hidden="true">→</span>
          </a>
        </Magnetic>
      </PageIntro>
      <section className="pv-section">
        <Reveal className="pv-section-head">
          <p className="pv-eyebrow">What can we help with?</p>
          <h2>Pick a topic in the form.</h2>
        </Reveal>
        <div className="pv-topics">
          {TOPICS.map(([e, t], i) => (
            <Reveal key={t} delay={i * 70}>
              <a href={CONTACT_FORM} className="pv-topic">
                <span aria-hidden="true">{e}</span>
                {t}
                <i aria-hidden="true">→</i>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
