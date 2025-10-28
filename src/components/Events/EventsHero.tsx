"use client";
import Image from "next/image";
import NavBar2 from "../NavBar2";
import { useState } from "react";
import { useTranslations } from 'next-intl';

// Modal Component
function EventModal({
  isOpen,
  onClose,
  title,
  content,
  closeLabel,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  closeLabel: string;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/20"
          aria-label={closeLabel}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-8 md:p-12">
          <h2 className="font-script text-5xl md:text-6xl mb-6 text-white">
            {title}
          </h2>
          <div className="text-white/80 text-lg leading-relaxed space-y-4">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  label,
  src,
  alt,
  onClick,
}: {
  label: string;
  src: string;
  alt: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative block h-full w-full overflow-hidden rounded-3xl"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-0 right-0 flex items-center gap-2">
        <span className="flex flex-row rounded-tl-3xl rounded-br-xl bg-black/50 justify-center items-center px-8 py-4 text-md text-white/90 backdrop-blur">
          {label}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12h12M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </button>
  );
}

export default function EventsHero() {
  const t = useTranslations('events');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const openModal = (eventType: string) => {
    setSelectedEvent(eventType);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  // Generate event content from translations
  const getEventContent = (eventType: 'corporate' | 'celebrations' | 'privateParties' | 'specialOccasions') => {
    const features = [0, 1, 2, 3].map(i => t(`${eventType}.features.${i}`));
    
    return (
      <>
        <p>{t(`${eventType}.description`)}</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          {features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
        <p className="text-amber-400 font-semibold mt-6">
          {t(`${eventType}.cta`)}
        </p>
      </>
    );
  };

  return (
    <section className="relative min-h-screen">
      <div className="grid h-auto min-h-screen grid-cols-1 gap-4 p-2 md:p-4 lg:grid-cols-[1fr_600px]">
        {/* Left: main contact image with overlay */}
        <div className="relative h-[96vh] lg:h-full rounded-3xl overflow-hidden">
          <Image
            src="/Chandelier.png"
            alt={t('imageAlt')}
            fill
            priority
            className="object-cover"
          />
          <NavBar2 />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex flex-col w-full h-full items-center justify-center lg:items-start lg:justify-end p-6 md:p-10">
            <h1 className="pointer-events-none font-script max-w-[16ch] text-center lg:text-left [text-wrap:balance] text-8xl">
              {t('title')}
            </h1>
            <p className="pointer-events-none text-white/90 text-lg tracking-tight">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Right: content sections */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-[28vh] min-h-[180px] lg:h-auto">
            <Card
              label={t('corporate.label')}
              src="/restaurante-le-chandelier-2.webp"
              alt={t('corporate.title')}
              onClick={() => openModal("corporate")}
            />
          </div>
          <div className="relative h-[24vh] min-h-[160px] lg:h-auto">
            <Card
              label={t('celebrations.label')}
              src="/filler-image-2.png"
              alt={t('celebrations.title')}
              onClick={() => openModal("celebrations")}
            />
          </div>
          <div className="relative h-[24vh] min-h-[160px] lg:h-auto">
            <Card
              label={t('privateParties.label')}
              src="/restaurante-le-chandelier-2.webp"
              alt={t('privateParties.title')}
              onClick={() => openModal("privateParties")}
            />
          </div>
          <div className="relative h-[24vh] min-h-[160px] lg:h-auto">
            <Card
              label={t('specialOccasions.label')}
              src="/restaurante-le-chandelier-2.webp"
              alt={t('specialOccasions.title')}
              onClick={() => openModal("specialOccasions")}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <EventModal
        isOpen={selectedEvent === "corporate"}
        onClose={closeModal}
        title={t('corporate.title')}
        content={getEventContent('corporate')}
        closeLabel={t('closeModal')}
      />
      <EventModal
        isOpen={selectedEvent === "celebrations"}
        onClose={closeModal}
        title={t('celebrations.title')}
        content={getEventContent('celebrations')}
        closeLabel={t('closeModal')}
      />
      <EventModal
        isOpen={selectedEvent === "privateParties"}
        onClose={closeModal}
        title={t('privateParties.title')}
        content={getEventContent('privateParties')}
        closeLabel={t('closeModal')}
      />
      <EventModal
        isOpen={selectedEvent === "specialOccasions"}
        onClose={closeModal}
        title={t('specialOccasions.title')}
        content={getEventContent('specialOccasions')}
        closeLabel={t('closeModal')}
      />
    </section>
  );
}