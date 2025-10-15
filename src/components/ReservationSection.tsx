"use client";
import { useState, useCallback } from "react";
import { ReservationForm } from "./Reservation";
import type { ReservationFormData } from "./Reservation";

export default function ReservationSection() {
  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState<ReservationFormData>({
    name: "",
    phone: "",
    email: "",
    guests: 2,
    date: getTodayDate(),
    time: "18:00",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation submitted:", formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimeChange = useCallback((time: string) => {
    setFormData((prev) => ({
      ...prev,
      time: time,
    }));
  }, []);

  const handleGuestChange = useCallback((guests: number) => {
    setFormData((prev) => ({
      ...prev,
      guests: guests,
    }));
  }, []);

  const handleDateChange = useCallback((date: string) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));
  }, []);

  return (
    <section className="relative h-full flex items-center justify-center mt-8 md:mt-0 px-4">
      {/* Dark background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-neutral-900/40 to-black/40 rounded-3xl border border-white/10 py-8" />
      {/* Content container */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Heading with decorative lines */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/30" />
          <h2 className="text-4xl md:text-5xl font-light mt-8 md:mt-0 tracking-[0.3em] text-white">
            RESERVATION
          </h2>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/30" />
        </div>
        {/* Subtitle */}
        <p className="text-center text-white/70 text-base md:text-lg mb-12 max-w-xl mx-auto">
          Secure your spot at Le Chandelier, where exceptional French-Swiss cuisine and a
          remarkable dining experience await.
        </p>
        {/* Form */}
        <ReservationForm
          formData={formData}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onGuestChange={handleGuestChange}
          onDateChange={handleDateChange}
          onTimeChange={handleTimeChange}
        />
      </div>
    </section>
  );
}
