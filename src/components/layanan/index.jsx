import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "@/styles/swiper.css";
import Slider1 from "./slider1";
import Slider2 from "./slider2";
import Slider3 from "./slider3";
import Slider4 from "./slider4";
import Slider5 from "./slider5";

export default function Index() {
  return (
    <section id="layanan" className="bg-[#145A7E0F] py-12">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 text-[#145A7E]">
        Layanan
      </h2>
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          grabCursor={true}
          freeMode={true}
          pagination={{ clickable: true, el: ".custom-pagination" }}
        >
          <SwiperSlide>
            <Slider1 />
          </SwiperSlide>
          <SwiperSlide>
            <Slider2 />
          </SwiperSlide>
          <SwiperSlide>
            <Slider3 />
          </SwiperSlide>
          <SwiperSlide>
            <Slider4 />
          </SwiperSlide>
          <SwiperSlide>
            <Slider5 />
          </SwiperSlide>
        </Swiper>

        {/* Pagination berada di luar card */}
        <div className="mt-6 flex justify-center">
          <div className="custom-pagination swiper-pagination !static"></div>
        </div>
      </div>
    </section>
  );
}
