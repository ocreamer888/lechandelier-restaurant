"use client";

import { BarrelGuestPicker } from "./BarrelGuestPicker";
import { BarrelDatePicker } from "./BarrelDatePicker";
import { BarrelTimePicker } from "./BarrelTimePicker";
import type { ReservationFormData } from "./types";

interface ReservationFormProps {
  formData: ReservationFormData;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGuestChange: (guests: number) => void;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export function ReservationForm({
  formData,
  onSubmit,
  onInputChange,
  onGuestChange,
  onDateChange,
  onTimeChange,
}: ReservationFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={onInputChange}
        required
        className="w-full px-6 py-4 bg-transparent border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
      />

      {/* Phone */}
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={onInputChange}
        required
        className="w-full px-6 py-4 bg-transparent border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={onInputChange}
        required
        className="w-full px-6 py-4 bg-transparent border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
      />

      {/* Guests, Date, Time - Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Barrel Guest Picker */}
        <div className="sm:col-span-1">
          <BarrelGuestPicker value={formData.guests} onChange={onGuestChange} />
        </div>

        {/* Barrel Date Picker */}
        <div className="sm:col-span-1">
          <BarrelDatePicker value={formData.date} onChange={onDateChange} />
        </div>

        {/* Barrel Time Picker */}
        <div className="sm:col-span-1">
          <BarrelTimePicker value={formData.time} onChange={onTimeChange} />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-[#E8DCC8] hover:bg-[#f0e6d6] text-black font-medium tracking-[0.15em] rounded-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
      >
        RESERVE
      </button>
    </form>
  );
}

