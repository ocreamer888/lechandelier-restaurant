"use client";

import { useMemo } from "react";
import { useBarrelScroll } from "./useBarrelScroll";
import { BarrelContainer, ScrollableBarrel } from "./BarrelContainer";
import type { BarrelPickerProps } from "./types";

export function BarrelGuestPicker({ value, onChange }: BarrelPickerProps<number>) {
  // Guest range: 1-20
  const guests = useMemo(() => Array.from({ length: 20 }, (_, i) => i + 1), []);

  const { scrollRef, isScrolling, getItemStyle, handleScroll } = useBarrelScroll({
    items: guests,
    onChange,
    initialIndex: value ? value - 1 : 1, // Default to 2 guests (index 1)
  });

  return (
    <BarrelContainer label="Guests">
      <ScrollableBarrel scrollRef={scrollRef} onScroll={handleScroll} className="w-full">
        <div className="h-10" />
        {guests.map((guest, index) => {
          const style = getItemStyle(scrollRef.current, index);
          return (
            <div
              key={guest}
              className="h-12 flex items-center justify-center text-white text-2xl font-light select-none"
              style={{
                scrollSnapAlign: "center",
                opacity: style.opacity,
                transform: `scale(${style.scale}) rotateX(${style.rotateX}deg)`,
                transition: isScrolling
                  ? "opacity 0.15s ease-out, transform 0.15s ease-out"
                  : "opacity 0.3s ease-out, transform 0.3s ease-out",
                transformStyle: "preserve-3d",
              }}
            >
              {guest}
            </div>
          );
        })}
        <div className="h-10" />
      </ScrollableBarrel>
    </BarrelContainer>
  );
}

