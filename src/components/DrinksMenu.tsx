"use client";
import { useMemo, useState, useRef, useCallback, useEffect } from "react";

type Category = "Champagne & Sparkling" | "White Wines" | "Red Wines" | "Others";

type SubCategory = {
  name: string;
  items: Item[];
};

type Item = {
  id?: string;
  name: string;
  price: string;
};

interface BarrelStyle {
    opacity: number;
    scale: number;
    rotateY: number;
    isCentered?: boolean;
  }

// Fallback data
const FALLBACK_DATA: Record<Category, SubCategory[]> = {
  "Champagne & Sparkling": [
    {
      name: "All",
      items: [
        { id: "cs1", name: "Fredenet Cordon Negro", price: "₡35,000" },
        { id: "cs2", name: "Veuve Cliquot Brut", price: "₡104,550" },
        { id: "cs3", name: "Moet et Chandon", price: "₡115,620" },
        { id: "cs4", name: "Dom Perignon", price: "₡328,000" },
      ],
    },
  ],
  "White Wines": [
    {
      name: "Aromatic",
      items: [
        { id: "wa1", name: "Casillero del Diablo", price: "₡21,525" },
        { id: "wa2", name: "Casillero del Diablo Half Bottle", price: "₡11,435" },
        { id: "wa3", name: "Luigi Bosca", price: "₡33,032" },
        { id: "wa4", name: "Marques de Casa Concha", price: "₡35,000" },
        { id: "wa5", name: "Navarro Correas Private Collection", price: "₡24,600" },
        { id: "wa6", name: "Louis Jadot Chablis", price: "₡49,200" },
      ],
    },
    {
      name: "Sweet",
      items: [
        { id: "ws1", name: "Amelia", price: "₡83,025" },
        { id: "ws2", name: "Marques de Caceres Verdejo Rueda", price: "₡22,755" },
      ],
    },
    {
      name: "Smooth",
      items: [
        { id: "wm1", name: "Beringer White Zinfandel", price: "₡21,525" },
        { id: "wm2", name: "Sartori Villa Mura Pinot Grigio", price: "₡33,525" },
        { id: "wm3", name: "Canti", price: "₡23,985" },
        { id: "wm4", name: "A Vaca Cuca Albarino", price: "₡36,285" },
      ],
    },
  ],
  "Red Wines": [
    {
      name: "Smooth",
      items: [
        { id: "rs1", name: "Casillero del Diablo", price: "₡22,755" },
        { id: "rs2", name: "Marques de Casa Concha", price: "₡39,000" },
        { id: "rs3", name: "Luigi Bosca", price: "₡22,755" },
        { id: "rs4", name: "Don Melchor", price: "₡163,500" },
      ],
    },
    {
      name: "Noble",
      items: [
        { id: "rn1", name: "Navarro Correas Private Collection", price: "₡24,000" },
        { id: "rn2", name: "Luigi Bosca", price: "₡32,595" },
        { id: "rn3", name: "Las Perdices", price: "₡23,500" },
        { id: "rn4", name: "Reserva Las Perdices", price: "₡27,500" },
        { id: "rn5", name: "Gran Reserva Don Juan 90%", price: "₡43,665" },
      ],
    },
    {
      name: "Merlot",
      items: [
        { id: "rm1", name: "Casillero del Diablo", price: "₡22,755" },
        { id: "rm2", name: "Marques de Casa Concha", price: "₡38,000" },
        { id: "rm3", name: "Barton & Guestier St. Emilion", price: "₡43,665" },
      ],
    },
    {
      name: "Pinot Noir",
      items: [
        { id: "rp1", name: "Louis Jadot Bourgogne", price: "₡53,000" },
        { id: "rp2", name: "Marques de Caceres Gaudium", price: "₡195,000" },
      ],
    },
    {
      name: "Oak Aged",
      items: [
        { id: "ro1", name: "Viña Mayor Reserva D.O. Ribera del Duero", price: "₡63,345" },
        { id: "ro2", name: "Viña Mayor Crianza D.O. Ribera del Duero", price: "₡39,360" },
        { id: "ro3", name: "Marques de Caceres Crianza D.O.CA. Rioja", price: "₡39,360" },
        { id: "ro4", name: "Marques de Caceres Crianza Rioja Half Bottle", price: "₡16,065" },
        { id: "ro5", name: "Marques de Caceres Reserva D.O.C. Rioja", price: "₡47,355" },
        { id: "ro6", name: "Marques de Caceres Gran Reserva D.O.C. Rioja", price: "₡55,350" },
        { id: "ro7", name: "Le Gran Verdus Bordeaux", price: "₡19,680" },
      ],
    },
  ],
  "Others": [
    {
      name: "All",
      items: [
        { id: "o1", name: "House Wine Glass", price: "₡4,920" },
        { id: "o2", name: "Sangria Pitcher", price: "₡19,065" },
        { id: "o3", name: "Sangria Glass", price: "₡4,920" },
      ],
    },
  ],
};

