import { Link } from "react-router-dom";
import PageIntro from "@/components/PageIntro";
import FaqList from "@/components/FaqList";
import Closing from "@/components/Closing";
import Seo from "@/components/Seo";
import { GENERAL_FAQS } from "@/data/feeders";

export default function Faq() {
  return (
    <>
      <Seo title="Automatic Pet Feeder FAQs | Parveja" description="Answers about Parveja automatic pet feeders: cameras, scheduling, capacity, cleaning, power, shipping and returns." />
      <PageIntro eyebrow="Automatic pet feeder FAQs" lines={["Good to know.", "All your questions."]} tone="lilac">
        <p>
          Something else on your mind? <Link to="/contact">Ask Parveja</Link>, <Link to="/compare">compare automatic pet feeders</Link>{" "}
          or read our <Link to="/shipping">Shipping &amp; Returns policy</Link>.
        </p>
      </PageIntro>
      <section className="pv-section pv-narrow">
        <FaqList items={GENERAL_FAQS} />
      </section>
      <Closing />
    </>
  );
}
