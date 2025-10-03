import Image from "next/image";

export default function Hero2() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 inset-0 w-full h-full">
      <Image src="/restaurante-le-chandelier-2.webp" 
        alt="Le Chandelier Restaurant table"
        fill
        className="object-cover"
       />
      </div>
      <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white">Le Chandelier</h1>
      <p className="text-white">French Restaurant</p>
      <button className="bg-white text-black px-4 py-2 rounded-full">Book a Table</button>
      </div>
    </div>
  );
}