function SectionOrnament({ text }: { text: string }) {
  return (
    <div className="my-8 flex items-center justify-center font-script gap-4">
      <span className="h-px w-16 bg-white/15" />
      <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
      <h2 className="text-center text-white text-5xl md:text-6xl">{text}</h2>
      <span className="h-[3px] w-[3px] rounded-full bg-white/25" />
      <span className="h-px w-16 bg-white/15" />
    </div>
  );
}

function SubCategoryBarrel({ 
    subcategories, 
    activeIndex, 
    onSubCategoryChange 
  }: { 
    subcategories: SubCategory[]; 
    activeIndex: number;
    onSubCategoryChange: (index: number) => void;
  }) {
    const [isScrolling, setIsScrolling] = useState(false);
    const [, forceUpdate] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const itemWidth = 180;
  
    // Initialize scroll position on mount and when activeIndex changes
    useEffect(() => {
      if (scrollRef.current) {
        const targetScroll = activeIndex * itemWidth;
        scrollRef.current.scrollLeft = targetScroll;
        // Small delay to ensure DOM is ready, then force re-render
        setTimeout(() => {
          forceUpdate(prev => prev + 1);
        }, 50);
      }
    }, [activeIndex, itemWidth]);
  
    const getItemStyle = useCallback(
        (container: HTMLDivElement | null, index: number): BarrelStyle => {
          if (!container) return { opacity: 1, scale: 1.2, rotateY: 0, isCentered: false };
      
          const scrollLeft = container.scrollLeft;
          const paddingWidth = container.clientWidth / 2 - itemWidth / 2; // Calculate actual padding
          const itemOffset = paddingWidth + (index * itemWidth); // ← ADD PADDING HERE
          const centerOffset = scrollLeft + container.clientWidth / 2 - itemWidth / 2;
          const distance = Math.abs(itemOffset - centerOffset);
          const maxDistance = itemWidth * 1.5;
  
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        
        // Increase threshold to 30px for better detection
        const isCentered = distance < 30;
        
        // Full opacity for centered item, minimum 0.2 for others
        const opacity = isCentered ? 1.0 : Math.max(1 - normalizedDistance * 0.8, 0.2);
        
        // Larger scale for centered item
        const scale = isCentered ? 1.15 : Math.max(1.0 - normalizedDistance * 0.2, 0.8);
        
        // 3D rotation effect
        const rotateY = ((itemOffset - centerOffset) / itemWidth) * 15;
  
        return {
          opacity,
          scale,
          rotateY: Math.max(Math.min(rotateY, 20), -20),
          isCentered,
        };
      },
      [itemWidth]
    );
  
    const handleScroll = useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        setIsScrolling(true);
        forceUpdate(prev => prev + 1); // Force re-render to update styles
  
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
  
        scrollTimeoutRef.current = setTimeout(() => {
          const scrollLeft = container.scrollLeft;
          const index = Math.round(scrollLeft / itemWidth);
          const clampedIndex = Math.max(0, Math.min(index, subcategories.length - 1));
  
          container.scrollTo({
            left: clampedIndex * itemWidth,
            behavior: "smooth",
          });
  
          onSubCategoryChange(clampedIndex);
          setIsScrolling(false);
        }, 100);
      },
      [subcategories.length, onSubCategoryChange, itemWidth]
    );
  
    const handleItemClick = useCallback(
      (index: number) => {
        if (scrollRef.current) {
          const targetScroll = index * itemWidth;
          scrollRef.current.scrollTo({
            left: targetScroll,
            behavior: "smooth",
          });
          onSubCategoryChange(index);
        }
      },
      [onSubCategoryChange, itemWidth]
    );
  
    // Only show barrel if there are multiple subcategories
    if (subcategories.length <= 1) return null;
  
    return (
      <div className="relative w-full max-w-2xl mx-auto mb-12 bg-transparent border border-white/20 rounded-full overflow-hidden">
  
        <div className="relative h-14" style={{ perspective: "1200px" }}>
  
          {/* Scrollable content */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full overflow-x-scroll scrollbar-hide flex items-center"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Left padding to center first item */}
            <div style={{ width: "calc(50% - 90px)", minWidth: "120px" }} className="flex-shrink-0" />
            
            {subcategories.map((sub, index) => {
  const style = getItemStyle(scrollRef.current, index);
  const isCentered = index === activeIndex;  
  return (
    <button
      key={index}
      onClick={() => handleItemClick(index)}
      className="flex-shrink-0 flex items-center justify-center text-white/40 text-lg font-light select-none px-4 cursor-pointer transition-colors duration-200"
      style={{
        width: `${itemWidth}px`,
        scrollSnapAlign: "center",
        opacity: style.opacity,
        transform: `scale(${style.scale}) rotateY(${style.rotateY}deg)`,
        transition: isScrolling
          ? "opacity 0.15s ease-out, transform 0.15s ease-out"
          : "opacity 0.3s ease-out, transform 0.3s ease-out",
        transformStyle: "preserve-3d",
      }}
      aria-pressed={isCentered}
    >
      <span className={`transition-colors duration-200 ${isCentered ? 'text-pink-100 font-medium' : 'hover:text-pink-100/80'}`}>
        {sub.name}
      </span>
    </button>
  );
})}
            
            {/* Right padding to center last item */}
            <div style={{ width: "calc(50% - 90px)", minWidth: "120px" }} className="flex-shrink-0" />
          </div>
        </div>
      </div>
    );
  }

