import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Working from "@/assets/working.png";
import Pharmacy from "@/assets/pharmacy.png";

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserProfile(parsedUser.name || "Tamu");
      } catch (error) {
        console.error("Gagal parse data user dari localStorage:", error);
        setUserProfile("Tamu");
      }
    } else {
      setUserProfile("Tamu");
    }
  }, []);

  return (
    <Layout>
      <div className="md:pt-10 mt-16 p-4 sm:p-10 sm:mt-16 bg-white min-h-screen">
        {/* Header - Improved responsive layout */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-xl font-semibold">
              Hello, {userProfile}
            </h1>
            <p className="text-gray-400 text-base sm:text-base mt-1">
              Here are your daily updates.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="w-1 h-12 bg-black"></div>
            <h2 className="text-xl sm:text-2xl font-bold">Dashboard</h2>
          </div>
        </div>

        {/* Atas: Kotak Total Obat + Gambar Working - Improved responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Total Obat Dan Barang */}
          <div className="bg-white shadow-md rounded-md p-7 sm:p-8 border flex flex-col justify-center items-center">
            <div className="flex justify-between items-center w-full mb-2">
              <h3 className="text-xl sm:text-xl font-semibold">
                Total Obat Dan Barang
              </h3>
              <span className="border border-[#55BED2] text-[#55BED2] text-base font-semibold px-3 py-0.5 rounded-full">
                LIVE
              </span>
            </div>
            <div className="w-full h-0.5 bg-[#6C757D] my-2"></div>
            <p className="text-xl sm:text-xl font-bold mt-2 sm:mt-4 mb-2 sm:mb-4">
              250 Obat Dan Barang
            </p>
            <img
              src={Pharmacy}
              alt="Obat Illustration"
              className="h-24 sm:h-36 mt-2 object-contain"
            />
          </div>

          {/* Gambar Working */}
          <div className="flex items-center justify-center">
            <img
              src={Working}
              alt="Dashboard Illustration"
              className="w-full max-w-sm sm:max-w-md object-contain"
            />
          </div>
        </div>

        {/* Grafik: Total Obat Dan Barang */}
        <div className="bg-white shadow-md rounded-md p-7 sm:p-8 border mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-xl font-semibold mb-3 sm:mb-4">
            Total Obat Dan Barang
          </h3>
          <div className="w-full h-0.5 bg-[#6C757D] mb-4"></div>
          <div className="space-y-3 sm:space-y-4">
            {/* Item Grafik */}
            {[
              { label: "Obat Bebas Dan Terbatas", value: 120 },
              { label: "Obat Keras", value: 40 },
              { label: "Konsi", value: 80 },
              { label: "Alkes", value: 10 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-base sm:text-base font-medium">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pendapatan Harian */}
        <div className="bg-white shadow-md rounded-md p-7 sm:p-8 border">
          <h3 className="text-xl font-semibold mb-3 sm:mb-4">
            Pendapatan Harian
          </h3>
          <div className="w-full h-0.5 bg-[#6C757D] mb-4"></div>

          {/* Kartu Obat Masuk dan Obat Keluar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            {/* Obat Masuk */}
            <div className="bg-green-100 text-green-800 rounded-md shadow-sm py-4 px-4 flex flex-col items-center">
              <p className="text-base sm:text-lg font-medium mb-1">
                Obat Masuk
              </p>
              <p className="text-xl sm:text-2xl font-semibold">Rp 1.250.000</p>
            </div>

            {/* Obat Keluar */}
            <div className="bg-red-100 text-red-800 rounded-md shadow-sm py-4 px-4 flex flex-col items-center">
              <p className="text-base sm:text-lg font-medium mb-1">
                Obat Keluar
              </p>
              <p className="text-xl sm:text-2xl font-semibold">Rp 980.000</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
