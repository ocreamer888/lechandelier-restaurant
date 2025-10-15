"use client";

import { useMemo, useEffect, useState } from "react";
import { useBarrelScroll } from "./useBarrelScroll";
import { ScrollableBarrel } from "./BarrelContainer";
import type { BarrelPickerProps } from "./types";

export function BarrelTimePicker({ onChange }: BarrelPickerProps<string>) {
  // Restaurant hours: 18:00 - 22:30
  const hours = useMemo(() => Array.from({ length: 5 }, (_, i) => 18 + i), []); // 18-22
  const minutes = useMemo(() => ["00", "15", "30", "45"], []);

  const [selectedHour, setSelectedHour] = useState(hours[0]);
  const [selectedMinute, setSelectedMinute] = useState(minutes[0]);

  const hourScroll = useBarrelScroll({
    items: hours,
    onChange: setSelectedHour,
    initialIndex: 0,
  });

  const minuteScroll = useBarrelScroll({
    items: minutes,
    onChange: setSelectedMinute,
    initialIndex: 0,
  });

  useEffect(() => {
    onChange(`${selectedHour}:${selectedMinute}`);
  }, [selectedHour, selectedMinute, onChange]);

  return (
    <div className="relative w-full px-6 py-4 bg-transparent border border-white/10 rounded-2xl overflow-hidden">
      {/* Label */}
      <div className="absolute top-2 left-6 text-xs text-white/40 pointer-events-none z-20">
        Time
      </div>

      {/* Barrel Container */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {/* Hours Barrel */}
        <ScrollableBarrel scrollRef={hourScroll.scrollRef} onScroll={hourScroll.handleScroll} className="w-20">
          <div className="h-10" />
          {hours.map((hour, index) => {
            const style = hourScroll.getItemStyle(hourScroll.scrollRef.current, index);
            return (
              <div
                key={hour}
                className="h-12 flex items-center justify-center text-white text-2xl font-light select-none"
                style={{
                  scrollSnapAlign: "center",
                  opacity: style.opacity,
                  transform: `scale(${style.scale}) rotateX(${style.rotateX}deg)`,
                  transition: hourScroll.isScrolling
                    ? "opacity 0.15s ease-out, transform 0.15s ease-out"
                    : "opacity 0.3s ease-out, transform 0.3s ease-out",
                  transformStyle: "preserve-3d",
                }}
              >
                {hour.toString().padStart(2, "0")}
              </div>
            );
          })}
          <div className="h-10" />
        </ScrollableBarrel>

        {/* Separator */}
        <div className="text-white text-2xl font-light mb-1 select-none">:</div>

        {/* Minutes Barrel */}
        <ScrollableBarrel scrollRef={minuteScroll.scrollRef} onScroll={minuteScroll.handleScroll} className="w-20">
          <div className="h-10" />
          {minutes.map((minute, index) => {
            const style = minuteScroll.getItemStyle(minuteScroll.scrollRef.current, index);
            return (
              <div
                key={minute}
                className="h-12 flex items-center justify-center text-white text-2xl font-light select-none"
                style={{
                  scrollSnapAlign: "center",
                  opacity: style.opacity,
                  transform: `scale(${style.scale}) rotateX(${style.rotateX}deg)`,
                  transition: minuteScroll.isScrolling
                    ? "opacity 0.15s ease-out, transform 0.15s ease-out"
                    : "opacity 0.3s ease-out, transform 0.3s ease-out",
                  transformStyle: "preserve-3d",
                }}
              >
                {minute}
              </div>
            );
          })}
          <div className="h-10" />
        </ScrollableBarrel>
      </div>
    </div>
  );
}

