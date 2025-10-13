"use client";
import Image from "next/image";
import NavBar2 from "../NavBar2";
import { useState } from "react";

// Modal Component
function EventModal({
  isOpen,
  onClose,
  title,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
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
          aria-label="Close modal"
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

// Event content data
const eventContent = {
  corporate: {
    title: "Corporate Events",
    content: (
      <>
        <p>
          Host your next corporate gathering in an atmosphere of refined elegance.
          Le Chandelier provides the perfect setting for business meetings,
          company dinners, and professional celebrations.
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Customizable menu options for any dietary preference</li>
          <li>Private dining areas available</li>
          <li>Audio-visual equipment upon request</li>
          <li>Dedicated event coordinator</li>
        </ul>
        <p className="text-amber-400 font-semibold mt-6">
          Contact us to discuss your corporate event needs.
        </p>
      </>
    ),
  },
  celebrations: {
    title: "Celebrations",
    content: (
      <>
        <p>
          Mark life&apos;s special moments with an unforgettable dining experience.
          Whether it&apos;s a birthday, anniversary, or milestone achievement, we&apos;ll
          help you create lasting memories.
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Personalized menus and wine pairings</li>
          <li>Custom desserts and celebration cakes</li>
          <li>Decorative arrangements available</li>
          <li>Photography-friendly ambiance</li>
        </ul>
        <p className="text-amber-400 font-semibold mt-6">
          Let us make your celebration extraordinary.
        </p>
      </>
    ),
  },
  privateParties: {
    title: "Private Parties",
    content: (
      <>
        <p>
          Experience the ultimate in private dining with exclusive access to our
          beautifully appointed spaces. Perfect for intimate gatherings or larger
          celebrations with friends and family.
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Full venue or section buyouts available</li>
          <li>Customized menu planning with our chefs</li>
          <li>Premium bar service options</li>
          <li>Flexible timing and event duration</li>
        </ul>
        <p className="text-amber-400 font-semibold mt-6">
          Inquire about private party packages and availability.
        </p>
      </>
    ),
  },
  specialOccasions: {
    title: "Special Occasions",
    content: (
      <>
        <p>
          From engagement dinners to graduation celebrations, Le Chandelier
          specializes in making every special occasion truly memorable with
          attentive service and exceptional cuisine.
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Romantic ambiance for intimate occasions</li>
          <li>Special occasion tasting menus</li>
          <li>Sommelier recommendations</li>
          <li>Complimentary champagne toast options</li>
        </ul>
        <p className="text-amber-400 font-semibold mt-6">
          Reserve your special occasion experience today.
        </p>
      </>
    ),
  },
};

export default function EventsHero() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const openModal = (eventType: string) => {
    setSelectedEvent(eventType);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <section className="relative min-h-screen">
      <div className="grid h-auto min-h-screen grid-cols-1 gap-4 p-2 md:p-4 lg:grid-cols-[1fr_600px]">
        {/* Left: main contact image with overlay */}
        <div className="relative h-[96vh] lg:h-full rounded-3xl overflow-hidden">
          <Image
            src="/Chandelier.png"
            alt="Signature dish plated"
            fill
            priority
            className="object-cover"
          />
          <NavBar2 />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex flex-col w-full h-full items-center justify-center lg:items-start lg:justify-end p-6 md:p-10">
            <h1 className="pointer-events-none font-script max-w-[16ch] text-center lg:text-left [text-wrap:balance] text-8xl">
              Events
            </h1>
            <p className="pointer-events-none text-white/90 text-lg tracking-tight">
              Discover our events and activities.
            </p>
          </div>
        </div>

        {/* Right: content sections */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative h-[28vh] min-h-[180px] lg:h-auto">
            <Card
              label="Corporate"
              src="/restaurante-le-chandelier-2.webp"
              alt="Corporate events"
              onClick={() => openModal("corporate")}
            />
          </div>
          <div className="relative h-[24vh] min-h-[160px] lg:h-auto">
            <Card
              label="Celebrations"
              src="/filler-image-2.png"
              alt="Celebrations"
              onClick={() => openModal("celebrations")}
            />
          </div>
          <div className="relative h-[24vh] min-h-[160px] lg:h-auto">
            <Card
              label="Private Parties"
              src="/restaurante-le-chandelier-2.webp"
              alt="Private parties"
              onClick={() => openModal("privateParties")}
            />
          </div>
          <div className="relative h-[24vh] min-h-[160px] lg:h-auto">
            <Card
              label="Special Occasions"
              src="/restaurante-le-chandelier-2.webp"
              alt="Special occasions"
              onClick={() => openModal("specialOccasions")}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <EventModal
        isOpen={selectedEvent === "corporate"}
        onClose={closeModal}
        title={eventContent.corporate.title}
        content={eventContent.corporate.content}
      />
      <EventModal
        isOpen={selectedEvent === "celebrations"}
        onClose={closeModal}
        title={eventContent.celebrations.title}
        content={eventContent.celebrations.content}
      />
      <EventModal
        isOpen={selectedEvent === "privateParties"}
        onClose={closeModal}
        title={eventContent.privateParties.title}
        content={eventContent.privateParties.content}
      />
      <EventModal
        isOpen={selectedEvent === "specialOccasions"}
        onClose={closeModal}
        title={eventContent.specialOccasions.title}
        content={eventContent.specialOccasions.content}
      />
    </section>
  );
}