type DrinksMenuProps = {
  data?: Record<Category, SubCategory[]>;
};

export default function DrinksMenu({ data }: DrinksMenuProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("Champagne & Sparkling");
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  
  // Use provided data or fallback to hardcoded data
  const menuData = data || FALLBACK_DATA;
  
  const subcategories = useMemo(() => menuData[activeCategory] ?? [], [activeCategory, menuData]);
  const currentItems = useMemo(() => {
    const items = subcategories[activeSubIndex]?.items ?? [];
    // Add ids if they don't exist
    return items.map((item, idx) => ({
      ...item,
      id: item.id || `${activeCategory}-${activeSubIndex}-${idx}`,
    }));
  }, [subcategories, activeSubIndex, activeCategory]);

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setActiveSubIndex(0); // Reset to first subcategory when category changes
  };

  return (
    <section className="bg-gradient-to-b from-transparent via-black/20 to-transparent text-white py-8" id="drinks-menu">
      <div className="mx-auto w-full max-w-5xl px-4 lg:px-8">
        {/* Category Buttons */}
        <div className="flex flex-col items-center justify-around overflow-hidden rounded-full border border-white/20">
          <div
            className="py-4 px-8 w-full overflow-x-auto scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex flex-row justify-around w-full items-center gap-2 py-2 whitespace-nowrap snap-x snap-mandatory">
              {(["Champagne & Sparkling", "White Wines", "Red Wines", "Others"] as Category[]).map((c) => (
                <button
                  key={c}
                  onClick={() => handleCategoryChange(c)}
                  className={`flex-shrink-0 snap-center rounded-full border px-12 py-2 text-sm transition ${
                    activeCategory === c
                      ? "border-white/20 bg-pink-200/40 text-white"
                      : "border-white/10 bg-pink-200/10 text-white/80 hover:bg-pink-200/20"
                  }`}
                  aria-pressed={activeCategory === c}
                >
                  {c.toUpperCase()}
                  
                </button>
              ))}
            </div>
          </div>
        </div>

        <SectionOrnament text={activeCategory} />

        {/* Horizontal Barrel SubCategory Picker */}
        <SubCategoryBarrel 
          subcategories={subcategories}
          activeIndex={activeSubIndex}
          onSubCategoryChange={setActiveSubIndex}
        />

        {/* Items List */}
        <div className="space-y-2 mt-8">
          <ul className="space-y-2">
            {currentItems.map((it) => (
              <li key={it.id} className="flex justify-between rounded-full bg-pink-100/20 border border-white/10 px-4 py-3 transition-all duration-300 hover:bg-pink-100/30">
                <span className="text-white/90">{it.name}</span>
                <span className="whitespace-nowrap text-white/90 font-medium">{it.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}