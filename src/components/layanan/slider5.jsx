import React from "react";
import usg from "@/assets/layanan/usg.png"; // Gambar utama
import bgUsg from "@/assets/layanan/bgUsg.png"; // Background hijau di belakang

const layananData = {
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
};

export default function Slider5() {
  return (
    <div className="bg-white p-8 py-[93px] rounded-2xl shadow-lg flex flex-col md:flex-row items-center relative overflow-hidden max-w-7xl mx-auto">
      {/* Bagian Gambar */}
      <div className="relative w-72 h-72 mt-6 md:mt-0 lg:ml-40">
        {/* Background hijau */}
        <div className="absolute inset-0 w-[330px] h-[300px] -top-4 -left-5 z-0">
          <img src={bgUsg} alt="Background Layanan" className="object-cover" />
        </div>

        {/* Kontainer gambar utama */}
        <div className="relative bg-white p-3 rounded-tl-[80px] rounded-br-[80px] shadow-md z-10">
          <div className="overflow-hidden rounded-tl-[80px] rounded-br-[80px] w-full h-full">
            <img
              src={usg}
              alt="Layanan USG"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Bagian Teks */}
      <div className="flex-1 text-left pt-10 lg:ml-28">
        <h2 className="text-3xl font-bold text-[#145A7E] mb-4 text-center md:text-left">
          {layananData.title}
        </h2>

        <h3 className="font-bold text-xl mb-2">Manfaat Pemeriksaan USG:</h3>
        <ul className="space-y-2">
          {layananData.benefits.map((benefit, index) => (
            <li key={index} className="text-lg flex items-center gap-2">
              <span className="w-3 h-3 bg-[#145A7E] rounded-full inline-block"></span>
              {benefit}
            </li>
          ))}
        </ul>

        <div className="mt-6 bg-[#145A7E] text-white text-lg px-6 py-2 rounded-tl-xl rounded-br-xl shadow-md text-center w-max">
          {layananData.schedule}
        </div>
      </div>
    </div>
  );
}
