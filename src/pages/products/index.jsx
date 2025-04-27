import React from "react";
import { TiPlusOutline } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { GoTrash } from "react-icons/go";
import { Button } from "@/components/button";

import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import Filter from "@/components/filter";
import Pagination from "@/components/pagination";

export default function Produk() {
  const produkList = [
    {
      id: 1,
      nama: "Obat Kumur Anti Septik",
      merk: "Betadine",
      stok: 25,
      kode: "A001",
      harga: "16.500/pcs",
    },
    {
      id: 2,
      nama: "Obat Anti Jamur",
      merk: "Fungoral",
      stok: 15,
      kode: "A002",
      harga: "25.000/pcs",
    },
    {
      id: 3,
      nama: "Antibiotik Penisilin",
      merk: "Amoxicillin Trihydrate",
      stok: 50,
      kode: "B001",
      harga: "65.000/pcs",
    },
    {
      id: 4,
      nama: "Obat Masuk Angin + Madu",
      merk: "Antangin JRG",
      stok: 10,
      kode: "A003",
      harga: "4.500/pcs",
    },
    {
      id: 5,
      nama: "Obat Anti Inflamasi (OAINS)",
      merk: "Benostan",
      stok: 18,
      kode: "B002",
      harga: "26.500/pcs",
    },
    {
      id: 6,
      nama: "Obat Anti Biang Keringat",
      merk: "Caladine Lotion",
      stok: 30,
      kode: "A004",
      harga: "18.000/pcs",
    },
    {
      id: 7,
      nama: "Obat Sembelit",
      merk: "Dulcolax",
      stok: 40,
      kode: "A005",
      harga: "5.000/pcs",
    },
    {
      id: 8,
      nama: "Inerson",
      merk: "Interbat",
      stok: 22,
      kode: "A006",
      harga: "54.000/pcs",
    },
    {
      id: 9,
      nama: "Lodia Loperamide HCL",
      merk: "Sanbe",
      stok: 26,
      kode: "B003",
      harga: "38.000/pcs",
    },
    {
      id: 10,
      nama: "Kursi Roda",
      merk: "GEA",
      stok: 8,
      kode: "D001",
      harga: "380.000/pcs",
    },
  ];

  return (
    <Layout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Breadcrumb */}
        <Breadcrumb pageName="Produk" />

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            Tambah Produk <TiPlusOutline className="size-5" />
          </Button>

          <div className="flex gap-2">
            <div className="flex items-center bg-[#6499E9A6] p-2 rounded-lg">
              <IoIosSearch className="text-white" />
              <input
                type="text"
                placeholder="Cari"
                className="bg-transparent outline-none ml-2 text-sm placeholder-white text-white"
              />
            </div>
            <Filter />
          </div>
        </div>

        {/* Tabel Produk */}
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#A7CAF3] text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nama Produk</th>
                <th className="px-4 py-2">Merk Produk</th>
                <th className="px-4 py-2">Stok Barang</th>
                <th className="px-4 py-2">Kode Produk</th>
                <th className="px-4 py-2">Harga</th>
                <th className="px-4 py-2 text-center">Aksi</th>
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
                  <td className="px-4 py-2">
                    <div className="flex justify-center gap-2">
                      <TbEdit className="size-5 cursor-pointer" />
                      <GoTrash className="size-5 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination />
      </div>
    </Layout>
  );
}
