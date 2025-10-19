import AboutHero from "@/components/About/AboutHero";
import StructuredData from "@/components/StructuredData";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

export default function About() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);
  return (
    <div className="min-h-screen">
      <StructuredData data={breadcrumbSchema} />
      <AboutHero />
    </div>
  );
}
