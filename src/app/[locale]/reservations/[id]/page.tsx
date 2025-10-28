"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Calendar, Clock, Users, CheckCircle, XCircle } from "lucide-react";
import NavBar2 from "@/components/NavBar2";
import type { ReservationRecord } from "@/types/reservation";
import { useTranslations, useLocale } from 'next-intl';

export default function ReservationPage() {
  const t = useTranslations('reservation.view');
  const locale = useLocale();
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [reservation, setReservation] = useState<ReservationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchReservation = async () => {
      try {
        const response = await fetch(`/api/reservations/${id}`);
        const data = await response.json();

        if (data.success && data.reservation) {
          setReservation(data.reservation);
        } else {
          toast.error(t('notFound'));
          router.push(`/${locale}`);
        }
      } catch (error) {
        console.error("Error fetching reservation:", error);
        toast.error(t('loadError'));
        router.push(`/${locale}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id, router, t, locale]);

  const handleCancel = async () => {
    if (!reservation) return;

    if (!confirm(t('confirmCancel'))) {
      return;
    }

    setCancelling(true);

    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(t('cancelSuccess'));
        setReservation((prev) => (prev ? { ...prev, status: "cancelled" } : null));
      } else {
        toast.error(data.error || t('cancelError'));
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      toast.error(t('cancelError'));
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // ... rest of the utility functions remain same ...

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#E8DCC8] mx-auto mb-4" />
          <p className="text-white text-lg">{t('loading')}</p>
        </div>
      </main>
    );
  }

  if (!reservation) {
    return null;
  }
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "cancelled":
        return "text-red-400";
      case "confirmed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      default:
        return "text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "cancelled":
        return <XCircle className="w-6 h-6" />;
      case "confirmed":
        return <CheckCircle className="w-6 h-6" />;
      case "pending":
        return <Clock className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen">
      <NavBar2 />
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-script text-7xl md:text-8xl text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-white/70 text-lg">
            {t('bookingId')} <span className="font-mono text-[#E8DCC8]">{reservation.id.substring(0, 8)}</span>
          </p>
        </div>

        {/* Reservation Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden">
          {/* Status Banner */}
          <div className={`py-4 px-6 flex items-center justify-center gap-2 ${
            reservation.status === "cancelled" ? "bg-red-500/20" : "bg-green-500/20"
          }`}>
            <div className={getStatusColor(reservation.status)}>
              {getStatusIcon(reservation.status)}
            </div>
            <span className={`font-semibold text-lg uppercase ${getStatusColor(reservation.status)}`}>
              {t(`status.${reservation.status}`)}
            </span>
          </div>

          {/* Details */}
          <div className="p-8 md:p-12 space-y-6">
            {/* Guest Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3">
                {t('guestInfo')}
              </h2>
              {/* ... rest remains similar with translated labels ... */}
            </div>

            {/* Reservation Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3">
                {t('reservationDetails')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-white/90">
                  <Calendar className="w-5 h-5 text-[#E8DCC8]" />
                  <div>
                    <div className="text-sm text-white/60">{t('dateLabel')}</div>
                    <div className="font-medium">{formatDate(reservation.date)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Clock className="w-5 h-5 text-[#E8DCC8]" />
                  <div>
                    <div className="text-sm text-white/60">{t('timeLabel')}</div>
                    <div className="font-medium">{formatTime(reservation.time)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Users className="w-5 h-5 text-[#E8DCC8]" />
                  <div>
                    <div className="text-sm text-white/60">{t('guestsLabel')}</div>
                    <div className="font-medium">
                      {reservation.guests} {reservation.guests === 1 ? t('person') : t('people')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-sm text-white/50">
                <div>{t('created')} {new Date(reservation.created_at).toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')}</div>
                {reservation.updated_at !== reservation.created_at && (
                  <div>{t('updated')} {new Date(reservation.updated_at).toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')}</div>
                )}
              </div>
            </div>

            {/* Actions */}
            {reservation.status !== "cancelled" && (
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="flex-1 py-3 px-6 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded-full transition-all duration-300 border border-red-500/30 hover:border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {cancelling && <Loader2 className="w-5 h-5 animate-spin" />}
                  {cancelling ? t('cancelling') : t('cancelButton')}
                </button>
                <button
                  onClick={() => router.push(`/${locale}`)}
                  className="flex-1 py-3 px-6 bg-[#E8DCC8] hover:bg-[#f0e6d6] text-black font-medium rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  {t('returnHome')}
                </button>
              </div>
            )}

            {reservation.status === "cancelled" && (
              <div className="pt-6">
                <button
                  onClick={() => router.push(`/${locale}`)}
                  className="w-full py-3 px-6 bg-[#E8DCC8] hover:bg-[#f0e6d6] text-black font-medium rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  {t('returnHome')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            {t('additionalInfo')}
          </p>
          <p className="text-white/60 text-sm mt-2">
            {t('contactInfo')}
          </p>
        </div>
      </div>
    </main>
  );
}