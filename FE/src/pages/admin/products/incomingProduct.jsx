import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";

import Layout from "@/components/layout";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { Input } from "@/components/forms/input";
import { Select } from "@/components/forms/select";
import { DateInput } from "@/components/forms/dateInput";
import { InComingSchema } from "@/utils/api/products/inComingSchema";
import {
  createProduct,
  createProductIn,
  updateProduct,
  getProductId,
} from "@/utils/api/products/api";
import { useToast } from "@/utils/toastify/toastProvider";
import { Loader } from "@/components/loader";

export default function IncomingProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(InComingSchema),
    defaultValues: {
      hargaModal: 0,
      stok: 0,
      sudahTermasukPPN: false,
    },
  });

  const sudahTermasukPPN = watch("sudahTermasukPPN");

  useEffect(() => {
    if (id !== undefined) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  async function fetchData() {
    try {
      setIsLoading(true);
      const result = await getProductId(id);

      if (result.data) {
        const data = result.data;
        setSelectedId(data.id);
        setValue("nama", data.nama);
        setValue("merk", data.merk);
        setValue("hargaModal", data.hargaModal);
        setValue("kodeProduk", data.kodeProduk);
      }
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="size-5" />
            <span className="ml-2">Gagal Mendapatkan Data</span>
          </div>
        ),
        description: <span className="ml-7">{error.message}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(data) {
    try {
      setIsLoading(true);

      // Create master product first
      const productData = {
        nama: data.nama,
        merk: data.merk,
        kodeProduk: data.kodeProduk,
        kategori: data.kategori,
        hargaModal: data.hargaModal,
        sudahTermasukPPN: data.sudahTermasukPPN,
      };

      await createProduct(productData);

      // Then create batch if stok > 0
      if (data.stok > 0) {
        const batchData = {
          kodeProduk: data.kodeProduk,
          jumlah: data.stok,
          userId: user?.id || null,
          tanggalMasuk: data.tanggalMasuk,
          tanggalExp: data.tanggalExp,
        };

        await createProductIn(batchData);
      }
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
        description: <span className="ml-7">{error.message}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmitEdit(data) {
    try {
      setIsLoading(true);

      const updateData = {
        id: selectedId,
        nama: data.nama,
        merk: data.merk,
        kodeProduk: data.kodeProduk,
        hargaModal: data.hargaModal,
        sudahTermasukPPN: data.sudahTermasukPPN,
      };
      await updateProduct(updateData);

      toast.addToast({
        variant: "edited",
        title: (
          <div className="flex items-center">
            <FaRegCheckCircle className="size-5" />
            <span className="ml-2">Data Telah Diedit</span>
          </div>
        ),
        description: (
          <span className="ml-7">
            Data yang telah diedit dapat diedit kembali
          </span>
        ),
      });

      reset();
      navigate("/produk");
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="size-5" />
            <span className="ml-2">Gagal Memperbarui Produk</span>
          </div>
        ),
        description: <span className="ml-7">{error.message}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const isEditingProdukMasuk =
    location.pathname.startsWith("/produk-masuk/edit");
  const isMasukActive = location.pathname.startsWith("/produk-masuk");
  const isKeluarActive = location.pathname.startsWith("/produk-keluar");

  return (
    <Layout>
      <div className="p-4 md:p-6 md:pt-10 mt-14 sm:pt-14">
        <Breadcrumb pageName={selectedId === 0 ? "Input Stok" : "Edit Stok"} />

        {/* Tab */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            onClick={() => {
              if (!isEditingProdukMasuk) {
                navigate("/produk-masuk");
              }
            }}
            className={`px-4 py-2 rounded-md font-semibold ${
              isMasukActive
                ? "bg-[#6499E9] text-white hover:bg-blue-500"
                : "bg-transparent border border-[#6499E9] !text-[#6499E9] hover:bg-transparent hover:text-[#6499E9] hover:border-[#6499E9]"
            } ${isEditingProdukMasuk ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {selectedId !== 0 ? "Edit Produk" : "Produk Masuk"}
          </Button>

          <Button
            onClick={() => {
              if (!isEditingProdukMasuk && selectedId === 0) {
                navigate("/produk-keluar");
              }
            }}
            className={`px-4 py-2 rounded-md font-semibold ${
              isKeluarActive
                ? "bg-[#6499E9] text-white hover:bg-blue-500"
                : "bg-transparent border border-[#6499E9] !text-[#6499E9] hover:bg-transparent hover:text-[#6499E9] hover:border-[#6499E9]"
            } ${
              isEditingProdukMasuk || selectedId !== 0
                ? "opacity-50 cursor-not-allowed"
                : ""
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
              onSubmit={handleSubmit(
                selectedId === 0 ? onSubmit : onSubmitEdit
              )}
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

              {/* harga */}
              <div className="flex flex-col">
                <Input
                  id="hargaModal"
                  name="hargaModal"
                  label="Harga"
                  type="number"
                  error={errors.hargaModal?.message}
                  register={register}
                />
                <label className="mt-1 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    {...register("sudahTermasukPPN")}
                  />
                  Sudah termasuk PPN 11%
                </label>
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

              {/* Tanggal Masuk (hanya create) */}
              {selectedId === 0 && (
                <div className="flex flex-col">
                  <DateInput
                    id="tanggalMasuk"
                    name="tanggalMasuk"
                    label="Tanggal Masuk"
                    onDateChange={(date) => setValue("tanggalMasuk", date)}
                    register={register}
                    error={errors.tanggalMasuk?.message}
                    clearErrors={clearErrors}
                  />
                </div>
              )}

              {/* Kategori */}
              {selectedId === 0 && (
                <div className="flex flex-col">
                  <Select
                    id="kategori"
                    aria-label="kategori"
                    label="Kategori"
                    name="kategori"
                    options={[
                      "OBAT_BEBAS_TERBATAS",
                      "OBAT_KERAS",
                      "KONSI",
                      "ALKES",
                    ]}
                    register={register}
                    error={errors.kategori?.message}
                  />
                </div>
              )}

              {/* Kadaluwarsa */}
              {selectedId === 0 && (
                <div className="flex flex-col">
                  <DateInput
                    id="tanggalExp"
                    name="tanggalExp"
                    label="Kadaluarsa"
                    onDateChange={(date) => setValue("tanggalExp", date)}
                    register={register}
                    error={errors.tanggalExp?.message}
                    clearErrors={clearErrors}
                  />
                </div>
              )}

              {/* Kode Produk */}
              <div className="flex flex-col">
                <Input
                  id="kodeProduk"
                  name="kodeProduk"
                  label="Kode Produk"
                  type="text"
                  error={errors.kodeProduk?.message}
                  register={register}
                />
              </div>

              {/* Stok */}
              {selectedId === 0 && (
                <div className="flex flex-col">
                  <Input
                    id="stok"
                    name="stok"
                    label="Stok per pcs"
                    type="number"
                    error={errors.stok?.message}
                    register={register}
                  />
                </div>
              )}

              {/* Tombol */}
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
                  {isSubmitting ? (
                    <Loader size="sm" />
                  ) : selectedId === 0 ? (
                    "Simpan"
                  ) : (
                    "Perbarui"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
