import React from "react";
import sunat from "@/assets/layanan/sunat.png";
import bgSunat from "@/assets/layanan/bgSunat.png";
const layananData = {
  title: "Layanan Sunat",
  description:
    "Sunat Laser adalah salah satu jenis metode sunat modern yang dilakukan menggunakan alat bernama Electro Cauter. Metode ini kecil resiko perdarahan dan waktu penyembuhan lebih cepat.",
  benefits: [
    "Harga Terjangkau",
    "GRATIS Kontrol 1x",
    "GRATIS Obat",
    "GRATIS Konsultasi",
    "GRATIS Celana Sunat",
    "Ditangani Petugas Terlatih dan diawasi dokter",
  ],
};

export default function Slider4() {
  return (
    <div className="bg-white p-8 lg:px-28 md:px-20 sm:px-14 py-[45px] rounded-2xl shadow-lg flex flex-col md:flex-row items-center relative overflow-hidden max-w-7xl mx-auto">
      {/* Bagian Teks */}
      <div className="flex-1 text-left">
        <h2 className="text-3xl font-bold text-[#145A7E] mb-4 text-center md:text-left">
          {layananData.title}
        </h2>
        <h3 className="font-bold text-xl mb-2">Metode Sunat</h3>
        <p className="text-black text-lg mb-4">{layananData.description}</p>

        <h3 className="font-bold text-xl mb-2">Kenapa Harus di Dian Brata?</h3>
        <ul className="space-y-2">
          {layananData.benefits.map((benefit, index) => (
            <li key={index} className="text-lg flex items-center gap-2">
              <span className="w-3 h-3 bg-[#145A7E] rounded-full inline-block"></span>
              {benefit}
            </li>
          ))}
        </ul>

        <div className="mt-6 bg-[#145A7E] text-white text-lg px-6 py-2 rounded-tl-xl rounded-br-xl w-max">
          Jadwal Sunat Sesuai Perjanjian
        </div>
      </div>

      {/* Bagian Gambar */}
      <div className="relative w-72 h-72 mt-6 md:mt-0">
        {/* Background hijau */}
        <div className="absolute inset-0 w-[320px] h-[300px] -top-4 -left-4 z-0">
          <img
            src={bgSunat}
            alt="Background Layanan"
            className="object-cover"
          />
        </div>

        {/* Kontainer gambar utama */}
        <div className="relative bg-white p-3 rounded-tr-[80px] rounded-bl-[80px] shadow-md z-10">
          <div className="overflow-hidden rounded-tr-[80px] rounded-bl-[80px] w-full h-full">
            <img
              src={sunat}
              alt="Layanan Sunat"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
