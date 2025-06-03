import React, { useState } from "react";
import Wa from "@/assets/layanan/wa.png";
import BgFotoDokter from "@/assets/layanan/bgFotoDokter.png";
import FotoDokter from "@/assets/layanan/fotoDokter.png";

export default function Slider1() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const data = {
    title: "Layanan Konsultasi Gratis",
    name: "Dr. Mey Dian Intan Sari",
    description:
      "Dapatkan layanan konsultasi gratis untuk berbagai masalah kesehatan atau pertanyaan medis yang Anda miliki. Kami siap membantu Anda dengan informasi yang akurat dan solusi yang tepat. Hubungi kami melalui WhatsApp untuk konsultasi lebih lanjut.",
    locations: [
      "1. Apotek Dian Brata Farma 1 (karangtengah) : 081392372509",
      "2. Apotek Dian Brata Farma 2 (kemranjen) : 085184798699",
      "3. Apotek Dian Brata Farma 3 (Kalisube) : 082241098940",
      "4. Konsultasi dokter/USG/khitan : 08112892070",
    ],
    image: FotoDokter,
    bgImage: BgFotoDokter,
  };
  const whatsappNumber = "628112892070";
  const whatsappMessage =
    "Halo, saya ingin menanyakan layanan konsultasi gratis dengan Dr. Mey Dian Intan Sari. Apakah saya bisa mendapatkan informasi lebih lanjut mengenai konsultasi dokter/USG/khitan? Terimakasih.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="bg-white p-4 sm:py-[24px] md:p-8 lg:py-[118px] lg:p-16 md:py-10 rounded-2xl shadow-md relative max-w-7xl mx-auto w-full h-full">
      <div className="flex flex-col h-full">
        {/* Mobile layout - stacked vertically */}
        <div className="md:hidden flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4">
            <div className="absolute inset-0 w-44 -top-2 -left-2 z-0">
              <img
                src={data.bgImage}
                alt="Background Foto"
                className="object-cover"
              />
            </div>
            <div className="relative bg-white p-2 rounded-tl-[40px] rounded-br-[40px] shadow-md z-10">
              <div className="overflow-hidden rounded-tl-[40px] rounded-br-[40px] w-full h-full">
                <img
                  src={data.image}
                  alt={data.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Mobile content with read more functionality */}
          <div className="w-full">
            <p className="text-3xl text-[#145A7E] font-semibold mb-3 px-2">
              {data.title}
            </p>
            <p className="text-xl text-black font-semibold mb-1 px-2">
              {data.name}
            </p>

            <div className="px-2">
              {/* Conditionally show content based on expanded state */}
              <div
                className={
                  isExpanded
                    ? "block"
                    : "relative max-h-[145px] overflow-hidden"
                }
              >
                <p className="text-lg text-gray-600 mb-2">{data.description}</p>

                <ul className="text-lg text-gray-700 space-y-1">
                  {data.locations.map((loc, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span>{loc}</span>
                    </li>
                  ))}
                </ul>

                <div className="py-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-white text-[#67C15E] hover:bg-gray-100 px-4 py-2 flex items-center gap-2 shadow-md rounded-full">
                      <img src={Wa} alt="wa" className="w-5 h-5" />
                      Whatsapp
                    </button>
                  </a>
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
        </div>

        {/* Desktop layout - side by side */}
        <div className="hidden md:flex md:flex-row items-center h-full">
          <div className="relative w-64 h-64 mr-6">
            <div className="absolute inset-0 w-[290px] -top-4 -left-4 z-0">
              <img
                src={data.bgImage}
                alt="Background Foto"
                className="object-cover"
              />
            </div>
            <div className="relative bg-white p-3 rounded-tl-[80px] rounded-br-[80px] shadow-md z-10">
              <div className="overflow-hidden rounded-tl-[80px] rounded-br-[80px] w-full h-full">
                <img
                  src={data.image}
                  alt={data.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="md:ml-6 text-left flex-1 z-10">
            <p className="text-3xl text-[#145A7E] font-semibold mb-5">
              {data.title}
            </p>
            <p className="text-xl text-black font-semibold mb-1">{data.name}</p>
            <p className="text-lg text-gray-600 mb-2">{data.description}</p>
            <ul className="text-lg text-gray-700 mb-3 space-y-1">
              {data.locations.map((loc, i) => (
                <li key={i}>{loc}</li>
              ))}
            </ul>
            <div className="flex justify-start">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <button className="bg-white text-[#67C15E] hover:bg-gray-100 px-4 py-2 flex items-center gap-2 shadow-md rounded-full">
                  <img src={Wa} alt="wa" className="w-5 h-5" />
                  Whatsapp
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
