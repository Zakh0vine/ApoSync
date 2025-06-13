// src/pages/superAdmin/user/userModal.jsx

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
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function UserModal({ userData, onClose, onSuccess }) {
  const toast = useToast();
  const [selectedId, setSelectedId] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserSchema),
  });

  useEffect(() => {
    if (userData) {
      setSelectedId(userData.id);
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("role", userData.role);
    }
  }, [userData, setValue]);

  async function onSubmit(data) {
    try {
      const payload = { ...data, id: selectedId };

      if (userData) {
        // Edit mode
        await updateUser(payload);

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
        await createUser(payload);

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
        description: <span className="ml-7">{error.message}</span>,
      });
    }
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold">
            {userData ? "Edit Staff" : "Input Staff"}
          </h1>
        </div>

        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* First Name & Last Name */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col w-full">
                <Input
                  id="name"
                  label="Nama"
                  type="text"
                  error={errors.name?.message}
                  {...register("name")}
                />
              </div>
            </div>

            <div className="flex flex-col relative">
              <Input
                id="email"
                label="Kontak"
                type="text"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <div className="flex flex-col relative">
              <Select
                id="role"
                aria-label="role"
                label="Role"
                options={["KARYAWAN"]}
                error={errors.role?.message}
                {...register("role")}
              />
            </div>

            <div className="flex flex-col relative">
              <Input
                id="password"
                label="Kata Sandi"
                type={showPassword ? "text" : "password"}
                error={errors.password?.message}
                {...register("password")}
              />
              {showPassword ? (
                <IoEyeOffOutline
                  onClick={handleShowPassword}
                  className="w-5 h-5 absolute right-4 top-[42px] cursor-pointer text-gray-600"
                />
              ) : (
                <IoEyeOutline
                  onClick={handleShowPassword}
                  className="w-5 h-5 absolute right-4 top-[42px] cursor-pointer text-gray-600"
                />
              )}
            </div>

            <div className="flex flex-col relative">
              <Input
                id="konfirmasi_password"
                label="Ulangi Kata Sandi"
                type={showConfirmPassword ? "text" : "password"}
                error={errors.konfirmasi_password?.message}
                {...register("konfirmasi_password")}
              />
              {showConfirmPassword ? (
                <IoEyeOffOutline
                  onClick={handleShowConfirmPassword}
                  className="w-5 h-5 absolute right-4 top-[42px] cursor-pointer text-gray-600"
                />
              ) : (
                <IoEyeOutline
                  onClick={handleShowConfirmPassword}
                  className="w-5 h-5 absolute right-4 top-[42px] cursor-pointer text-gray-600"
                />
              )}
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
