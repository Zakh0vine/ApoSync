import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoIosWarning } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";

import Layout from "@/components/layout";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { Input } from "@/components/forms/input";
import { Select } from "@/components/forms/select";
import { DateInput } from "@/components/forms/dateInput";
import { outComingSchema } from "@/utils/api/products/outComingSchema";
import { createProduct } from "@/utils/api/products/api";
import { useToast } from "@/utils/toastify/toastProvider";

export default function OutcomingProduct() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(outComingSchema),
    defaultValues: {
      harga: 0,
      stok: 0,
    },
  });

  async function onSubmit(data) {
    try {
      await createProduct(data);
      toast.addToast({
        title: (
          <div className="flex items-center">
            <FaRegCheckCircle className="size-5" />
            <span className="ml-2">Berhasil Menambahkan Produk</span>
          </div>
        ),
        description: (
          <span className="ml-7">Data produk berhasil ditambahkan!</span>
        ),
      });
      reset();
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="size-5" />
            <span className="ml-2">Gagal Menambahkan Produk</span>
          </div>
        ),
        description: (
          <span className="ml-7">
            Data produk gagal ditambahkan! pastikan isi data dengan benar
          </span>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="p-4 md:p-6 md:pt-10 mt-14 sm:pt-14">
        <Breadcrumb pageName="Produk Keluar" />

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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            {/* Nama Produk */}
            <div className="flex flex-col">
              <Input
                id="nama"
                name="nama"
                label="Nama Produk"
                type="text"
                error={errors.nama?.message}
                register={register}
              />
            </div>

            {/* Harga */}
            <div className="flex flex-col">
              <Input
                id="harga"
                name="harga"
                label="Harga"
                type="number"
                error={errors.harga?.message}
                register={register}
              />
            </div>

            {/* Merk */}
            <div className="flex flex-col">
              <Input
                id="merk"
                name="merk"
                label="Merk"
                type="text"
                error={errors.merk?.message}
                register={register}
              />
            </div>

            {/* Tanggal Keluar */}
            <div className="flex flex-col">
              <DateInput
                id="tanggal_keluar"
                name="tanggal_keluar"
                label="Tanggal Keluar"
                onDateChange={(date) => setValue("tanggal_keluar", date)}
                register={register}
                error={errors.tanggal_keluar?.message}
                clearErrors={clearErrors}
              />
            </div>

            {/* Kategori */}
            <div className="flex flex-col">
              <Select
                id="kategori"
                aria-label="kategori"
                label="Kategori"
                name="kategori"
                options={["Obat Bebas", "Obat Keras", "Konsi", "Alkes"]}
                register={register}
                error={errors.kategori?.message}
              />
            </div>

            {/* Stok */}
            <div className="flex flex-col">
              <Input
                id="stok"
                name="stok"
                label="Stok"
                type="number"
                error={errors.stok?.message}
                register={register}
              />
            </div>

            {/* Kode Produk */}
            <div className="flex flex-col">
              <Input
                id="kode"
                name="kode"
                label="Kode Produk"
                type="text"
                error={errors.kode?.message}
                register={register}
              />
            </div>

            <div className="flex flex-col">
              <Select
                id="status"
                aria-label="status"
                label="Status"
                name="status"
                options={["Terjual", "Rusak", "Kadaluwarsa", "Tidak Sesuai"]}
                register={register}
                error={errors.status?.message}
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-4 mt-6">
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
          </form>

          {/* Tombol */}
        </div>
      </div>
    </Layout>
  );
}
