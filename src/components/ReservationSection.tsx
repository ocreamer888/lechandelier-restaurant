"use client";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { ReservationForm } from "./Reservation/ReservationForm";
import type { ReservationFormData } from "./Reservation/types";
import { validateReservationForm } from "@/lib/validation";
import type { ReservationResponse } from "@/types/reservation";
import { useTranslations } from 'next-intl';

export default function ReservationSection() {
  const t = useTranslations('reservation');
  
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
    date: "",
    time: "18:00",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false);

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

      const contentType = response.headers.get("content-type") || "";
      let data: ReservationResponse | null = null;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || `HTTP ${response.status}`);
      }

      if (response.ok && data?.success && data.reservation) {
        toast.success(t('messages.success'));
        
        setFormData({
          name: "",
          phone: "",
          email: "",
          guests: 2,
          date: getTodayDate(),
          time: "18:00",
        });

        setTimeout(() => {
          toast.info(`${t('messages.bookingId')} ${data.reservation!.id.substring(0, 8)}`, {
            duration: 5000,
          });
        }, 1000);
      } else {
        toast.error(data?.error || data?.message || t('messages.error'));
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      toast.error(t('messages.unexpectedError'));
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

  if (!isClient) {
    return (
      <section className="relative h-full flex items-center justify-center mt-8 md:mt-0 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-neutral-900/40 to-black/40 rounded-3xl border border-white/10 py-8" />
        <div className="relative z-10 w-full max-w-2xl">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/30" />
            <h2 className="text-4xl md:text-5xl font-light mt-8 md:mt-0 tracking-[0.3em] text-white">
              {t('heading')}
            </h2>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/30" />
          </div>
          <p className="text-center text-white/70 text-base md:text-lg mb-12 max-w-xl mx-auto">
            {t('loading')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-full flex items-center justify-center mt-8 md:mt-0 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-neutral-900/40 to-black/40 rounded-3xl border border-white/10 py-8" />
      <div className="relative z-10 w-full max-w-2xl">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-white/30" />
          <h2 className="text-4xl md:text-5xl font-light mt-8 md:mt-0 tracking-[0.3em] text-white">
            {t('heading')}
          </h2>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-white/30" />
        </div>
        <p className="text-center text-white/70 text-base md:text-lg mb-12 max-w-xl mx-auto">
          {t('subtitle')}
        </p>
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