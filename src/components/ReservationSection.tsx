"use client";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { ReservationForm } from "./Reservation/ReservationForm";
import type { ReservationFormData } from "./Reservation/types";
import { validateReservationForm } from "@/lib/validation";
import type { ReservationResponse } from "@/types/reservation";

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
    date: "", // Start with empty string to prevent hydration mismatch
    time: "18:00",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration mismatch by setting date only on client side
  useEffect(() => {
    setIsClient(true);
    const todayDate = getTodayDate();
    setFormData((prev) => ({
      ...prev,
      date: todayDate,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const validation = validateReservationForm(formData);
    if (!validation.isValid) {
      const errorMessage = validation.errors[0].message;
      toast.error(errorMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: ReservationResponse = await response.json();

      if (data.success && data.reservation) {
        toast.success("Reservation confirmed! Check your email for details.");
        
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: "",
          guests: 2,
          date: getTodayDate(),
          time: "18:00",
        });

        // Show booking ID
        setTimeout(() => {
          toast.info(`Booking ID: ${data.reservation!.id.substring(0, 8)}`, {
            duration: 5000,
          });
        }, 1000);
      } else {
        toast.error(data.error || "Failed to create reservation. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

  // Show loading state until client-side hydration is complete
  if (!isClient) {
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
            Loading...
          </p>
        </div>
      </section>
    );
  }

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
          isSubmitting={isSubmitting}
        />
      </div>
    </section>
  );
}
