import { useState, useEffect } from "react";
import Wrench from "@/assets/wrench.png";
import Gear from "@/assets/gear.png";
import BgInactive from "@/assets/bgInactive.png";

export default function NotFoundPage() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dekorasi sudut */}
      <img
        src={Gear}
        alt="gear"
        className="absolute top-4 left-4"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
      <img
        src={Gear}
        alt="gear"
        className="absolute top-4 right-4"
        style={{ transform: `rotate(-${rotation}deg)` }}
      />
      <img src={Wrench} alt="wrench" className="absolute bottom-4 left-4" />
      <img
        src={Gear}
        alt="gear"
        className="absolute bottom-4 right-4"
        style={{ transform: `rotate(-${rotation}deg)` }}
      />

      {/* Konten Utama */}
      <div
        className="relative flex flex-col items-center justify-center text-center p-8 z-10"
        style={{
          backgroundImage: `url(${BgInactive})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "700px",
          height: "500px",
        }}
      >
        <h1 className="text-[#F02626] font-bold text-9xl leading-none">404</h1>
        <h2 className="text-black text-4xl font-bold mt-2">
          HALAMAN TIDAK DITEMUKAN!
        </h2>
        <p className="text-xl text-gray-700 mt-2">
          Silakan Kembali Ke Halaman Sebelumnya!
        </p>
      </div>
    </div>
  );
}
