import React from "react";
import Layout from "@/components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="p-6 bg-white min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-xl font-semibold">Hello, Fasha</h1>
            <p className="text-gray-400 text-sm mt-1">
              Here are your daily updates.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <div className="mt-2">
              <img
                src="https://via.placeholder.com/120x100"
                alt="Dashboard Illustration"
                className="w-40 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Card: Total Obat dan Barang */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-md p-4 relative">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold">Total Obat Dan barang</h3>
              <span className="border border-blue-300 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                LIVE
              </span>
            </div>
            <div className="flex flex-col items-center justify-center mt-4">
              <p className="text-lg font-bold">250 Obat Dan Barang</p>
              <img
                src="https://via.placeholder.com/100x80"
                alt="Obat Illustration"
                className="w-24 mt-2"
              />
            </div>
          </div>

          {/* Graph: Total Obat dan Barang */}
          <div className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-md font-semibold mb-4">
              Total Obat Dan Barang
            </h3>
            <div className="space-y-3">
              {/* Item 1 */}
              <div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Obat Bebas Dan Terbatas</span>
                  <span>120</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-orange-400 h-2.5 rounded-full w-[80%]"></div>
                </div>
              </div>
              {/* Item 2 */}
              <div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Obat Keras</span>
                  <span>40</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-orange-400 h-2.5 rounded-full w-[30%]"></div>
                </div>
              </div>
              {/* Item 3 */}
              <div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Konsi</span>
                  <span>80</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-orange-400 h-2.5 rounded-full w-[60%]"></div>
                </div>
              </div>
              {/* Item 4 */}
              <div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Alkes</span>
                  <span>10</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2.5 mt-1">
                  <div className="bg-orange-400 h-2.5 rounded-full w-[10%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Pendapatan Harian */}
          <div className="bg-white shadow-md rounded-md p-4 col-span-1 lg:col-span-2">
            <h3 className="text-md font-semibold mb-4">Pendapatan Harian</h3>
            <div className="flex justify-between text-sm font-medium">
              <span>Obat Masuk</span>
              <span>Obat Keluar</span>
            </div>
            {/* Grafiknya bisa ditambahkan nanti */}
            <div className="bg-gray-100 h-32 rounded-md mt-4 flex items-center justify-center text-gray-400">
              Grafik Pendapatan Harian
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
