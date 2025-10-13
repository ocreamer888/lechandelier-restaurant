"use client";

import { useState, useRef, useEffect, useCallback, useMemo, Dispatch, SetStateAction } from "react";

// Barrel Guest Picker Component
function BarrelGuestPicker({ 
  value, 
  onChange 
}: { 
  value: number; 
  onChange: (guests: number) => void;
}) {
  // Guest range: 1-20
  const guests = Array.from({ length: 20 }, (_, i) => i + 1);
  
  const [selectedGuest, setSelectedGuest] = useState(value || 2);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const guestRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const ITEM_HEIGHT = 48;

  useEffect(() => {
    onChange(selectedGuest);
  }, [selectedGuest, onChange]);

  // Initialize scroll position to default (2 guests)
  useEffect(() => {
    if (guestRef.current) {
      const initialIndex = value ? value - 1 : 1; // Default to 2 guests (index 1)
      guestRef.current.scrollTop = initialIndex * ITEM_HEIGHT;
    }
  }, [value]);

  const getItemStyle = (container: HTMLDivElement | null, index: number) => {
    if (!container) return { opacity: 0.3, scale: 0.8, rotateX: 0 };
    
    const scrollTop = container.scrollTop;
    const itemOffset = index * ITEM_HEIGHT;
    const centerOffset = scrollTop + (container.clientHeight / 2) - (ITEM_HEIGHT / 2);
    const distance = Math.abs(itemOffset - centerOffset);
    const maxDistance = ITEM_HEIGHT * 1.5;
    
    // Calculate how close the item is to center (0 = at center, 1 = far away)
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    
    // Smooth opacity transition
    const opacity = 1 - (normalizedDistance * 0.7);
    
    // Smooth scale transition
    const scale = 1.1 - (normalizedDistance * 0.3);
    
    // 3D rotation for barrel effect
    const rotateX = (itemOffset - centerOffset) / ITEM_HEIGHT * 10;
    
    return {
      opacity: Math.max(opacity, 0.2),
      scale: Math.max(scale, 0.8),
      rotateX: Math.max(Math.min(rotateX, 15), -15)
    };
  };

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    setIsScrolling(true);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Debounce the snap
    scrollTimeoutRef.current = setTimeout(() => {
      const scrollTop = container.scrollTop;
      const index = Math.round(scrollTop / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, guests.length - 1));
      
      // Smooth scroll to snapped position
      container.scrollTo({
        top: clampedIndex * ITEM_HEIGHT,
        behavior: 'smooth'
      });
      
      setSelectedGuest(guests[clampedIndex]);
      setIsScrolling(false);
    }, 100);
  }, [guests]);

  return (
    <div className="relative w-full px-6 py-4 bg-transparent border border-white/10 rounded-2xl overflow-hidden">
      {/* Label */}
      <div className="absolute top-2 left-6 text-xs text-white/40 pointer-events-none z-20">
        Guests
      </div>

      {/* Barrel Container */}
      <div className="flex items-center justify-center mt-4">
        {/* Guests Barrel */}
        <div className="relative h-32 w-full" style={{ perspective: '1000px' }}>
          {/* Top gradient fade */}
          <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none z-10" />
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
          
          {/* Selection highlight */}
          <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 bg-white/5 rounded-lg pointer-events-none z-10 transition-all duration-300" />
          <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 border-y border-white/20 pointer-events-none z-10" />
          
          {/* Scrollable guests */}
          <div
            ref={guestRef}
            onScroll={handleScroll}
            className="h-full overflow-y-scroll scrollbar-hide"
            style={{ 
              scrollSnapType: 'y mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="h-10" />
            {guests.map((guest, index) => {
              const style = getItemStyle(guestRef.current, index);
              return (
                <div
                  key={guest}
                  className="h-12 flex items-center justify-center text-white text-2xl font-light select-none"
                  style={{ 
                    scrollSnapAlign: 'center',
                    opacity: style.opacity,
                    transform: `scale(${style.scale}) rotateX(${style.rotateX}deg)`,
                    transition: isScrolling 
                      ? 'opacity 0.15s ease-out, transform 0.15s ease-out' 
                      : 'opacity 0.3s ease-out, transform 0.3s ease-out',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {guest}
                </div>
              );
            })}
            <div className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Barrel Date Picker Component
function BarrelDatePicker({ 
  onChange 
}: { 
  value: string; 
  onChange: (date: string) => void;
}) {
  // Generate next 90 days of dates - memoized to avoid regenerating on every render
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
  
  // Format date for display: "Mon, Jan 15"
  const formatDateDisplay = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  // Format date for form value: "YYYY-MM-DD"
  const formatDateValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const dateRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const ITEM_HEIGHT = 48;

  useEffect(() => {
    onChange(formatDateValue(selectedDate));
  }, [selectedDate, onChange]);

  // Initialize scroll position on mount
  useEffect(() => {
    if (dateRef.current) {
      // Start at first date (today) by default
      dateRef.current.scrollTop = 0;
    }
  }, []);

  const getItemStyle = (container: HTMLDivElement | null, index: number) => {
    if (!container) return { opacity: 0.3, scale: 0.8, rotateX: 0 };
    
    const scrollTop = container.scrollTop;
    const itemOffset = index * ITEM_HEIGHT;
    const centerOffset = scrollTop + (container.clientHeight / 2) - (ITEM_HEIGHT / 2);
    const distance = Math.abs(itemOffset - centerOffset);
    const maxDistance = ITEM_HEIGHT * 1.5;
    
    // Calculate how close the item is to center (0 = at center, 1 = far away)
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    
    // Smooth opacity transition
    const opacity = 1 - (normalizedDistance * 0.7);
    
    // Smooth scale transition
    const scale = 1.1 - (normalizedDistance * 0.3);
    
    // 3D rotation for barrel effect
    const rotateX = (itemOffset - centerOffset) / ITEM_HEIGHT * 10;
    
    return {
      opacity: Math.max(opacity, 0.2),
      scale: Math.max(scale, 0.8),
      rotateX: Math.max(Math.min(rotateX, 15), -15)
    };
  };

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    setIsScrolling(true);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Debounce the snap
    scrollTimeoutRef.current = setTimeout(() => {
      const scrollTop = container.scrollTop;
      const index = Math.round(scrollTop / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, dates.length - 1));
      
      // Smooth scroll to snapped position
      container.scrollTo({
        top: clampedIndex * ITEM_HEIGHT,
        behavior: 'smooth'
      });
      
      setSelectedDate(dates[clampedIndex]);
      setIsScrolling(false);
    }, 100);
  }, [dates]);

  return (
    <div className="relative w-full px-6 py-4 bg-transparent border border-white/10 rounded-2xl overflow-hidden">
      {/* Label */}
      <div className="absolute top-2 left-6 text-xs text-white/40 pointer-events-none z-20">
        Date
      </div>

      {/* Barrel Container */}
      <div className="flex items-center justify-center mt-4">
        {/* Dates Barrel */}
        <div className="relative h-32 w-full" style={{ perspective: '1000px' }}>
          {/* Top gradient fade */}
          <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none z-10" />
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
          
          {/* Selection highlight */}
          <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 bg-white/5 rounded-lg pointer-events-none z-10 transition-all duration-300" />
          <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 border-y border-white/20 pointer-events-none z-10" />
          
          {/* Scrollable dates */}
          <div
            ref={dateRef}
            onScroll={handleScroll}
            className="h-full overflow-y-scroll scrollbar-hide"
            style={{ 
              scrollSnapType: 'y mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="h-10" />
            {dates.map((date, index) => {
              const style = getItemStyle(dateRef.current, index);
              return (
                <div
                  key={formatDateValue(date)}
                  className="h-12 flex items-center justify-center text-white text-lg font-light select-none"
                  style={{ 
                    scrollSnapAlign: 'center',
                    opacity: style.opacity,
                    transform: `scale(${style.scale}) rotateX(${style.rotateX}deg)`,
                    transition: isScrolling 
                      ? 'opacity 0.15s ease-out, transform 0.15s ease-out' 
                      : 'opacity 0.3s ease-out, transform 0.3s ease-out',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {formatDateDisplay(date)}
                </div>
              );
            })}
            <div className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Barrel Time Picker Component
function BarrelTimePicker({ 
  onChange 
}: { 
  value: string; 
  onChange: (time: string) => void;
}) {
  // Restaurant hours: 18:00 - 22:30
  const hours = Array.from({ length: 5 }, (_, i) => 18 + i); // 18-22
  const minutes = ['00', '15', '30', '45'];
  
  const [selectedHour, setSelectedHour] = useState(hours[0]);
  const [selectedMinute, setSelectedMinute] = useState(minutes[0]);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const ITEM_HEIGHT = 48;

  useEffect(() => {
    onChange(`${selectedHour}:${selectedMinute}`);
  }, [selectedHour, selectedMinute, onChange]);

  // Initialize scroll positions
  useEffect(() => {
    if (hourRef.current) {
      hourRef.current.scrollTop = 0;
    }
    if (minuteRef.current) {
      minuteRef.current.scrollTop = 0;
    }
  }, []);

  const getItemStyle = (container: HTMLDivElement | null, index: number) => {
    if (!container) return { opacity: 0.3, scale: 0.8, rotateX: 0 };
    
    const scrollTop = container.scrollTop;
    const itemOffset = index * ITEM_HEIGHT;
    const centerOffset = scrollTop + (container.clientHeight / 2) - (ITEM_HEIGHT / 2);
    const distance = Math.abs(itemOffset - centerOffset);
    const maxDistance = ITEM_HEIGHT * 1.5;
    
    // Calculate how close the item is to center (0 = at center, 1 = far away)
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    
    // Smooth opacity transition
    const opacity = 1 - (normalizedDistance * 0.7);
    
    // Smooth scale transition
    const scale = 1.1 - (normalizedDistance * 0.3);
    
    // 3D rotation for barrel effect
    const rotateX = (itemOffset - centerOffset) / ITEM_HEIGHT * 10;
    
    return {
      opacity: Math.max(opacity, 0.2),
      scale: Math.max(scale, 0.8),
      rotateX: Math.max(Math.min(rotateX, 15), -15)
    };
  };

  const handleScroll = useCallback((
    e: React.UIEvent<HTMLDivElement>,
    items: (number | string)[],
    setSelected: Dispatch<SetStateAction<number>> | Dispatch<SetStateAction<string>>
  ) => {
    const container = e.currentTarget;
    setIsScrolling(true);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Debounce the snap
    scrollTimeoutRef.current = setTimeout(() => {
      const scrollTop = container.scrollTop;
      const index = Math.round(scrollTop / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
      
      // Smooth scroll to snapped position
      container.scrollTo({
        top: clampedIndex * ITEM_HEIGHT,
        behavior: 'smooth'
      });
      
      setSelected(items[clampedIndex] as never);
      setIsScrolling(false);
    }, 100);
  }, []);

  return (
    <div className="relative w-full px-6 bg-transparent border border-white/10 rounded-2xl overflow-hidden">
      {/* Label */}
      <div className="absolute top-2 left-6 text-xs text-white/40 pointer-events-none z-20">
        Time
      </div>

      {/* Barrel Container */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {/* Hours Barrel */}
        <div className="relative h-32 w-20" style={{ perspective: '1000px' }}>
          {/* Top gradient fade */}
          <div className="absolute top-0 left-0 right-0 h-10 pointer-events-none z-10" />
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
          
          {/* Selection highlight */}
          <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 bg-white/5 rounded-lg pointer-events-none z-10 transition-all duration-300" />
          <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 border-y border-white/20 pointer-events-none z-10" />
          
          {/* Scrollable hours */}
          <div
            ref={hourRef}
            onScroll={(e) => handleScroll(e, hours, setSelectedHour)}
            className="h-full overflow-y-scroll scrollbar-hide"
            style={{ 
              scrollSnapType: 'y mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="h-10" />
            {hours.map((hour, index) => {
              const style = getItemStyle(hourRef.current, index);
              return (
                <div
                  key={hour}
                  className="h-12 flex items-center justify-center text-white text-2xl font-light select-none"
                  style={{ 
                    scrollSnapAlign: 'center',
                    opacity: style.opacity,
                    transform: `scale(${style.scale}) rotateX(${style.rotateX}deg)`,
                    transition: isScrolling 
                      ? 'opacity 0.15s ease-out, transform 0.15s ease-out' 
                      : 'opacity 0.3s ease-out, transform 0.3s ease-out',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {hour.toString().padStart(2, '0')}
                </div>
              );
            })}
            <div className="h-10" />
          </div>
        </div>

        {/* Separator */}
        <div className="text-white text-2xl font-light mb-1 select-none">:</div>

        {/* Minutes Barrel */}
        <div className="relative h-32 w-20" style={{ perspective: '1000px' }}>
          {/* Top gradient fade */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
          
          {/* Selection highlight */}
          <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 bg-white/5 rounded-lg pointer-events-none z-10 transition-all duration-300" />
          <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 border-y border-white/20 pointer-events-none z-10" />
          
          {/* Scrollable minutes */}
          <div
            ref={minuteRef}
            onScroll={(e) => handleScroll(e, minutes, setSelectedMinute)}
            className="h-full overflow-y-scroll scrollbar-hide"
            style={{ 
              scrollSnapType: 'y mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="h-10" />
            {minutes.map((minute, index) => {
              const style = getItemStyle(minuteRef.current, index);
              return (
                <div
                  key={minute}
                  className="h-12 flex items-center justify-center text-white text-2xl font-light select-none"
                  style={{ 
                    scrollSnapAlign: 'center',
                    opacity: style.opacity,
                    transform: `scale(${style.scale}) rotateX(${style.rotateX}deg)`,
                    transition: isScrolling 
                      ? 'opacity 0.15s ease-out, transform 0.15s ease-out' 
                      : 'opacity 0.3s ease-out, transform 0.3s ease-out',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {minute}
                </div>
              );
            })}
            <div className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReservationSection() {
  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimeChange = useCallback((time: string) => {
    setFormData(prev => ({
      ...prev,
      time: time,
    }));
  }, []);

  const handleGuestChange = useCallback((guests: number) => {
    setFormData(prev => ({
      ...prev,
      guests: guests,
    }));
  }, []);

  const handleDateChange = useCallback((date: string) => {
    setFormData(prev => ({
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 bg-transparent border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 bg-transparent border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 bg-transparent border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
          />

          {/* Guests, Date, Time - Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Barrel Guest Picker */}
            <div className="sm:col-span-1">
              <BarrelGuestPicker 
                value={formData.guests} 
                onChange={handleGuestChange}
              />
            </div>
            
            {/* Barrel Date Picker */}
            <div className="sm:col-span-1">
              <BarrelDatePicker 
                value={formData.date} 
                onChange={handleDateChange}
              />
            </div>
            
            {/* Barrel Time Picker */}
            <div className="sm:col-span-1">
              <BarrelTimePicker 
                value={formData.time} 
                onChange={handleTimeChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-[#E8DCC8] hover:bg-[#f0e6d6] text-black font-medium tracking-[0.15em] rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            RESERVE
          </button>
        </form>
      </div>
    </section>
  );
}
