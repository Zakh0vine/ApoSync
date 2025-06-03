// src/pages/outcomingProduct.jsx

import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
import {
  createProductOut,
  getProductId,
  getProducts,
} from "@/utils/api/products/api";
import { useToast } from "@/utils/toastify/toastProvider";
import { Loader } from "@/components/loader";

export default function OutcomingProduct() {
  const { id } = useParams(); // optional productId from route
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isMasterExisting, setIsMasterExisting] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    reset,
    setValue,
    watch,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(outComingSchema),
    defaultValues: {
      nama: "",
      merk: "",
      kategori: "",
      kodeProduk: "",
      harga: 0,
      stok: 0,
      tanggalKeluar: "",
      status: "",
    },
  });

  const kodeProdukValue = watch("kodeProduk");

  // enum-aligned options
  const kategoriOptions = ["OBAT_BEBAS", "OBAT_KERAS", "KONSI", "ALKES"];
  const statusOptions = ["TERJUAL", "RUSAK", "KADALUARSA", "TIDAK_SESUAI"];

  // 1) Jika route memiliki :id, langsung fetch dan prefill:
  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      setIsMasterExisting(false);
      return;
    }

    async function fetchForEdit() {
      try {
        setIsLoading(true);
        const response = await getProductId(id);
        const produk = response.data.data;
        // Prefill master fields
        setValue("kodeProduk", produk.kodeProduk);
        setValue("nama", produk.nama);
        setValue("merk", produk.merk);
        setValue("kategori", produk.kategori);
        setValue("harga", produk.hargaJual);
        setIsMasterExisting(true);
      } catch (error) {
        toast.addToast({
          variant: "destructive",
          title: (
            <div className="flex items-center">
              <IoIosWarning className="size-5" />
              <span className="ml-2">Gagal Mengambil Produk</span>
            </div>
          ),
          description: <span className="ml-7">{error.message}</span>,
        });
        setIsMasterExisting(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchForEdit();
  }, [id, setValue, toast]);

  // 2) Debounced cek kodeProduk saat user mengetik (tanpa id), untuk auto‐prefill:
  useEffect(() => {
    if (id) return; // sudah di‐prefill lewat param

    const checkExistence = async () => {
      if (!kodeProdukValue) {
        setValue("nama", "");
        setValue("merk", "");
        setValue("kategori", "");
        setValue("harga", 0);
        setIsMasterExisting(false);
        return;
      }

      try {
        setIsLoading(true);
        const allRes = await getProducts();
        const daftar = Array.isArray(allRes.data) ? allRes.data : allRes;
        const found = daftar.find(
          (p) => p.kodeProduk.toLowerCase() === kodeProdukValue.toLowerCase()
        );
        if (found) {
          setValue("nama", found.nama);
          setValue("merk", found.merk);
          setValue("kategori", found.kategori);
          setValue("harga", found.hargaJual);
          setIsMasterExisting(true);
        } else {
          setValue("nama", "");
          setValue("merk", "");
          setValue("kategori", "");
          setValue("harga", 0);
          setIsMasterExisting(false);
        }
      } catch {
        setValue("nama", "");
        setValue("merk", "");
        setValue("kategori", "");
        setValue("harga", 0);
        setIsMasterExisting(false);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(checkExistence, 500);
    return () => clearTimeout(timer);
  }, [kodeProdukValue, id, setValue]);

  // 3) Submit handler
  async function onSubmit(data) {
    try {
      setIsLoading(true);
      // Kirim hanya field yang dibutuhkan API produkout
      const payload = {
        kodeProduk: data.kodeProduk,
        jumlah: data.stok,
        userId: user?.id || null,
        tanggalKeluar: data.tanggalKeluar,
        status: data.status,
      };
      await createProductOut(payload);

      toast.addToast({
        title: (
          <div className="flex items-center">
            <FaRegCheckCircle className="size-5" />
            <span className="ml-2">Berhasil Menambahkan Produk Keluar</span>
          </div>
        ),
        description: <span className="ml-7">Stok berhasil dikurangi!</span>,
      });
      reset();
      navigate("/produk");
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="size-5" />
            <span className="ml-2">Gagal Menambahkan Produk Keluar</span>
          </div>
        ),
        description: <span className="ml-7">{error.message}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <div className="p-4 md:p-6 md:pt-10 mt-14 sm:pt-14">
        <Breadcrumb pageName="Produk Keluar" />

        {/* Tab Navigasi */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            onClick={() => navigate("/produk-masuk")}
            className={`px-4 py-2 rounded-md font-semibold ${
              location.pathname.startsWith("/produk-masuk")
                ? "bg-[#6499E9] text-white hover:bg-blue-500"
                : "bg-transparent border border-[#6499E9] !text-[#6499E9] hover:bg-transparent hover:text-[#6499E9] hover:border-[#6499E9]"
            }`}
          >
            Produk Masuk
          </Button>

          <Button
            onClick={() => navigate("/produk-keluar")}
            className={`px-4 py-2 rounded-md font-semibold ${
              location.pathname.startsWith("/produk-keluar")
                ? "bg-[#6499E9] text-white hover:bg-blue-500"
                : "bg-transparent border border-[#6499E9] !text-[#6499E9] hover:bg-transparent hover:text-[#6499E9] hover:border-[#6499E9]"
            }`}
          >
            Produk Keluar
          </Button>
        </div>

        {/* Form */}
        {isLoading ? (
          <Loader fullScreen={false} className="py-14" />
        ) : (
          <div className="border p-4 md:p-6 bg-white rounded-md">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              {/* Kode Produk */}
              <div className="flex flex-col">
                <Input
                  id="kodeProduk"
                  label="Kode Produk"
                  type="text"
                  error={errors.kodeProduk?.message}
                  {...register("kodeProduk")}
                />
              </div>

              {/* Nama Produk (auto‐prefill) */}
              <div className="flex flex-col">
                <Input
                  id="nama"
                  label="Nama Produk"
                  type="text"
                  error={errors.nama?.message}
                  {...register("nama")}
                  disabled={isMasterExisting}
                />
              </div>

              {/* Merk Produk (auto‐prefill) */}
              <div className="flex flex-col">
                <Input
                  id="merk"
                  label="Merk Produk"
                  type="text"
                  error={errors.merk?.message}
                  {...register("merk")}
                  disabled={isMasterExisting}
                />
              </div>

              {/* Harga Jual (auto‐prefill) */}
              <div className="flex flex-col">
                <Input
                  id="harga"
                  label="Harga Jual"
                  type="number"
                  error={errors.harga?.message}
                  {...register("harga", { valueAsNumber: true })}
                  disabled={isMasterExisting}
                />
              </div>

              {/* Tanggal Keluar */}
              <div className="flex flex-col">
                <DateInput
                  id="tanggalKeluar"
                  label="Tanggal Keluar"
                  register={register}
                  name="tanggalKeluar"
                  onDateChange={(date) => setValue("tanggalKeluar", date)}
                  error={errors.tanggalKeluar?.message}
                  clearErrors={clearErrors}
                />
              </div>

              {/* Kategori Produk (auto‐prefill) */}
              <div className="flex flex-col">
                <Select
                  id="kategori"
                  label="Kategori"
                  options={kategoriOptions}
                  error={errors.kategori?.message}
                  {...register("kategori")}
                  disabled={isMasterExisting}
                />
              </div>

              {/* Stok Keluar */}
              <div className="flex flex-col">
                <Input
                  id="stok"
                  label="Jumlah Keluar"
                  type="number"
                  error={errors.stok?.message}
                  {...register("stok", { valueAsNumber: true })}
                />
              </div>

              {/* Status Keluar */}
              <div className="flex flex-col">
                <Select
                  id="status"
                  label="Status"
                  options={statusOptions}
                  error={errors.status?.message}
                  {...register("status")}
                />
              </div>

              {/* Tombol Batal & Simpan */}
              <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                <Button
                  onClick={() => navigate("/produk")}
                  type="button"
                  className="bg-transparent border border-[#6499E9] !text-[#6499E9] rounded-md px-6 py-2.5 font-semibold hover:bg-transparent transition"
                  disabled={isSubmitting}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-[#6499E9] hover:bg-blue-600 text-white rounded-md px-6 py-2.5 font-semibold transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader size="sm" /> : "Simpan"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
