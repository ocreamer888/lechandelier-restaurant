import ContactSection2 from './ContactSection2';
import { getSiteSettings } from '@/lib/sanity';

export default async function ContactSection2Wrapper() {
  const settings = await getSiteSettings();
  
  return <ContactSection2 settings={settings} />;
}

