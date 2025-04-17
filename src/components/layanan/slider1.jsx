import React from "react";
import Wa from "@/assets/layanan/Wa.png";
import BgFotoDokter from "@/assets/layanan/bgFotoDokter.png";
import FotoDokter from "@/assets/layanan/FotoDokter.png";

export default function Slider1() {
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
  };
  const whatsappNumber = "628112892070";
  const whatsappMessage =
    "Halo, saya ingin menanyakan layanan konsultasi gratis dengan Dr. Mey Dian Intan Sari. Apakah saya bisa mendapatkan informasi lebih lanjut mengenai konsultasi dokter/USG/khitan? Terimakasih.";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="bg-white p-16 lg:py-[117px] md:py-10 rounded-2xl shadow-md flex flex-col md:flex-row items-center relative max-w-7xl mx-auto w-full">
      <div className="relative w-64 h-64 mr-6">
        <div className="absolute inset-0 w-[290px] -top-4 -left-4 z-0">
          <img
            src={BgFotoDokter}
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

      <div className="md:ml-6 mt-4 md:mt-0 text-left flex-1 z-10">
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
        <div className="flex justify-start md:justify-start">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <button className="bg-white text-[#67C15E] hover:bg-gray-100 px-4 py-2 flex items-center gap-2 shadow-md rounded-full">
              <img src={Wa} alt="wa" className="w-5 h-5" />
              Whatsapp
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
