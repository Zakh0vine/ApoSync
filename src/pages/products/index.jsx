import { useState } from "react";
import { TiPlusOutline } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { GoTrash } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/button";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import Filter from "@/components/filter";
import Pagination from "@/components/pagination";

export default function Produk() {
  const navigate = useNavigate();
  const [selectedProductName, setSelectedProductName] = useState(null);

  const productEntryHistory = {
    "Obat Kumur Anti Septik": [
      {
        id: 1,
        nama: "Obat Kumur Anti Septik",
        merk: "Betadine",
        kadaluwarsa: "25-07-2028",
        stok: 10,
      },
      {
        id: 2,
        nama: "Obat Kumur Anti Septik",
        merk: "Betadine",
        kadaluwarsa: "01-12-2027",
        stok: 5,
      },
      {
        id: 3,
        nama: "Obat Kumur Anti Septik",
        merk: "Betadine",
        kadaluwarsa: "18-03-2026",
        stok: 10,
      },
    ],
    "Obat Anti Jamur": [
      {
        id: 1,
        nama: "Obat Anti Jamur",
        merk: "Fungoral",
        kadaluwarsa: "01-12-2027",
        stok: 8,
      },
      {
        id: 2,
        nama: "Obat Anti Jamur",
        merk: "Fungoral",
        kadaluwarsa: "22-04-2027",
        stok: 7,
      },
    ],
    "Antibiotik Penisilin": [
      {
        id: 1,
        nama: "Antibiotik Penisilin",
        merk: "Amoxicillin Trihydrate",
        kadaluwarsa: "18-03-2026",
        stok: 20,
      },
      {
        id: 2,
        nama: "Antibiotik Penisilin",
        merk: "Amoxicillin Trihydrate",
        kadaluwarsa: "10-02-2027",
        stok: 30,
      },
    ],
    "Obat Masuk Angin + Madu": [
      {
        id: 1,
        nama: "Obat Masuk Angin + Madu",
        merk: "Antangin JRG",
        kadaluwarsa: "05-11-2025",
        stok: 10,
      },
    ],
    "Obat Anti Inflamasi (OAINS)": [
      {
        id: 2,
        nama: "Obat Anti Inflamasi (OAINS)",
        merk: "Benostan",
        kadaluwarsa: "22-04-2027",
        stok: 18,
      },
    ],
    "Obat Anti Biang Keringat": [
      {
        id: 1,
        nama: "Obat Anti Biang Keringat",
        merk: "Caladine Lotion",
        kadaluwarsa: "30-09-2026",
        stok: 15,
      },
      {
        id: 2,
        nama: "Obat Anti Biang Keringat",
        merk: "Caladine Lotion",
        kadaluwarsa: "15-06-2025",
        stok: 15,
      },
    ],
    "Obat Sembelit": [
      {
        id: 1,
        nama: "Obat Sembelit",
        merk: "Dulcolax",
        kadaluwarsa: "15-06-2025",
        stok: 40,
      },
    ],
    Inerson: [
      {
        id: 1,
        nama: "Inerson",
        merk: "Interbat",
        kadaluwarsa: "10-02-2027",
        stok: 12,
      },
      {
        id: 2,
        nama: "Inerson",
        merk: "Interbat",
        kadaluwarsa: "20-08-2026",
        stok: 10,
      },
    ],
    "Lodia Loperamide HCL": [
      {
        id: 1,
        nama: "Lodia Loperamide HCL",
        merk: "Sanbe",
        kadaluwarsa: "20-08-2026",
        stok: 26,
      },
    ],
    "Kursi Roda": [
      { id: 1, nama: "Kursi Roda", merk: "GEA", kadaluwarsa: "N/A", stok: 8 },
    ],
  };

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

  const openProductHistory = (productName) => {
    setSelectedProductName(productName);
  };

  const closeProductHistory = () => {
    setSelectedProductName(null);
  };

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 md:pt-10 rounded-lg shadow-md w-full">
        {/* Breadcrumb */}
        <Breadcrumb pageName="Produk" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <Button
            onClick={() => navigate("/produk-masuk")}
            className="bg-[#23B000] hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto"
          >
            Tambah Produk <TiPlusOutline className="size-5" />
          </Button>

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
                  <th className="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {produkList.map((item) => (
                  <tr key={item.id} className="even:bg-[#A7CAF3] bg-[#9ABCF0]">
                    <td className="px-4 py-2">{item.id}</td>
                    <td
                      className="px-4 py-2 cursor-pointer hover:underline"
                      onClick={() => openProductHistory(item.nama)}
                    >
                      {item.nama}
                    </td>
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
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination />
        </div>

        {/* Product History Modal/Popup */}
        {selectedProductName && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Semi-transparent dark background */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={closeProductHistory}
            ></div>

            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto z-10 relative">
              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pt-4 px-4">
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
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
                <button
                  onClick={closeProductHistory}
                  className="text-gray-400 hover:text-gray-500 self-end sm:self-auto"
                >
                  <IoMdClose className="size-6" />
                </button>
              </div>

              {/* Modal Body with Table */}
              <div className="overflow-x-auto">
                <div className="w-full h-0.5 bg-[#6C757D] mb-3"></div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#A7CAF3] text-left">
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Nama Barang</th>
                      <th className="px-4 py-2">Merek Barang</th>
                      <th className="px-4 py-2">Kadaluwarsa</th>
                      <th className="px-4 py-2">Stok Barang</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productEntryHistory[selectedProductName]?.map(
                      (entry, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-[#9ABCF0]" : "bg-[#A7CAF3]"
                          }
                        >
                          <td className="px-4 py-2">{entry.id}</td>
                          <td className="px-4 py-2">{entry.nama}</td>
                          <td className="px-4 py-2">{entry.merk}</td>
                          <td className="px-4 py-2">{entry.kadaluwarsa}</td>
                          <td className="px-4 py-2">{entry.stok}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
