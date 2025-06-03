import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import KonsulDokter from "@/assets/apotek/konsulDokter.png";
import KonsulApoteker from "@/assets/apotek/konsulApoteker.png";
import ObatBebas from "@/assets/apotek/obatBebas.png";
import ResepDokter from "@/assets/apotek/resepDokter.png";
import Alkes from "@/assets/apotek/alkes.png";

import IconDokter from "@/assets/apotek/iconDokter.png";
import IconApoteker from "@/assets/apotek/IconApoteker.png";
import IconObat from "@/assets/apotek/iconObat.png";
import IconResep from "@/assets/apotek/iconResep.png";
import IconAlkes from "@/assets/apotek/iconAlkes.png";

const layanan = [
  {
    title: "Konsultasi Dokter",
    description:
      "Layanan konsultasi kesehatan langsung dengan dokter untuk mendapatkan diagnosis dan saran medis yang tepat.",
    image: KonsulDokter,
    icon: IconDokter,
  },
  {
    title: "Konsultasi Apoteker",
    description:
      "Memberikan informasi dan edukasi terkait penggunaan obat yang aman, dosis, serta efek sampingnya.",
    image: KonsulApoteker,
    icon: IconApoteker,
  },
  {
    title: "Penjualan Obat Bebas",
    description:
      "Menyediakan berbagai jenis obat yang dapat dibeli tanpa resep dokter sesuai kebutuhan ringan sehari-hari.",
    image: ObatBebas,
    icon: IconObat,
  },
  {
    title: "Menerima Resep Dokter",
    description:
      "Melayani penebusan resep dari dokter dengan akurat dan sesuai anjuran medis.",
    image: ResepDokter,
    icon: IconResep,
  },
  {
    title: "Penjualan Alkes",
    description:
      "Menyediakan alat kesehatan seperti tensimeter, termometer, masker, dan perlengkapan medis lainnya.",
    image: Alkes,
    icon: IconAlkes,
  },
];

export default function LayananApotek() {
  return (
    <section className="bg-[#145A7E0F] pb-12">
      <div className="bg-white max-w-7xl mx-auto rounded-2xl pt-10 pb-6 px-6 md:px-10 lg:px-24">
        <h2 className="text-[#145A7E] text-3xl font-bold text-center mb-6">
          Layanan Apotek
        </h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="px-4"
        >
          {layanan.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative min-h-[400px] bg-white rounded-lg shadow-xl p-5 mb-20 flex flex-col">
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 text-lg flex-grow">
                  {item.description}
                </p>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mt-4"
                />
                <div className="absolute bottom-3 right-3 bg-white p-2 rounded-full">
                  <img
                    src={item.icon}
                    alt="Icon"
                    className="w-10 h-10 object-contain rounded-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
