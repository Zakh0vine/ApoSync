import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IoIosWarning } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";

import { Button } from "@/components/button";
import { useToast } from "@/utils/toastify/toastProvider";
import { Loader } from "@/components/loader";
import { createUser, updateUser } from "@/utils/api/userSetting/api";
import { Input } from "@/components/forms/input";
import { Select } from "@/components/forms/select";
import { UserSchema } from "@/utils/api/userSetting/schema";

export default function UserModal({ userData, onClose, onSuccess }) {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(0);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      harga: 0,
      stok: 0,
    },
  });

  useEffect(() => {
    if (userData) {
      setSelectedId(userData.id);
      setValue("nama_depan", userData.nama_depan);
      setValue("nama_belakang", userData.nama_belakang);
      setValue("kontak", userData.kontak);
      setValue("password", userData.password);
      setValue("konfirmasi_password", userData.konfirmasi_password);
      setIsLoading(false);
    }
  }, [userData, setValue]);

  async function onSubmit(data) {
    try {
      setIsLoading(true);

      if (userData) {
        // Edit mode
        await updateUser({ ...data, id: selectedId });

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
      } else {
        // Create mode
        await createUser(data);

        toast.addToast({
          title: (
            <div className="flex items-center">
              <FaRegCheckCircle className="size-5" />
              <span className="ml-2">Berhasil Menambahkan User</span>
            </div>
          ),
          description: (
            <span className="ml-7">Data user berhasil ditambahkan!</span>
          ),
        });
      }

      reset();
      onSuccess();
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="size-5" />
            <span className="ml-2">Gagal Menyimpan User</span>
          </div>
        ),
        description: (
          <span className="ml-7">
            Terjadi kesalahan saat menyimpan data user!
          </span>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold">
            {userData ? "Edit Staff" : "Input Staff"}
          </h1>
        </div>

        {/* Form Fields */}
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* First Name & Last Name */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col w-full">
                <Input
                  id="nama_depan"
                  name="nama_depan"
                  label="Nama Depan"
                  type="text"
                  error={errors.nama_depan?.message}
                  register={register}
                />
              </div>
              <div className="flex flex-col w-full">
                <Input
                  id="nama_belakang"
                  name="nama_belakang"
                  label="Nama Belakang"
                  type="text"
                  error={errors.nama_belakang?.message}
                  register={register}
                />
              </div>
            </div>

            <div className="flex flex-col relative">
              <Input
                id="kontak"
                name="kontak"
                label="Kontak"
                type="text"
                error={errors.kontak?.message}
                register={register}
              />
            </div>

            <div className="flex flex-col relative">
              <Select
                id="role"
                aria-label="role"
                label="Role"
                name="role"
                options={["Admin Staff", "Staff PKL"]}
                register={register}
                error={errors.role?.message}
              />
            </div>

            <div className="flex flex-col relative">
              <Select
                id="status"
                aria-label="status"
                label="Status"
                name="status"
                options={["Aktif", "Non-aktif"]}
                register={register}
                error={errors.status?.message}
              />
            </div>

            <div className="flex flex-col relative">
              <Input
                id="password"
                name="password"
                label="Kata Sandi"
                type="password"
                error={errors.password?.message}
                register={register}
              />
            </div>

            <div className="flex flex-col relative">
              <Input
                id="konfirmasi_password"
                name="konfirmasi_password"
                label="Ulangi Kata Sandi"
                type="password"
                error={errors.konfirmasi_password?.message}
                register={register}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
              <Button
                onClick={onClose}
                type="button"
                className="border border-[#6499E9] !text-[#6499E9] hover:bg-blue-50 bg-transparent rounded-md px-6 py-2.5 text-base font-semibold w-full sm:w-auto"
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-[#6499E9] hover:bg-blue-600 text-white rounded-md px-6 py-2.5 text-base font-semibold w-full sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader size="sm" />
                ) : userData ? (
                  "Perbarui"
                ) : (
                  "Simpan"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
