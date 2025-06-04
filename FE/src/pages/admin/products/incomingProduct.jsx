// src/pages/incomingProduct.jsx

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
  getProducts,
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
    resolver: zodResolver(InComingSchema),
    defaultValues: {
      nama: "",
      merk: "",
      kategori: "",
      kodeProduk: "",
      hargaModal: 0,
      stok: 0,
      sudahTermasukPPN: false,
      tanggalMasuk: "",
      tanggalExp: "",
    },
  });

  const kodeProdukValue = watch("kodeProduk");
  const isEditing = Boolean(id);

  // Gunakan array string yang sama dengan enum backend
  const kategoriOptions = ["OBAT_BEBAS", "OBAT_KERAS", "KONSI", "ALKES"];

  // 1) Prefill saat edit (/produk-masuk/edit/:id)
  useEffect(() => {
    const fetchForEdit = async () => {
      try {
        setIsLoading(true);
        const response = await getProductId(id);
        const produk = response.data.data;
        setSelectedId(produk.id);

        setValue("nama", produk.nama);
        setValue("merk", produk.merk);
        setValue("hargaModal", produk.hargaModal);
        setValue("sudahTermasukPPN", true);
        setValue("kodeProduk", produk.kodeProduk);

        // Langsung set enum string
        setValue("kategori", produk.kategori);
        setIsMasterExisting(true);
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
    };

    if (isEditing) {
      fetchForEdit();
    } else {
      setIsLoading(false);
      setIsMasterExisting(false);
    }
  }, [id, isEditing, setValue, toast]);

  // 2) Debounced cek keberadaan kodeProduk untuk auto‐prefill saat create
  useEffect(() => {
    if (isEditing) return;

    const checkExistence = async () => {
      if (!kodeProdukValue) {
        setValue("nama", "");
        setValue("merk", "");
        setValue("hargaModal", 0);
        setValue("kategori", "");
        setValue("sudahTermasukPPN", false);
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
          setValue("hargaModal", found.hargaModal);
          setValue("kategori", found.kategori);
          setValue("sudahTermasukPPN", true);
          setIsMasterExisting(true);
        } else {
          setValue("nama", "");
          setValue("merk", "");
          setValue("hargaModal", 0);
          setValue("kategori", "");
          setValue("sudahTermasukPPN", false);
          setIsMasterExisting(false);
        }
      } catch {
        setValue("nama", "");
        setValue("merk", "");
        setValue("hargaModal", 0);
        setValue("kategori", "");
        setValue("sudahTermasukPPN", false);
        setIsMasterExisting(false);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(checkExistence, 500);
    return () => clearTimeout(timeoutId);
  }, [kodeProdukValue, isEditing, setValue]);

  // 3) Handler submit untuk create atau edit
  async function onSubmit(data) {
    try {
      setIsLoading(true);

      if (isEditing) {
        // Edit master produk
        const updateData = {
          id: selectedId,
          nama: data.nama,
          merk: data.merk,
          kodeProduk: data.kodeProduk,
          kategori: data.kategori, // sudah "OBAT_BEBAS" / "OBAT_KERAS"
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
      } else {
        // Create baru / tambahkan stok
        let masterExists = false;
        let existingProduk = null;
        try {
          const allRes = await getProducts();
          const daftar = Array.isArray(allRes.data) ? allRes.data : allRes;
          existingProduk = daftar.find(
            (p) => p.kodeProduk.toLowerCase() === data.kodeProduk.toLowerCase()
          );
          masterExists = Boolean(existingProduk);
        } catch {
          masterExists = false;
        }

        if (!masterExists) {
          const productData = {
            nama: data.nama,
            merk: data.merk,
            kodeProduk: data.kodeProduk,
            kategori: data.kategori, // tetap enum string
            hargaModal: data.hargaModal,
            sudahTermasukPPN: data.sudahTermasukPPN,
          };
          const createRes = await createProduct(productData);
          existingProduk = createRes.data;
        }

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
      }
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="size-5" />
            <span className="ml-2">
              {isEditing
                ? "Gagal Memperbarui Produk"
                : "Gagal Menambahkan Produk"}
            </span>
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
        <Breadcrumb pageName={isEditing ? "Edit Produk" : "Input Stok"} />

        {/* Tab Navigasi */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            onClick={() => {
              if (!isEditing) navigate("/produk-masuk");
            }}
            className={`px-4 py-2 rounded-md font-semibold ${
              location.pathname.startsWith("/produk-masuk")
                ? "bg-[#6499E9] text-white hover:bg-blue-500"
                : "bg-transparent border border-[#6499E9] !text-[#6499E9] hover:bg-transparent hover:text-[#6499E9] hover:border-[#6499E9]"
            } ${isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isEditing ? "Edit Produk" : "Produk Masuk"}
          </Button>

          <Button
            onClick={() => {
              if (!isEditing) navigate("/produk-keluar");
            }}
            className={`px-4 py-2 rounded-md font-semibold ${
              location.pathname.startsWith("/produk-keluar")
                ? "bg-[#6499E9] text-white hover:bg-blue-500"
                : "bg-transparent border border-[#6499E9] !text-[#6499E9] hover:bg-transparent hover:text-[#6499E9] hover:border-[#6499E9]"
            } ${isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
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
              {/* Nama Produk */}
              <div className="flex flex-col">
                <Input
                  id="nama"
                  label="Nama Produk"
                  type="text"
                  error={errors.nama?.message}
                  {...register("nama")}
                />
              </div>

              {/* Harga Modal */}
              <div className="flex flex-col">
                <Input
                  id="hargaModal"
                  label="Harga Modal"
                  type="number"
                  error={errors.hargaModal?.message}
                  disabled={!isEditing && isMasterExisting}
                  {...register("hargaModal", { valueAsNumber: true })}
                />
                <label className="mt-1 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    {...register("sudahTermasukPPN")}
                    disabled={!isEditing && isMasterExisting}
                  />
                  Sudah termasuk PPN 11%
                </label>
              </div>

              {/* Merk Produk */}
              <div className="flex flex-col">
                <Input
                  id="merk"
                  label="Merk"
                  type="text"
                  error={errors.merk?.message}
                  {...register("merk")}
                />
              </div>

              {/* Tanggal Masuk (hanya create) */}
              {!isEditing && (
                <div className="flex flex-col">
                  <DateInput
                    id="tanggalMasuk"
                    label="Tanggal Masuk"
                    register={register}
                    name="tanggalMasuk"
                    onDateChange={(date) => setValue("tanggalMasuk", date)}
                    error={errors.tanggalMasuk?.message}
                    clearErrors={clearErrors}
                  />
                </div>
              )}

              {/* Kategori */}
              <div className="flex flex-col">
                <Select
                  id="kategori"
                  label="Kategori"
                  options={kategoriOptions}
                  error={errors.kategori?.message}
                  {...register("kategori")}
                />
              </div>

              {/* Kadaluwarsa (hanya create) */}
              {!isEditing && (
                <div className="flex flex-col">
                  <DateInput
                    id="tanggalExp"
                    label="Kadaluarsa"
                    register={register}
                    name="tanggalExp"
                    onDateChange={(date) => setValue("tanggalExp", date)}
                    error={errors.tanggalExp?.message}
                    clearErrors={clearErrors}
                  />
                </div>
              )}

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

              {/* Stok (hanya create) */}
              {!isEditing && (
                <div className="flex flex-col">
                  <Input
                    id="stok"
                    label="Stok per pcs"
                    type="number"
                    error={errors.stok?.message}
                    {...register("stok", { valueAsNumber: true })}
                  />
                </div>
              )}

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
                  {isSubmitting ? (
                    <Loader size="sm" />
                  ) : isEditing ? (
                    "Perbarui"
                  ) : (
                    "Simpan"
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
