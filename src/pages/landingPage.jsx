import { FaPhoneAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

import Navbar from "@/components/landingPage/navbar";
import Layanan from "@/components/landingPage/sliderLayanan/index";
import Apotek from "@/components/landingPage/sliderApotek/slider";
import Footer from "@/components/landingPage/footer";

import Logo from "@/assets/logo2.png";
import BgTentang from "@/assets/tentang.png";
import Hero from "@/assets/Hero.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <section
        id="beranda"
        className="relative bg-cover bg-center h-[70vh] md:h-screen text-center flex justify-center items-center text-white px-6 sm:px-10 lg:px-28"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        {/* Overlay hitam transparan */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        {/* Konten */}
        <div className="relative w-full text-center max-w-5xl mx-auto md:mx-0">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            Solusi Layanan Kesehatan Terbaik di Dian Brata Medika!
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            Cepat, Ramah, Berkualitas, dan Terjangkau – Kami hadir untuk
            memberikan pelayanan kesehatan yang terbaik, memastikan setiap
            kunjungan Anda nyaman dan memuaskan.
          </p>
        </div>
      </section>
      <Layanan />
      <Apotek />
      <div
        id="tentang"
        className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-16 py-12"
        style={{ backgroundImage: `url(${BgTentang})` }}
      >
        <div className="max-w-7xl w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#145A7E] text-center mb-10 sm:mb-16">
            Tentang Apotek
          </h1>

          {/* Grid 2 Kolom: Logo & Penjelasan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-10">
            {/* Bagian Logo */}
            <div className="flex justify-center">
              <img
                src={Logo}
                alt="Logo Apotek"
                className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-[350px]"
              />
            </div>

            {/* Bagian Penjelasan */}
            <p className="text-black text-lg sm:text-xl text-center md:text-left leading-relaxed">
              Apotek Dian Brata Medika berdiri dengan tujuan memberikan
              pelayanan kefarmasian yang berkualitas, aman, dan terpercaya.
              Sejak awal, apotek ini berkomitmen menjadi mitra kesehatan
              masyarakat melalui penyediaan obat-obatan dan layanan yang
              profesional.
            </p>
          </div>

          {/* Grid 2 Kolom: Visi & Misi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Visi */}
            <div className="bg-[#145A7E] text-white p-6 sm:p-8 py-10 rounded-lg text-center md:text-left shadow-lg">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-center">
                Visi
              </h2>
              <p className="text-lg sm:text-xl px-3 sm:px-5">
                Menjadi apotek unggulan yang terpercaya dalam memberikan
                pelayanan kefarmasian terbaik dan berorientasi pada kepuasan
                serta kesehatan masyarakat.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-[#145A7E] text-white p-6 sm:p-8 rounded-lg text-center md:text-start shadow-lg">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-center">
                Misi
              </h2>
              <ul className="list-decimal text-start space-y-2 px-4 sm:px-8">
                <li className="text-lg sm:text-xl">
                  Menyediakan obat-obatan yang lengkap, berkualitas, dan
                  terjamin keasliannya.
                </li>
                <li className="text-lg sm:text-xl">
                  Memberikan pelayanan yang cepat, tepat, dan profesional oleh
                  tenaga farmasi yang kompeten.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 px-4 sm:px-6 md:px-10 lg:px-16">
        <h2
          id="informasi"
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-[#145A7E] mb-10"
        >
          Informasi
        </h2>

        {/* Grid untuk bagian kontak */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Telepon */}
          <div className="bg-[#145A7E] text-white flex justify-center items-center p-6 rounded-lg shadow-lg ">
            <FaPhoneAlt className="text-3xl sm:text-4xl" />
            <div className="ml-4">
              <p className="text-lg sm:text-xl font-semibold">Telepon</p>
              <p className="text-lg sm:text-xl">08112892070</p>
            </div>
          </div>

          {/* Instagram */}
          <div className="bg-[#145A7E] text-white flex justify-center items-center p-6 rounded-lg shadow-lg">
            <RiInstagramFill className="text-3xl sm:text-4xl" />
            <div className="ml-4">
              <p className="text-lg sm:text-xl font-semibold">Instagram</p>
              <p className="text-lg sm:text-xl">@dianbratafarma</p>
            </div>
          </div>

          {/* Jam Operasional */}
          <div className="bg-[#145A7E] text-white flex justify-center items-center p-6 rounded-lg shadow-lg">
            <FaClock className="text-3xl sm:text-4xl" />
            <div className="ml-4">
              <p className="text-lg sm:text-xl font-semibold">
                Jam Operasional
              </p>
              <p className="text-lg sm:text-xl">06.00 - 21.00 WIB</p>
            </div>
          </div>
        </div>

        {/* Peta Lokasi */}
        <div className="w-full max-w-7xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden">
          <iframe
            className="w-full h-80 sm:h-96"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1978.2182176771832!2d109.30598103252318!3d-7.416854637729342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6559199699d57b%3A0xb4f8101af1748d26!2sDian%20Brata%20Medika%20(Klinik%20Pratama%20dr%20Mey%20Dian%20Intan%20Sari)!5e0!3m2!1sid!2sid!4v1742995899949!5m2!1sid!2sid"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Grid untuk Cabang */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-10">
          {/* Cabang 1 */}
          <div className="bg-white border rounded-lg p-6 text-center shadow-lg">
            <FaMapMarkerAlt className="text-3xl sm:text-4xl text-[#145A7E] mb-3 mx-auto" />
            <h3 className="text-xl sm:text-2xl font-semibold">Cabang 1</h3>
            <p className="text-lg sm:text-xl text-gray-700">
              JL. Raya Karangtengah-Kembaran RT 05/01 Karangtengah Kembaran,
              Banyumas
            </p>
          </div>

          {/* Cabang 2 */}
          <div className="bg-white border rounded-lg p-6 text-center shadow-lg">
            <FaMapMarkerAlt className="text-3xl sm:text-4xl text-[#145A7E] mb-3 mx-auto" />
            <h3 className="text-xl sm:text-2xl font-semibold">Cabang 2</h3>
            <p className="text-lg sm:text-xl text-gray-700">
              Ruko Depan Pasar Jatisari Desa Petarangan Kemranjen, Banyumas
            </p>
          </div>

          {/* Cabang 3 */}
          <div className="bg-white border rounded-lg p-6 text-center shadow-lg">
            <FaMapMarkerAlt className="text-3xl sm:text-4xl text-[#145A7E] mb-3 mx-auto" />
            <h3 className="text-xl sm:text-2xl font-semibold">Cabang 3</h3>
            <p className="text-lg sm:text-xl text-gray-700">
              Jalan Serayu RT 02/01 Desa Kalisube Banyumas Sebrang SD Kalisube,
              Banyumas
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
