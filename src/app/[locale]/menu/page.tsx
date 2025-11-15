import MenuHero2 from "@/components/Menu/MenuHero2";
import Menu3Wrapper from "@/components/Menu3Wrapper";
import DrinksSectionWrapper from "@/components/DrinksSectionWrapper";
import ContactSection2Wrapper from "@/components/ContactSection2Wrapper";
import MenuStructuredData from "@/components/MenuStructuredData";

export default function Menu() {
  return (
    <div>
      <MenuStructuredData />
      <MenuHero2 />
      <Menu3Wrapper/>
      <DrinksSectionWrapper/>
      <ContactSection2Wrapper />
    </div>
  );
}