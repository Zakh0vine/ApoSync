import React from "react";
import Unggulan from "@/assets/layanan/Unggulan.png";
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
};

export default function Slider2() {
  return (
    <div className="bg-white p-8 py-[53px] rounded-2xl shadow-md flex flex-col md:flex-row items-center relative overflow-hidden max-w-7xl mx-auto">
      <div className="flex-1 text-left">
        <h2 className="text-3xl text-center font-bold text-[#145A7E] mb-6">
          {data.title}
        </h2>

        <div className="grid grid-cols-2 gap-6 text-gray-700 lg:pl-28">
          {data.services.map((service, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold pb-4">{service.category}</h3>
              <ul className="space-y-1">
                {service.details.map((detail, i) => (
                  <li key={i} className="text-lg flex items-start gap-2">
                    {/* Bullet custom */}
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
            src={bgUnggulan}
            alt="Background Foto"
            className="object-cover"
          />
        </div>

        {/* Kontainer gambar utama */}
        <div className="relative bg-white p-3 rounded-tr-[80px] rounded-bl-[80px] shadow-md z-10">
          <div className="overflow-hidden rounded-tr-[80px] rounded-bl-[80px] w-full h-full">
            <img
              src={Unggulan}
              alt="Dokter"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
