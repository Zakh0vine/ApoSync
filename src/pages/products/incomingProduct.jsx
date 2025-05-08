import React from "react";
import Layout from "@/components/layout";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { useNavigate } from "react-router-dom";

export default function IncomingProduct() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-4 md:p-6">
        <Breadcrumb pageName="Produk Masuk" />

        {/* Tab */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            onClick={() => navigate("/produk-masuk")}
            className={`px-4 py-2 rounded-md font-semibold ${
              window.location.pathname === "/produk-masuk"
                ? "bg-[#6499E9] text-white hover:bg-blue-500"
                : "bg-transparent border border-[#6499E9] !text-[#6499E9] hover:bg-transparent hover:text-[#6499E9] hover:border-[#6499E9]"
            }`}
          >
            Produk Masuk
          </Button>
          <Button
            onClick={() => navigate("/produk-keluar")}
            className={`px-4 py-2 rounded-md font-semibold ${
              window.location.pathname === "/produk-keluar"
                ? "bg-[#6499E9] text-white hover:bg-blue-500"
                : "bg-transparent border border-[#6499E9] !text-[#6499E9] hover:bg-transparent hover:text-[#6499E9] hover:border-[#6499E9]"
            }`}
          >
            Produk Keluar
          </Button>
        </div>

        {/* Form */}
        <div className="border p-4 md:p-6 bg-white rounded-md">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Nama Produk */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Nama Produk</label>
              <input
                type="text"
                className="border border-black p-2 rounded-md"
              />
            </div>

            {/* Harga */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Harga</label>
              <input
                type="number"
                className="border border-black p-2 rounded-md"
              />
              <label className="mt-3 flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4" />
                Sudah termasuk PPN 11%
              </label>
            </div>

            {/* Merk */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Merk</label>
              <input
                type="text"
                className="border border-black p-2 rounded-md"
              />
            </div>

            {/* Tanggal Masuk */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Tanggal Masuk</label>
              <input
                type="date"
                className="border border-black p-2 rounded-md"
              />
            </div>

            {/* Kategori */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Kategori</label>
              <select className="border border-black p-2 rounded-md">
                <option value="">Pilih Kategori</option>
                <option value="makanan">Obat Bebas</option>
                <option value="minuman">Obat Keras</option>
                <option value="minuman">Konsi</option>
                <option value="minuman">Alkes</option>
              </select>
            </div>

            {/* Kadaluwarsa */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Kadaluwarsa</label>
              <input
                type="date"
                className="border border-black p-2 rounded-md"
              />
            </div>

            {/* Kode Produk */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Kode Produk</label>
              <input
                type="text"
                className="border border-black p-2 rounded-md"
              />
            </div>

            {/* Stok */}
            <div className="flex flex-col">
              <label className="mb-2 font-semibold">Stok per pcs</label>
              <input
                type="number"
                className="border border-black p-2 rounded-md"
              />
            </div>
          </form>

          {/* Tombol */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              onClick={() => navigate("/produk")}
              type="button"
              className="bg-transparent border border-[#6499E9] !text-[#6499E9] rounded-md px-6 py-2.5 font-semibold hover:bg-transparent transition"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-[#6499E9] hover:bg-blue-600 text-white rounded-md px-6 py-2.5 font-semibold transition"
            >
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
