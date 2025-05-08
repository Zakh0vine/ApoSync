import React from "react";
import { IoIosSearch } from "react-icons/io";

import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import Filter from "@/components/filter";
import Pagination from "@/components/pagination";

export default function History() {
  const produkList = [
    {
      id: 1,
      nama: "Obat Kumur Anti Septik",
      merk: "Betadine",
      stok: 5,
      kode: "A001",
      harga: "16.500/pcs",
      tanggal: "01-05-2025",
      status: "Masuk",
      pj: "Fasha Agatha",
    },
    {
      id: 2,
      nama: "Obat Anti Jamur",
      merk: "Fungoral",
      stok: 4,
      kode: "A002",
      harga: "25.000/pcs",
      tanggal: "01-05-2025",
      status: "Masuk",
      pj: "Fasha Agatha",
    },
    {
      id: 3,
      nama: "Antibiotik Penisilin",
      merk: "Amoxicillin Trihydrate",
      stok: 8,
      kode: "B001",
      harga: "65.000/pcs",
      tanggal: "01-05-2025",
      status: "Keluar",
      pj: "Fasha Agatha",
    },
    {
      id: 4,
      nama: "Obat Masuk Angin + Madu",
      merk: "Antangin JRG",
      stok: 6,
      kode: "A003",
      harga: "4.500/pcs",
      tanggal: "01-05-2025",
      status: "Masuk",
      pj: "Fasha Agatha",
    },
    {
      id: 5,
      nama: "Obat Anti Inflamasi (OAINS)",
      merk: "Benostan",
      stok: 2,
      kode: "B002",
      harga: "26.500/pcs",
      tanggal: "01-05-2025",
      status: "Keluar",
      pj: "Fasha Agatha",
    },
    {
      id: 6,
      nama: "Obat Anti Biang Keringat",
      merk: "Caladine Lotion",
      stok: 9,
      kode: "A004",
      harga: "18.000/pcs",
      tanggal: "01-05-2025",
      status: "Keluar",
      pj: "Aditya Setiawan",
    },
    {
      id: 7,
      nama: "Obat Sembelit",
      merk: "Dulcolax",
      stok: 7,
      kode: "A005",
      harga: "5.000/pcs",
      tanggal: "01-05-2025",
      status: "Masuk",
      pj: "Aditya Setiawan",
    },
    {
      id: 8,
      nama: "Inerson",
      merk: "Interbat",
      stok: 1,
      kode: "A006",
      harga: "54.000/pcs",
      tanggal: "01-05-2025",
      status: "Keluar",
      pj: "Aditya Setiawan",
    },
    {
      id: 9,
      nama: "Lodia Loperamide HCL",
      merk: "Sanbe",
      stok: 1,
      kode: "B003",
      harga: "38.000/pcs",
      tanggal: "01-05-2025",
      status: "Keluar",
      pj: "Aditya Setiawan",
    },
    {
      id: 10,
      nama: "Kursi Roda",
      merk: "GEA",
      stok: 1,
      kode: "D001",
      harga: "380.000/pcs",
      tanggal: "01-05-2025",
      status: "Keluar",
      pj: "Aditya Setiawan",
    },
  ];

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 md:pt-10 rounded-lg shadow-md w-full">
        {/* Breadcrumb */}
        <Breadcrumb pageName="Riwayat" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <h3 className="text-xl font-semibold">Riwayat Harian</h3>

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
                  <th className="px-4 py-2">Stok Barang</th>
                  <th className="px-4 py-2">Kode Produk</th>
                  <th className="px-4 py-2">Harga</th>
                  <th className="px-4 py-2">Tanggal</th>
                  <th className="px-4 py-2 text-center">Masuk/Keluar</th>
                  <th className="px-4 py-2">Nama PJ</th>
                </tr>
              </thead>
              <tbody>
                {produkList.map((item) => (
                  <tr key={item.id} className="even:bg-[#A7CAF3] bg-[#9ABCF0]">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.nama}</td>
                    <td className="px-4 py-2">{item.merk}</td>
                    <td className="px-4 py-2">{item.stok}</td>
                    <td className="px-4 py-2">{item.kode}</td>
                    <td className="px-4 py-2">{item.harga}</td>
                    <td className="px-4 py-2">{item.tanggal}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-3 py-1 text-sm rounded-md font-semibold text-white ${
                          item.status === "Masuk"
                            ? "bg-[#23B000]"
                            : "bg-[#F02626]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{item.pj}</td>
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
