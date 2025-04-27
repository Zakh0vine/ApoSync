import React from "react";
import Layout from "@/components/layout";

export default function Notification() {
  return (
    <Layout>
      <div className="p-6 bg-white min-h-screen flex justify-center">
        <div className="w-full max-w-2xl">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-8 flex items-center">
            <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>{" "}
            Notifikasi
          </h1>

          {/* Notification Items */}
          <div className="space-y-4">
            {/* Notifikasi 1 */}
            <div className="border border-gray-300 rounded-md p-3 text-sm">
              Stok obat paracetamol sudah{" "}
              <span className="text-yellow-500 font-semibold">Habis</span>
            </div>
            {/* Notifikasi 2 */}
            <div className="border border-gray-300 rounded-md p-3 text-sm">
              Stok obat bodrex sudah{" "}
              <span className="text-yellow-500 font-semibold">Habis</span>
            </div>
            {/* Notifikasi 3 */}
            <div className="border border-gray-300 rounded-md p-3 text-sm">
              Obat panadol sudah{" "}
              <span className="text-purple-600 font-semibold">
                Expired 1 November 2023
              </span>{" "}
              kemarin
            </div>
            {/* Notifikasi 4 */}
            <div className="border border-gray-300 rounded-md p-3 text-sm">
              Stok barang masker sudah{" "}
              <span className="text-yellow-500 font-semibold">Habis</span>
            </div>
            {/* Notifikasi 5 */}
            <div className="border border-gray-300 rounded-md p-3 text-sm">
              Stok obat komik{" "}
              <span className="text-red-500 font-semibold">
                Keluar 1 November 2023
              </span>
            </div>
            {/* Notifikasi 6 */}
            <div className="border border-gray-300 rounded-md p-3 text-sm">
              Stok obat paracetamol{" "}
              <span className="text-green-600 font-semibold">
                Masuk 17 Oktober 2023
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
