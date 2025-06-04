import { useState, useEffect } from "react";
import { IoIosWarning } from "react-icons/io";
import { debounce } from "lodash";

import Working from "@/assets/working.png";
import Pharmacy from "@/assets/pharmacy.png";
import { Loader } from "@/components/Loader";
import Layout from "@/components/Layout";
import { useToast } from "@/utils/toastify/toastProvider";
import { getDailySummary } from "@/utils/api/dashboard/api";
import { formatNumber } from "@/utils/formatter/formatNumber";

export default function Dashboard() {
  const toast = useToast();
  const [userProfile, setUserProfile] = useState("");
  const [dashboard, setDashboard] = useState({
    totalStok: 0,
    totalPerKategori: {
      OBAT_BEBAS: 0,
      OBAT_KERAS: 0,
      KONSI: 0,
      ALKES: 0,
    },
    totalBiayaModalHariIni: 0,
    totalPendapatanHariIni: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delayedFetchData = debounce(fetchData, 800);
    delayedFetchData();

    return () => delayedFetchData.cancel();
  }, []);

  async function fetchData() {
    try {
      const result = await getDailySummary();
      setDashboard(result);
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="text-xl" />
            <span className="ml-2">Gagal Mendapatkan Data Dashboard</span>
          </div>
        ),
        description: <span className="ml-7">{error.message}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

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
      {isLoading ? (
        <Loader fullScreen={true} />
      ) : (
        <div className="md:pt-10 mt-16 p-4 sm:p-10 sm:mt-16 bg-white min-h-screen">
          {/* Header */}
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

          {/* Bagian Atas: Total Obat + Ilustrasi */}
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
                {dashboard.totalStok} Obat Dan Barang
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

          {/* Grafik: Total Obat Per Kategori */}
          <div className="bg-white shadow-md rounded-md p-7 sm:p-8 border mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-xl font-semibold mb-3 sm:mb-4">
              Total Obat Per Kategori
            </h3>
            <div className="w-full h-0.5 bg-[#6C757D] mb-4"></div>
            <div className="space-y-3 sm:space-y-4">
              {[
                { label: "Obat Bebas Dan Terbatas", key: "OBAT_BEBAS" },
                { label: "Obat Keras", key: "OBAT_KERAS" },
                { label: "Konsi", key: "KONSI" },
                { label: "Alkes", key: "ALKES" },
              ].map((item) => (
                <div key={item.key}>
                  <div className="flex justify-between text-base sm:text-base font-medium">
                    <span>{item.label}</span>
                    <span>{dashboard.totalPerKategori[item.key] || 0}</span>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
              {/* Obat Masuk (Biaya Modal Hari Ini) */}
              <div className="bg-green-100 text-green-800 rounded-md shadow-sm py-4 px-4 flex flex-col items-center">
                <p className="text-base sm:text-lg font-medium mb-1">
                  Total Biaya Modal (Obat Masuk)
                </p>
                <p className="text-xl sm:text-2xl font-semibold">
                  {formatNumber(dashboard.totalBiayaModalHariIni)}
                </p>
              </div>

              {/* Obat Keluar (Pendapatan Hari Ini) */}
              <div className="bg-red-100 text-red-800 rounded-md shadow-sm py-4 px-4 flex flex-col items-center">
                <p className="text-base sm:text-lg font-medium mb-1">
                  Total Pendapatan (Obat Terjual)
                </p>
                <p className="text-xl sm:text-2xl font-semibold">
                  {formatNumber(dashboard.totalPendapatanHariIni)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
