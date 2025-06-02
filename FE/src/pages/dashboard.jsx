// FE/src/pages/Dashboard.jsx

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Working from "@/assets/working.png";
import Pharmacy from "@/assets/pharmacy.png";

// Fungsi API
import { getDailySummary } from "@/utils/api/dashboard/api";

// Ambil token & user dari TokenContext
import { useToken } from "@/utils/context/tokenContext";

export default function Dashboard() {
  // 1) Ambil token & user dari context
  const { token, user } = useToken();

  // 2) State untuk data dashboard
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Jika belum ada token, kita tidak memanggil API
    if (!token) {
      setLoading(false);
      return;
    }

    // 3) Fetch data dashboard setelah token tersedia
    (async () => {
      setLoading(true);
      try {
        const data = await getDailySummary();
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetch dashboard:", err);
        setError(err.message || "Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // 4) Tampilkan loading atau error jika perlu
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Memuat data dashboard…</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  // 5) Jika data belum ada (misal token tetap null), inisialisasi nol
  const {
    totalStok = 0,
    totalPerKategori = {
      OBAT_BEBAS: 0,
      OBAT_KERAS: 0,
      KONSI: 0,
      ALKES: 0,
    },
    totalBiayaModalHariIni = 0,
    totalPendapatanHariIni = 0,
  } = dashboardData || {};

  // 6) Nama user—jika context user ada, pakai user.name; jika tidak, tampil “Tamu”
  const userName = user?.name || "Tamu";

  return (
    <Layout>
      <div className="md:pt-10 mt-16 p-4 sm:p-10 sm:mt-16 bg-white min-h-screen">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-xl font-semibold">
              Hello, {userName}
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
              {totalStok} Obat Dan Barang
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
                  <span>{totalPerKategori[item.key] || 0}</span>
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
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(totalBiayaModalHariIni)}
              </p>
            </div>

            {/* Obat Keluar (Pendapatan Hari Ini) */}
            <div className="bg-red-100 text-red-800 rounded-md shadow-sm py-4 px-4 flex flex-col items-center">
              <p className="text-base sm:text-lg font-medium mb-1">
                Total Pendapatan (Obat Terjual)
              </p>
              <p className="text-xl sm:text-2xl font-semibold">
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(totalPendapatanHariIni)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
