import Image from "next/image";
import SectionHeading from "./SectionHeading";

export default function DrinksSection() {
  return (
    <section className="section" id="drinks">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <SectionHeading
            title="Drinks"
            subtitle="An exquisite selection of champagnes and fine wines from around the world."
          />

          {/* Champagne & Sparkling Wines */}
          <h3 className="mt-8 text-5xl font-script">Champagne & Sparkling</h3>
          <ul className="mt-4 space-y-2 text-lg">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Fredenet Cordon Negro</span>
              <span className="whitespace-nowrap">₡35,000</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Veuve Cliquot Brut</span>
              <span className="whitespace-nowrap">₡104,550</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Moet et Chandon</span>
              <span className="whitespace-nowrap">₡115,620</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Dom Perignon</span>
              <span className="whitespace-nowrap">₡328,000</span>
            </li>
          </ul>

          {/* White Wines */}
          <h3 className="mt-10 text-5xl font-script">White Wines</h3>
          
          <h4 className="mt-6 text-2xl font-semibold text-pink-200/80">Aromatic</h4>
          <ul className="mt-3 space-y-2 text-lg">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Casillero del Diablo</span>
              <span className="whitespace-nowrap">₡21,525</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Casillero del Diablo Half Bottle</span>
              <span className="whitespace-nowrap">₡11,435</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Luigi Bosca</span>
              <span className="whitespace-nowrap">₡33,032</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Marques de Casa Concha</span>
              <span className="whitespace-nowrap">₡35,000</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Navarro Correas Private Collection</span>
              <span className="whitespace-nowrap">₡24,600</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Louis Jadot Chablis</span>
              <span className="whitespace-nowrap">₡49,200</span>
            </li>
          </ul>

          <h4 className="mt-6 text-2xl font-semibold text-pink-200/80">Sweet</h4>
          <ul className="mt-3 space-y-2 text-lg">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Amelia</span>
              <span className="whitespace-nowrap">₡83,025</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Marques de Caceres Verdejo Rueda</span>
              <span className="whitespace-nowrap">₡22,755</span>
            </li>
          </ul>

          <h4 className="mt-6 text-2xl font-semibold text-pink-200/80">Smooth</h4>
          <ul className="mt-3 space-y-2 text-lg">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Beringer White Zinfandel</span>
              <span className="whitespace-nowrap">₡21,525</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Sartori Villa Mura Pinot Grigio</span>
              <span className="whitespace-nowrap">₡33,525</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Canti</span>
              <span className="whitespace-nowrap">₡23,985</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>A Vaca Cuca Albarino</span>
              <span className="whitespace-nowrap">₡36,285</span>
            </li>
          </ul>

          {/* Red Wines */}
          <h3 className="mt-10 text-5xl font-script">Red Wines</h3>
          
          <h4 className="mt-6 text-2xl font-semibold text-pink-200/80">Smooth</h4>
          <ul className="mt-3 space-y-2 text-lg">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Casillero del Diablo</span>
              <span className="whitespace-nowrap">₡22,755</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Marques de Casa Concha</span>
              <span className="whitespace-nowrap">₡39,000</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Luigi Bosca</span>
              <span className="whitespace-nowrap">₡22,755</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Don Melchor</span>
              <span className="whitespace-nowrap">₡163,500</span>
            </li>
          </ul>

          <h4 className="mt-6 text-2xl font-semibold text-pink-200/80">Noble</h4>
          <ul className="mt-3 space-y-2 text-lg">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Navarro Correas Private Collection</span>
              <span className="whitespace-nowrap">₡24,000</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Luigi Bosca</span>
              <span className="whitespace-nowrap">₡32,595</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Las Perdices</span>
              <span className="whitespace-nowrap">₡23,500</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Reserva Las Perdices</span>
              <span className="whitespace-nowrap">₡27,500</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Gran Reserva Don Juan 90%</span>
              <span className="whitespace-nowrap">₡43,665</span>
            </li>
          </ul>

          <h4 className="mt-6 text-2xl font-semibold text-pink-200/80">Merlot</h4>
          <ul className="mt-3 space-y-2 text-lg">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Casillero del Diablo</span>
              <span className="whitespace-nowrap">₡22,755</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Marques de Casa Concha</span>
              <span className="whitespace-nowrap">₡38,000</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Barton & Guestier St. Emilion</span>
              <span className="whitespace-nowrap">₡43,665</span>
            </li>
          </ul>

          <h4 className="mt-6 text-2xl font-semibold text-pink-200/80">Pinot Noir</h4>
          <ul className="mt-3 space-y-2 text-lg">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Louis Jadot Bourgogne</span>
              <span className="whitespace-nowrap">₡53,000</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Marques de Caceres Gaudium</span>
              <span className="whitespace-nowrap">₡195,000</span>
            </li>
          </ul>

          <h4 className="mt-6 text-2xl font-semibold text-pink-200/80">Oak Aged</h4>
          <ul className="mt-3 space-y-2 text-lg">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Viña Mayor Reserva D.O. Ribera del Duero</span>
              <span className="whitespace-nowrap">₡63,345</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Viña Mayor Crianza D.O. Ribera del Duero</span>
              <span className="whitespace-nowrap">₡39,360</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Marques de Caceres Crianza D.O.CA. Rioja</span>
              <span className="whitespace-nowrap">₡39,360</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Marques de Caceres Crianza Rioja Half Bottle</span>
              <span className="whitespace-nowrap">₡16,065</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Marques de Caceres Reserva D.O.C. Rioja</span>
              <span className="whitespace-nowrap">₡47,355</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Marques de Caceres Gran Reserva D.O.C. Rioja</span>
              <span className="whitespace-nowrap">₡55,350</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Le Gran Verdus Bordeaux</span>
              <span className="whitespace-nowrap">₡19,680</span>
            </li>
          </ul>

          {/* Others */}
          <h3 className="mt-10 text-5xl font-script">Others</h3>
          <ul className="mt-4 space-y-2 text-lg mb-8">
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>House Wine Glass</span>
              <span className="whitespace-nowrap">₡4,920</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Sangria Pitcher</span>
              <span className="whitespace-nowrap">₡19,065</span>
            </li>
            <li className="flex justify-between rounded-full bg-pink-100/20 border border-black/10 px-4 py-3">
              <span>Sangria Glass</span>
              <span className="whitespace-nowrap">₡4,920</span>
            </li>
          </ul>
        </div>

        <div className="grid gap-4 sticky top-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
            <Image src="/sangria-le-chandelier-4.png" alt="Signature sangria" fill className="object-cover transition-transform duration-500 hover:scale-[1.03]" />
          </div>
          <article className="rounded-3xl bg-gradient-to-br from-pink-200/60 to-pink-200/40 p-6">
            <h4 className="text-5xl font-script">House Sangria</h4>
            <p className="mt-2 text-sm text-white/80">
              Our signature sangria crafted with premium red wine, fresh seasonal fruits, and a touch of brandy. Perfect for sharing.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}