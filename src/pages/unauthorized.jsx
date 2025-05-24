import { useState, useEffect } from "react";
import Wrench from "@/assets/wrench.png";
import Gear from "@/assets/gear.png";
import AlertIcon from "@/assets/alert.png";

export default function InactiveAccount() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dekorasi pojok */}
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

      {/* Konten utama */}
      <div className="relative w-[550px] h-[450px] border-2 border-[#F02626] rounded-md flex flex-col items-center justify-center text-center p-6 bg-white shadow-lg z-10">
        <img src={AlertIcon} alt="alert" className="w-60 h-60 mb-4" />
        <h1 className="text-4xl font-bold text-black mb-2">Mohon Maaf</h1>
        <p className="text-xl text-gray-700">
          Akun yang sedang Anda gunakan akun Super Admin
        </p>
      </div>
    </div>
  );
}
