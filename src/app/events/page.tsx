import EventsHero from "@/components/Events/EventsHero";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

export default function Events() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Events", url: "/events" },
  ]);
  return (
    <div>
      <StructuredData data={breadcrumbSchema} />
      <EventsHero />
    </div>
  );
}