import PageIntro from "@/components/PageIntro";
import CompareTable from "@/components/CompareTable";
import { LineupGrid } from "@/components/Lineup";
import Quiz from "@/components/Quiz";
import Closing from "@/components/Closing";
import Seo from "@/components/Seo";

export default function Compare() {
  return (
    <>
      <Seo
        title="Compare Automatic Pet Feeders | Parveja"
        description="Compare automatic pet feeders by reservoir capacity, camera features, Wi-Fi/app scheduling, food-storage system and portion controls."
      />
      <PageIntro eyebrow="Compare automatic pet feeders" lines={["Four feeders.", "Find your fit."]} tone="sky">
        <p>
          Compare automatic pet feeders by reservoir capacity, camera features, Wi-Fi/app scheduling, food-storage system and
          portion controls. Choose camera or camera-free feeding to suit your routine, then check kibble compatibility before
          ordering.
        </p>
      </PageIntro>
      <section className="pv-section">
        <LineupGrid />
      </section>
      <section className="pv-section">
        <CompareTable />
      </section>
      <Quiz />
      <Closing title="Less guessing. More good days." />
    </>
  );
}
