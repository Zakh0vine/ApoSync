import React from "react";
import Layout from "@/components/layout";

export default function Notification() {
  return (
    <Layout>
      <div className="sm:mt-16 mt-16 p-6 py-10 bg-white min-h-screen flex justify-center">
        <div className="w-full max-w-5xl">
          {/* Title */}
          <div className="relative flex items-center mb-8">
            <div className="w-10 h-10 bg-[#4C84FF40] rounded-full absolute -left-2"></div>
            <h1 className="text-2xl font-bold relative">Notifikasi</h1>
          </div>

          {/* Notification Items */}
          <div className="space-y-4">
            {/* Notifikasi 1 */}
            <div className="border border-gray-300 rounded-md p-3 text-base">
              Stok obat paracetamol sudah{" "}
              <span className="text-yellow-500 font-bold">Habis</span>
            </div>
            {/* Notifikasi 2 */}
            <div className="border border-gray-300 rounded-md p-3 text-base">
              Stok obat bodrex sudah{" "}
              <span className="text-yellow-500 font-bold">Habis</span>
            </div>
            {/* Notifikasi 3 */}
            <div className="border border-gray-300 rounded-md p-3 text-base">
              Obat panadol sudah{" "}
              <span className="text-purple-600 font-bold">Expired</span>{" "}
              <span className="text-base font-bold">1 November 2023</span>{" "}
              kemarin
            </div>
            {/* Notifikasi 4 */}
            <div className="border border-gray-300 rounded-md p-3 text-base">
              Stok barang masker sudah{" "}
              <span className="text-yellow-500 font-bold">Habis</span>
            </div>
            {/* Notifikasi 5 */}
            <div className="border border-gray-300 rounded-md p-3 text-base">
              Stok obat komik{" "}
              <span className="text-red-500 font-bold">Keluar</span>{" "}
              <span className="text-base font-bold">1 November 2023</span>{" "}
            </div>
            {/* Notifikasi 6 */}
            <div className="border border-gray-300 rounded-md p-3 text-base">
              Stok obat paracetamol{" "}
              <span className="text-green-600 font-bold">Masuk</span>{" "}
              <span className="text-base font-bold">17 Oktober 2023</span>{" "}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
