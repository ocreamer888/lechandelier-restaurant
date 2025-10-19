"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Calendar, Clock, Users, Mail, Phone, CheckCircle, XCircle } from "lucide-react";
import NavBar2 from "@/components/NavBar2";
import type { ReservationRecord } from "@/types/reservation";

export default function ReservationPage() {
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
          toast.error("Reservation not found");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching reservation:", error);
        toast.error("Failed to load reservation");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id, router]);

  const handleCancel = async () => {
    if (!reservation) return;

    if (!confirm("Are you sure you want to cancel this reservation?")) {
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
        toast.success("Reservation cancelled successfully");
        setReservation((prev) => (prev ? { ...prev, status: "cancelled" } : null));
      } else {
        toast.error(data.error || "Failed to cancel reservation");
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString("en-US", {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
      case "pending":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
      case "pending":
        return <CheckCircle className="w-6 h-6" />;
      case "cancelled":
        return <XCircle className="w-6 h-6" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#E8DCC8] mx-auto mb-4" />
          <p className="text-white text-lg">Loading reservation...</p>
        </div>
      </main>
    );
  }

  if (!reservation) {
    return null;
  }

  return (
    <main className="min-h-screen">
      <NavBar2 />
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-script text-7xl md:text-8xl text-white mb-4">
            Your Reservation
          </h1>
          <p className="text-white/70 text-lg">
            Booking ID: <span className="font-mono text-[#E8DCC8]">{reservation.id.substring(0, 8)}</span>
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
              {reservation.status}
            </span>
          </div>

          {/* Details */}
          <div className="p-8 md:p-12 space-y-6">
            {/* Customer Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3">
                Guest Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-5 h-5 flex items-center justify-center text-[#E8DCC8]">
                    👤
                  </div>
                  <span>{reservation.name}</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Mail className="w-5 h-5 text-[#E8DCC8]" />
                  <a href={`mailto:${reservation.email}`} className="hover:text-[#E8DCC8] transition-colors">
                    {reservation.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Phone className="w-5 h-5 text-[#E8DCC8]" />
                  <a href={`tel:${reservation.phone}`} className="hover:text-[#E8DCC8] transition-colors">
                    {reservation.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Reservation Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white border-b border-white/10 pb-3">
                Reservation Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-white/90">
                  <Calendar className="w-5 h-5 text-[#E8DCC8]" />
                  <div>
                    <div className="text-sm text-white/60">Date</div>
                    <div className="font-medium">{formatDate(reservation.date)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Clock className="w-5 h-5 text-[#E8DCC8]" />
                  <div>
                    <div className="text-sm text-white/60">Time</div>
                    <div className="font-medium">{formatTime(reservation.time)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Users className="w-5 h-5 text-[#E8DCC8]" />
                  <div>
                    <div className="text-sm text-white/60">Guests</div>
                    <div className="font-medium">
                      {reservation.guests} {reservation.guests === 1 ? "person" : "people"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-sm text-white/50">
                <div>Created: {new Date(reservation.created_at).toLocaleString()}</div>
                {reservation.updated_at !== reservation.created_at && (
                  <div>Updated: {new Date(reservation.updated_at).toLocaleString()}</div>
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
                  {cancelling ? "Cancelling..." : "Cancel Reservation"}
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="flex-1 py-3 px-6 bg-[#E8DCC8] hover:bg-[#f0e6d6] text-black font-medium rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  Return Home
                </button>
              </div>
            )}

            {reservation.status === "cancelled" && (
              <div className="pt-6">
                <button
                  onClick={() => router.push("/")}
                  className="w-full py-3 px-6 bg-[#E8DCC8] hover:bg-[#f0e6d6] text-black font-medium rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  Return Home
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            If you have any questions about your reservation, please contact us directly.
          </p>
          <p className="text-white/60 text-sm mt-2">
            Phone: +1 (555) 123-4567 | Email: info@lechandelier.com
          </p>
        </div>
      </div>
    </main>
  );
}

