import React, { useState } from "react";
import Unggulan from "@/assets/layanan/unggulan.png";
import bgUnggulan from "@/assets/layanan/bgUnggulan.png";

const data = {
  title: "Layanan Unggulan",
  services: [
    {
      category: "NABULIZER/UAP",
      details: [
        "Sesak nafas akibat asma (anak & dewasa)",
        "Batuk dan pilek berat",
        "Sesak akibat alergi",
      ],
    },
    {
      category: "Rawat Luka",
      details: [
        "Luka kecelakaan",
        "Luka bekas operasi",
        "Luka diabetes",
        "dll",
      ],
    },
    {
      category: "Observasi",
      details: [
        "Lemas karena dehidrasi",
        "Muntah",
        "Asam lambung tinggi (Maag)",
        "Kurang vitamin",
        "Pusing",
        "dll",
      ],
    },
    {
      category: "Cek Laborat",
      details: [
        "Cek KOLESTEROL",
        "CEK GULA DARAH",
        "CEK ASAM URAT",
        "CEK TYPUS",
        "CEK HEMOGLOBIN (HB)",
        "CEK GOLONGAN DARAH",
      ],
    },
  ],
  image: Unggulan,
  bgImage: bgUnggulan,
};

export default function Slider2() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white p-4 sm:py-[19px] md:p-8 lg:py-[58px] rounded-2xl shadow-md relative overflow-hidden max-w-7xl mx-auto h-full">
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
                alt="Background Foto"
                className="object-cover"
              />
            </div>
            <div className="relative bg-white p-2 rounded-tr-[40px] rounded-bl-[40px] shadow-md z-10">
              <div className="overflow-hidden rounded-tr-[40px] rounded-bl-[40px] w-full h-full">
                <img
                  src={data.image}
                  alt="Layanan"
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
                isExpanded ? "block" : "relative max-h-[210px] overflow-hidden"
              }
            >
              <div className="grid grid-cols-1 gap-3 text-gray-700">
                {data.services.map((service, index) => (
                  <div key={index}>
                    <h3 className="text-xl font-bold pb-4">
                      {service.category}
                    </h3>
                    <ul className="space-y-1">
                      {service.details.map((detail, i) => (
                        <li key={i} className="text-lg flex items-start gap-2">
                          <span className="w-3 h-3 bg-[#145A7E] rounded-full inline-block mt-1.5"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
          <div className="flex-1 text-left">
            <div className="grid grid-cols-2 gap-6 text-gray-700 lg:pl-28">
              {data.services.map((service, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold pb-4">{service.category}</h3>
                  <ul className="space-y-1">
                    {service.details.map((detail, i) => (
                      <li key={i} className="text-lg flex items-start gap-2">
                        <span className="w-3 h-3 bg-[#145A7E] rounded-full inline-block mt-2"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-64 h-64 mt-6 md:mt-0 lg:right-20">
            <div className="absolute inset-0 w-[300px] h-[300px] -top-4 -left-6 z-0">
              <img
                src={data.bgImage}
                alt="Background Foto"
                className="object-cover"
              />
            </div>
            <div className="relative bg-white p-3 rounded-tr-[80px] rounded-bl-[80px] shadow-md z-10">
              <div className="overflow-hidden rounded-tr-[80px] rounded-bl-[80px] w-full h-full">
                <img
                  src={data.image}
                  alt="Dokter"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
