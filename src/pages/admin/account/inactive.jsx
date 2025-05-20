// import { useState, useEffect } from "react";

// import Wrench from "@/assets/wrench.png";
// import Gear from "@/assets/gear.png";
// import BgInactive from "@/assets/bgInactive.png";

// export default function InactiveAccount() {
//   // State to control animation
//   const [rotation, setRotation] = useState(0);

//   // Rotate gears slowly for animation effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setRotation((prev) => (prev + 1) % 360);
//     }, 100);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="bg-white min-h-screen flex items-center justify-center relative overflow-hidden">
//       {/* Top-left gear */}
//       <div
//         className="absolute top-4 left-4"
//         style={{ transform: `rotate(${rotation}deg)` }}
//       >
//         <GearIcon className="w-12 h-12 text-gray-200" />
//       </div>

//       {/* Top-right gear */}
//       <div
//         className="absolute top-4 right-4"
//         style={{ transform: `rotate(-${rotation}deg)` }}
//       >
//         <GearIcon className="w-12 h-12 text-gray-200" />
//       </div>

//       {/* Bottom-left wrench and gear */}
//       <div className="absolute bottom-4 left-4">
//         <WrenchIcon className="w-12 h-12 text-gray-200" />
//       </div>

//       {/* Bottom-right gear */}
//       <div
//         className="absolute bottom-4 right-4"
//         style={{ transform: `rotate(-${rotation}deg)` }}
//       >
//         <GearIcon className="w-12 h-12 text-gray-200" />
//       </div>

//       {/* Center message */}
//       <div className=" px-12 py-10max-w-md relative">
//         {/* Wrench and tools on top */}
//         <img src={BgInactive} alt="" />
//         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
//           <WrenchIcon className="w-8 h-8 text-gray-400 inline-block" />
//           <span className="text-gray-400 text-xl mx-1">×</span>
//           <WrenchIcon className="w-8 h-8 text-gray-400 inline-block transform rotate-90" />
//         </div>
//         <p className="text-red-500 text-center font-medium text-lg">
//           Mohon maaf akun Anda di non aktifkan,
//           <br />
//           segera hubungi owner!
//         </p>
//       </div>
//     </div>
//   );
// }

// // Simple Gear Icon Component
// function GearIcon() {
//   return <img src={Gear} alt="" />;
// }

// // Simple Wrench Icon Component
// function WrenchIcon() {
//   return <img src={Wrench} alt="" />;
// }

import { useState, useEffect } from "react";
import Wrench from "@/assets/wrench.png";
import Gear from "@/assets/gear.png";
import BgInactive from "@/assets/bgInactive.png"; // Ini adalah gambar bentuk abu-abu di tengah

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
      {/* Gears & Wrenches di setiap pojok */}
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

      {/* Kotak pesan tengah dengan background custom */}
      <div
        className="relative px-8 py-6 text-center"
        style={{
          backgroundImage: `url(${BgInactive})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "700px",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p className="text-red-500 font-medium text-center text-3xl leading-relaxed z-10">
          Mohon maaf akun Anda di non aktifkan,
          <br />
          segera hubungi owner!
        </p>
      </div>
    </div>
  );
}
