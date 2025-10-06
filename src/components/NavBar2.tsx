import Link from "next/link";
import NeumorphicButton from "@/components/Neumorphic-Button";

const links = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
];

export default function NavBar2() {
  return (
    <header className={`relative lg:absolute rounded-full z-50 transition-all backdrop-blur bg-black/20 border-b border-black/10 m-4`}>
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4 py-2">
          {/* Center: Brand */}
          <div className="justify-self-center">
            <Link
              href="/"
              className={`rounded-full px-3 py-[6px] text-xl font-script text-pink-100`}
            >
              Le Chandelier
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-center gap-3 py-2 rounded-full bg-black/40">
            <nav className="flex items-center gap-6 text-sm">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-white/90 hover:text-white transition-colors`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          {/* Right: Book a table */}
          <div className="flex items-center justify-center">
            <NeumorphicButton 
            href="#reservation" 
            ariaLabel="Book a table">Book a table</NeumorphicButton>
          </div>
        </div>
      </div>
    </header>
  );
}