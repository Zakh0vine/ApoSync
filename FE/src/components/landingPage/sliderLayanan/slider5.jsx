import React, { useState } from "react";
import usg from "@/assets/layanan/usg.png";
import bgUsg from "@/assets/layanan/bgUsg.png";

const data = {
  title: "Layanan USG KEHAMILAN & CEK IUD",
  benefits: [
    "Melihat kondisi bayi dalam kandungan",
    "Melihat jenis kelamin janin",
    "Mengetahui umur kehamilan",
    "Memantau detak jantung janin",
    "Mengetahui taksiran berat badan janin",
    "Mengetahui letak IUD",
  ],
  schedule: "Setiap Hari Pukul 17.00 - 20.00 WIB",
  image: usg,
  bgImage: bgUsg,
};

export default function Slider5() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white p-[14px] sm:py-[33px] md:p-8 lg:py-[94px] rounded-2xl shadow-lg relative overflow-hidden max-w-7xl mx-auto h-full">
      <div className="flex flex-col h-full">
        <h2 className="text-3xl md:text-3xl text-center font-bold text-[#145A7E] mb-4">
          {data.title}
        </h2>

        {/* Mobile layout - Image on top */}
        <div className="md:hidden flex justify-center mb-4">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 w-44 -top-2 -left-2 z-0">
              <img
                src={data.bgImage}
                alt="Background USG"
                className="object-cover"
              />
            </div>
            <div className="relative bg-white p-2 rounded-tl-[40px] rounded-br-[40px] shadow-md z-10">
              <div className="overflow-hidden rounded-tl-[40px] rounded-br-[40px] w-full h-full">
                <img
                  src={data.image}
                  alt="Layanan USG"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile content with read more functionality */}
        <div className="md:hidden">
          <div className="px-2">
            {/* Conditionally show content based on expanded state */}
            <div
              className={
                isExpanded ? "block" : "relative max-h-[178px] overflow-hidden"
              }
            >
              <h3 className="font-bold text-xl mb-1">
                Manfaat Pemeriksaan USG:
              </h3>
              <ul className="space-y-1 mb-3">
                {data.benefits.map((benefit, index) => (
                  <li key={index} className="text-lg flex items-start gap-2">
                    <span className="w-3 h-3 bg-[#145A7E] rounded-full flex-shrink-0 mt-1.5"></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 bg-[#145A7E] text-white text-lg px-4 py-1 rounded-tl-lg rounded-br-lg w-max">
                {data.schedule}
              </div>

              {/* Add gradient overlay when collapsed */}
              {!isExpanded && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
              )}
            </div>

            {/* Read more button */}
            <div className="pt-5">
              <button
                onClick={toggleExpand}
                className="text-[#145A7E] font-medium hover:underline"
              >
                {isExpanded ? "Sembunyikan" : "Selengkapnya..."}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex md:flex-row items-center h-full">
          <div className="relative w-72 h-72 mt-6 md:mt-0 lg:ml-40">
            <div className="absolute inset-0 w-[330px] h-[300px] -top-4 -left-5 z-0">
              <img
                src={data.bgImage}
                alt="Background Layanan"
                className="object-cover"
              />
            </div>

            <div className="relative bg-white p-3 rounded-tl-[80px] rounded-br-[80px] shadow-md z-10">
              <div className="overflow-hidden rounded-tl-[80px] rounded-br-[80px] w-full h-full">
                <img
                  src={data.image}
                  alt="Layanan USG"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 text-left pt-10 lg:ml-28">
            <h3 className="font-bold text-xl mb-2">Manfaat Pemeriksaan USG:</h3>
            <ul className="space-y-2">
              {data.benefits.map((benefit, index) => (
                <li key={index} className="text-lg flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#145A7E] rounded-full inline-block"></span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-6 bg-[#145A7E] text-white text-lg px-6 py-2 rounded-tl-xl rounded-br-xl shadow-md text-center w-max">
              {data.schedule}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
