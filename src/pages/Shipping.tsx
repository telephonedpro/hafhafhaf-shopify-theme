import PageIntro from "@/components/PageIntro";
import Steps from "@/components/Steps";
import Closing from "@/components/Closing";
import Seo from "@/components/Seo";
import { Reveal } from "@/components/motion";

const BLOCKS: { title: string; body: string[] }[] = [
  {
    title: "Free Shipping Across the United States",
    body: [
      "All Parveja orders shipped within the United States include free standard shipping. There are no additional standard shipping charges added at checkout.",
      "Once your order has been processed and dispatched, tracking information will be sent to the email address used at checkout when available.",
    ],
  },
  {
    title: "When will my order arrive?",
    body: [
      "Estimated delivery: usually 4–14 days; exceptional delays may take up to 30 days.",
      "Delivery times may vary depending on destination, carrier operations, inventory location, weather, holidays, customs handling where applicable, or other circumstances outside our direct control.",
      "Delivery times are estimates, not guaranteed arrival dates.",
    ],
  },
  {
    title: "Tracking your order",
    body: [
      "When tracking information is available, it will be sent to the email address used at checkout.",
      "Tracking updates may occasionally take some time to appear after an order has been dispatched.",
      "Please make sure the delivery address entered during checkout is complete and accurate.",
    ],
  },
  {
    title: "Returns & Exchanges",
    body: [
      "Please choose your Parveja product carefully before placing your order.",
      "Parveja does not accept returns or exchanges for change of mind, preference, sizing/capacity preference, or other non-defective-product reasons.",
      "Because orders are prepared and fulfilled specifically for each purchase, completed orders should be considered final unless there is a problem with the item received.",
      "If your order arrives damaged, incorrect, materially defective, or you receive the wrong product, contact us as soon as possible with your order information and photos of the issue so our support team can review the situation.",
      "Nothing in this policy limits your statutory or legally required consumer rights.",
    ],
  },
  {
    title: "A note about product appearance",
    body: [
      "Parveja product imagery is created to provide a clear representation of each product’s design, use, proportions, and features.",
      "Because some website imagery may be digitally produced or enhanced, the physical product you receive may have minor visual differences from the images shown online.",
      "These differences may include small variations in color tone, surface finish, button placement, markings, packaging, logo placement, or visible manufacturer branding.",
      "The core product specifications, capacities, functionality, and advertised features remain those described on the applicable product page.",
      "Minor cosmetic or branding differences that do not affect the advertised function or specifications of the product should not be considered a product defect.",
    ],
  },
];

export default function Shipping() {
  return (
    <>
      <Seo title="Shipping & Returns | Parveja" description="Free U.S. shipping on every Parveja order. Estimated delivery usually 4–14 days. Read our returns policy before ordering." />
      <PageIntro eyebrow="Good to know before it arrives" lines={["Shipping", "& Returns."]} tone="sky">
        <p>We keep delivery simple, transparent, and stress-free. Here’s everything you need to know before your Parveja order arrives.</p>
      </PageIntro>
      <section className="pv-section">
        <Reveal className="pv-section-head">
          <p className="pv-eyebrow">From our door to yours</p>
          <h2>
            Usually <span className="pv-accent">4–14 days.</span>
          </h2>
          <p className="pv-muted">Exceptional delays may take up to 30 days. Delivery windows are estimates, not guaranteed arrival dates.</p>
        </Reveal>
        <Steps
          steps={[
            { title: "Order placed", text: "Free standard shipping within the U.S., no minimum order." },
            { title: "Processing", text: "Your order is prepared for dispatch." },
            { title: "Shipped", text: "Tracking is sent to your checkout email when available." },
            { title: "Delivered", text: "Usually 4–14 days after ordering." },
          ]}
        />
      </section>
      <section className="pv-section pv-narrow pv-policy">
        {BLOCKS.map((b) => (
          <Reveal key={b.title} className="pv-policy-block">
            <h2>{b.title}</h2>
            {b.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        ))}
      </section>
      <Closing title="Still have a question?" cta="Contact us" to="/contact" />
    </>
  );
}
