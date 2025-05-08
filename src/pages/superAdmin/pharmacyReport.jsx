import React from "react";
import { IoIosSearch } from "react-icons/io";

import report from "@/assets/report.png";
import Layout from "@/components/Layout";
import Filter from "@/components/filter";
import { Button } from "@/components/button";
import Pagination from "@/components/pagination";

export default function PharmacyReport() {
  const produkList = [
    {
      id: 1,
      nama: "Obat Kumur Anti Septik",
      merk: "Betadine",
      harga: "16.500/pcs",
      harga_jual: "10.000",
      jumlah: "20.000",
    },
    {
      id: 2,
      nama: "Obat Anti Jamur",
      merk: "Fungoral",
      harga: "25.000/pcs",
      harga_jual: "10.000",
      jumlah: "20.000",
    },
    {
      id: 3,
      nama: "Antibiotik Perisillin",
      merk: "Amoxicillin Trihydrate",
      harga: "65.000/pcs",
      harga_jual: "10.000",
      jumlah: "20.000",
    },
    {
      id: 4,
      nama: "Obat Masuk Angin + Madu",
      merk: "Antangin JRG",
      harga: "4.500/pcs",
      harga_jual: "10.000",
      jumlah: "20.000",
    },
    {
      id: 5,
      nama: "Obat Anti Inflamasi (OAINS)",
      merk: "Benostan",
      harga: "26.500/pcs",
      harga_jual: "10.000",
      jumlah: "20.000",
    },
    {
      id: 6,
      nama: "Obat Anti Biang Keringat",
      merk: "Caladine Lotion",
      harga: "18.000/pcs",
      harga_jual: "10.000",
      jumlah: "20.000",
    },
    {
      id: 7,
      nama: "Obat Sembelit",
      merk: "Dulcolax",
      harga: "5.000/pcs",
      harga_jual: "10.000",
      jumlah: "20.000",
    },
    {
      id: 8,
      nama: "Inerson",
      merk: "Interbat",
      harga: "54.000/pcs",
      harga_jual: "10.000",
      jumlah: "20.000",
    },
    {
      id: 9,
      nama: "Lodia Loperamide HCL",
      merk: "Sanbe",
      harga: "38.000/pcs",
      harga_jual: "10.000",
      jumlah: "20.000",
    },
    {
      id: 10,
      nama: "Kursi roda",
      merk: "GEA",
      harga: "380.000/pcs",
      harga_jual: "10.000",
      jumlah: "20.000",
    },
  ];

  return (
    <Layout>
      <div className="p-4 md:p-6 pb-6 md:pb-10 rounded-lg w-full mb-4 md:mb-6 text-center">
        <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 pt-3 md:pt-5">
          Laporan
        </h1>

        <div className="flex justify-center mb-3 md:mb-4">
          <img
            src={report}
            alt="Ilustrasi Laporan"
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-3">
          <div className="w-full sm:w-auto mt-2 sm:mt-0">
            <Button className="bg-[#23B000] hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold w-full sm:w-auto">
              Print Laporan
            </Button>
          </div>
        </div>
      </div>

      {/* Sisa Produk */}
      <div className="bg-white p-4 md:p-6 md:pt-10 rounded-lg shadow-md w-full">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <h3 className="text-xl font-semibold">Sisa Produk</h3>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex items-center bg-[#6499E9A6] p-2 rounded-lg w-full sm:w-auto">
              <IoIosSearch className="text-white" />
              <input
                type="text"
                placeholder="Cari"
                className="bg-transparent outline-none ml-2 text-base placeholder-white text-white w-full"
              />
            </div>
            <Filter />
          </div>
        </div>

        <div className="w-full overflow-x-auto block">
          <div className="min-w-max w-full">
            <div className="w-full h-0.5 bg-[#6C757D] mb-3"></div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#A7CAF3] text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nama Produk</th>
                  <th className="px-4 py-2">Merk Produk</th>
                  <th className="px-4 py-2">Harga</th>
                  <th className="px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {produkList.map((item) => (
                  <tr key={item.id} className="even:bg-[#A7CAF3] bg-[#9ABCF0]">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.nama}</td>
                    <td className="px-4 py-2">{item.merk}</td>
                    <td className="px-4 py-2">{item.harga}</td>
                    <td className="px-4 py-2">{item.jumlah}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination />
        </div>
      </div>

      {/* Laba Keuntungan*/}
      <div className="bg-white p-4 md:p-6 md:pt-10 mt-10 rounded-lg shadow-md w-full">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <h3 className="text-xl font-semibold">Laba Keuntungan</h3>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex items-center bg-[#6499E9A6] p-2 rounded-lg w-full sm:w-auto">
              <IoIosSearch className="text-white" />
              <input
                type="text"
                placeholder="Cari"
                className="bg-transparent outline-none ml-2 text-base placeholder-white text-white w-full"
              />
            </div>
            <Filter />
          </div>
        </div>

        <div className="w-full overflow-x-auto block">
          <div className="min-w-max w-full">
            <div className="w-full h-0.5 bg-[#6C757D] mb-3"></div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#A7CAF3] text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nama Produk</th>
                  <th className="px-4 py-2">Merk Produk</th>
                  <th className="px-4 py-2">Harga Modal+PPN</th>
                  <th className="px-4 py-2">Harga Jual+25%</th>
                  <th className="px-4 py-2">Total Keuntungan</th>
                </tr>
              </thead>
              <tbody>
                {produkList.map((item) => (
                  <tr key={item.id} className="even:bg-[#A7CAF3] bg-[#9ABCF0]">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.nama}</td>
                    <td className="px-4 py-2">{item.merk}</td>
                    <td className="px-4 py-2">{item.harga}</td>
                    <td className="px-4 py-2">{item.harga_jual}</td>
                    <td className="px-4 py-2">{item.jumlah}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination />
        </div>
      </div>
    </Layout>
  );
}
