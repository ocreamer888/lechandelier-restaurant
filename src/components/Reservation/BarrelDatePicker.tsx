"use client";

import { useMemo, useEffect, useState } from "react";
import { useBarrelScroll } from "./useBarrelScroll";
import { BarrelContainer, ScrollableBarrel } from "./BarrelContainer";
import type { BarrelPickerProps } from "./types";

// Format date for display: "Mon, Jan 15"
const formatDateDisplay = (date: Date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
};

// Format date for form value: "YYYY-MM-DD"
const formatDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function BarrelDatePicker({ onChange }: BarrelPickerProps<string>) {
  // Generate next 60 days of dates - memoized to avoid regenerating on every render
  const dates = useMemo(() => {
    const datesArray = [];
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      datesArray.push(date);
    }
    return datesArray;
  }, []);

  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const { scrollRef, isScrolling, getItemStyle, handleScroll } = useBarrelScroll({
    items: dates,
    onChange: setSelectedDate,
    initialIndex: 0,
  });

  useEffect(() => {
    onChange(formatDateValue(selectedDate));
  }, [selectedDate, onChange]);

  return (
    <BarrelContainer label="Date">
      <ScrollableBarrel scrollRef={scrollRef} onScroll={handleScroll} className="w-full">
        <div className="h-10" />
        {dates.map((date, index) => {
          const style = getItemStyle(scrollRef.current, index);
          return (
            <div
              key={formatDateValue(date)}
              className="h-12 flex items-center justify-center text-white text-lg font-light select-none"
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
              {formatDateDisplay(date)}
            </div>
          );
        })}
        <div className="h-10" />
      </ScrollableBarrel>
    </BarrelContainer>
  );
}

