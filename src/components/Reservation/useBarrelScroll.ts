import { useState, useRef, useCallback, useEffect } from "react";
import type { BarrelStyle } from "./types";

interface UseBarrelScrollOptions<T> {
  items: T[];
  onChange: (value: T) => void;
  itemHeight?: number;
  initialIndex?: number;
}

export function useBarrelScroll<T>({
  items,
  onChange,
  itemHeight = 48,
  initialIndex = 0,
}: UseBarrelScrollOptions<T>) {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Initialize scroll position
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = initialIndex * itemHeight;
    }
  }, [initialIndex, itemHeight]);

  const getItemStyle = useCallback(
    (container: HTMLDivElement | null, index: number): BarrelStyle => {
      if (!container) return { opacity: 0.3, scale: 0.8, rotateX: 0 };

      const scrollTop = container.scrollTop;
      const itemOffset = index * itemHeight;
      const centerOffset = scrollTop + container.clientHeight / 2 - itemHeight / 2;
      const distance = Math.abs(itemOffset - centerOffset);
      const maxDistance = itemHeight * 1.5;

      // Calculate how close the item is to center (0 = at center, 1 = far away)
      const normalizedDistance = Math.min(distance / maxDistance, 1);

      // Smooth opacity transition
      const opacity = 1 - normalizedDistance * 0.7;

      // Smooth scale transition
      const scale = 1.1 - normalizedDistance * 0.3;

      // 3D rotation for barrel effect
      const rotateX = ((itemOffset - centerOffset) / itemHeight) * 10;

      return {
        opacity: Math.max(opacity, 0.2),
        scale: Math.max(scale, 0.8),
        rotateX: Math.max(Math.min(rotateX, 15), -15),
      };
    },
    [itemHeight]
  );

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const container = e.currentTarget;
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce the snap
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollTop = container.scrollTop;
        const index = Math.round(scrollTop / itemHeight);
        const clampedIndex = Math.max(0, Math.min(index, items.length - 1));

        // Smooth scroll to snapped position
        container.scrollTo({
          top: clampedIndex * itemHeight,
          behavior: "smooth",
        });

        onChange(items[clampedIndex]);
        setIsScrolling(false);
      }, 100);
    },
    [items, onChange, itemHeight]
  );

  return {
    scrollRef,
    isScrolling,
    getItemStyle,
    handleScroll,
    itemHeight,
  };
}

