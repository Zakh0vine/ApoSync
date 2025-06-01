import React, { useState } from "react";
import kbImage from "@/assets/layanan/kb.png";
import bgKb from "@/assets/layanan/bgKb.png";

const data = {
  title: "Layanan KB",
  services: [
    {
      category: "KB IMPLAN",
      details: [
        "Implan yang sudah dimasukkan ke bawah kulit akan melepaskan HORMON PROGESTIN yang bertugas untuk mencegah ovulasi agar tidak terjadi kehamilan.",
      ],
    },
    {
      category: "KB SUNTIK",
      details: ["SUNTIK 1 BULANAN", "SUNTIK 3 BULANAN"],
    },
    {
      category: "KB IUD/SPIRAL",
      details: [
        "IUD yang dilapisi tembaga/ IUD Non Hormonal, bisa bertahan sampai 10 tahun",
        "IUD Hormonal (Hormon Progesteron) mampu bertahan hingga 3-5 tahun",
      ],
    },
    {
      category: "KB PIL",
      details: [
        "PIL KB Kombinasi (Mengandung Estrogren dan Progesteron Sintetis)",
        "PIL KB khusus Progestin (Pil mini untuk ibu menyusui)",
      ],
    },
  ],
  image: kbImage,
  bgImage: bgKb,
};

export default function Slider3() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white p-4 sm:py-[19px] md:p-8 lg:py-[100px] rounded-2xl shadow-md relative overflow-hidden max-w-7xl mx-auto h-full">
      <div className="flex flex-col h-full">
        <h2 className="text-3xl md:text-3xl text-center font-bold text-[#145A7E] mb-4">
          {data.title}
        </h2>

        {/* Mobile layout - Image on top */}
        <div className="md:hidden flex justify-center mb-5">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 w-44 -top-2 -left-2 z-0">
              <img
                src={data.bgImage}
                alt="Background KB"
                className="object-cover"
              />
            </div>
            <div className="relative bg-white p-2 rounded-tl-[40px] rounded-br-[40px] shadow-md z-10">
              <div className="overflow-hidden rounded-tl-[40px] rounded-br-[40px] w-full h-full">
                <img
                  src={data.image}
                  alt="KB Service"
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
                isExpanded ? "block" : "relative max-h-[206px] overflow-hidden"
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
                          <span className="w-3 h-3 bg-[#145A7E] rounded-full flex-shrink-0 mt-1.5"></span>
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
          <div className="relative w-64 h-64 ml-16 mr-10">
            <div className="absolute inset-0 w-[280px] h-[300px] -top-4 -left-3 z-0">
              <img src={data.bgImage} alt="KB Image" className="object-cover" />
            </div>
            <div className="relative bg-white p-3 rounded-tl-[80px] rounded-br-[80px] shadow-md z-10">
              <div className="overflow-hidden rounded-tl-[80px] rounded-br-[80px] w-full h-full">
                <img
                  src={data.image}
                  alt="KB Service"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 text-left">
            <div className="grid grid-cols-2 gap-6 text-gray-700 lg:pl-8">
              {data.services.map((service, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold pb-4">{service.category}</h3>
                  <ul className="space-y-1">
                    {service.details.map((detail, i) => (
                      <li key={i} className="text-lg flex items-start gap-2">
                        <span className="w-3 h-3 bg-[#145A7E] rounded-full flex-shrink-0 mt-2"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
