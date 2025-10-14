import ReservationSection from "@/components/ReservationSection";
import Image from "next/image";
import NavBar2 from "@/components/NavBar2";

export default function ReservationsPage() {
  return (
    <main className="min-h-screen">
        <div className="grid items-center justify-center h-auto min-h-screen grid-cols-1 gap-4 p-2 md:p-4 lg:grid-cols-[1fr_600px]">
        <div className="relative h-[96vh] lg:h-full rounded-3xl overflow-hidden">
          <Image
            src="/filler-image-2.png"
            alt="Signature dish plated"
            fill
            priority
            className="object-cover"
          />
          <NavBar2 />
         <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex flex-col w-full h-full items-center justify-center lg:items-start lg:justify-end p-6 md:p-10">
            <h1 className="pointer-events-none font-script max-w-[16ch] text-center lg:text-left [text-wrap:balance] text-8xl">
              Book a Table
            </h1>
          </div>
        </div>
      <ReservationSection />
    </div>
    </main>
  );
}