import React from "react";
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
};

export default function Slider3() {
  return (
    <div className="bg-white p-10 py-[95px] rounded-2xl shadow-md flex flex-col md:flex-row items-center relative overflow-hidden max-w-7xl mx-auto">
      {/* Bagian Gambar */}
      <div className="relative w-64 h-64 ml-16 mr-10 sm:pb-[20rem] xsm:pb-[20rem] xxsm:pb-[20rem]">
        <div className="absolute inset-0 w-[280px] h-[300px] -top-4 -left-3 z-0">
          <img src={bgKb} alt="KB Image" className="object-cover" />
        </div>
        <div className="relative bg-white p-3 rounded-tl-[80px] rounded-br-[80px] shadow-md z-10">
          <div className="overflow-hidden rounded-tl-[80px] rounded-br-[80px] w-full h-full">
            <img
              src={kbImage}
              alt="KB Service"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Bagian Teks */}
      <div className="flex-1 text-left">
        <h2 className="text-3xl text-center font-bold text-[#145A7E] lg:pr-16 mb-6">
          {data.title}
        </h2>
        <div className="grid grid-cols-2 gap-6 text-gray-700 lg:pl-8">
          {data.services.map((service, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold pb-4">{service.category}</h3>
              <ul className="space-y-1">
                {service.details.map((detail, i) => (
                  <li key={i} className="text-lg flex items-start gap-2">
                    {/* Bullet custom */}
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
  );
}
