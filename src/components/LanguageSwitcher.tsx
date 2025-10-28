"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (newLocale: string) => {
    // Replace current locale in pathname with new locale
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 rounded-full text-sm ${
          locale === 'en' 
            ? 'bg-white/20 text-white' 
            : 'text-white/60 hover:text-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('es')}
        className={`px-3 py-1 rounded-full text-sm ${
          locale === 'es' 
            ? 'bg-white/20 text-white' 
            : 'text-white/60 hover:text-white'
        }`}
      >
        ES
      </button>
    </div>
  );
}
