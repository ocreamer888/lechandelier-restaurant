import { Star } from "lucide-react";
const awards = [
    { title: "TRIP ADVISOR", subtitle: "BEST FRENCH RESTAURANT", location: "SAN JOSE" },
    { title: "MICHELIN GUIDE", subtitle: "BEST FRENCH RESTAURANT", location: "SAN JOSE" },
    { title: "STAR DINING", subtitle: "BEST FRENCH RESTAURANT", location: "SAN JOSE" },
  ];

export default function AwardsSection() {
    return (
<div className="container py-16 md:py-24">
<div className="grid md:grid-cols-3 grid-cols-1 gap-4">
{awards.map((award, index) => (
  <div
    key={index}
    className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-pink-100/20 to-pink-200/10 border border-white/20 p-6 flex flex-col items-center justify-center text-center"
  >
    {/* 5 Stars */}
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-yellow-500 text-yellow-500"
        />
      ))}
    </div>
    
    {/* Award Title */}
    <h3 className="text-white font-light text-sm md:text-base tracking-widest mb-2">
      {award.title}
    </h3>
    
    {/* Subtitle */}
    <p className="text-white/70 text-xs tracking-wide mb-1">
      {award.subtitle}
    </p>
    <p className="text-white/50 text-xs tracking-wide">
      {award.location}
    </p>
  </div>
))}
</div>
</div>
    );
}