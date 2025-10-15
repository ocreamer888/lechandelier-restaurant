import { ReactNode } from "react";

interface BarrelContainerProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function BarrelContainer({ label, children, className = "" }: BarrelContainerProps) {
  return (
    <div className={`relative w-full px-6 py-4 bg-transparent border border-white/10 rounded-2xl overflow-hidden ${className}`}>
      {/* Label */}
      <div className="absolute top-2 left-6 text-xs text-white/40 pointer-events-none z-20">
        {label}
      </div>

      {/* Barrel Container */}
      <div className="flex items-center justify-center mt-4">
        {children}
      </div>
    </div>
  );
}

interface ScrollableBarrelProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  children: ReactNode;
  className?: string;
}

export function ScrollableBarrel({ scrollRef, onScroll, children, className = "" }: ScrollableBarrelProps) {
  return (
    <div className={`relative h-32 ${className}`} style={{ perspective: "1000px" }}>
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

      {/* Selection highlight */}
      <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 bg-white/5 rounded-lg pointer-events-none z-10 transition-all duration-300" />
      <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 border-y border-white/20 pointer-events-none z-10" />

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="h-full overflow-y-scroll scrollbar-hide"
        style={{
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
    </div>
  );
}

