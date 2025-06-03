// src/pages/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Swal from "sweetalert2";

import LogoBesar from "@/assets/logo besar.png";
import Navbar from "@/components/auth/navbar";
import { Button } from "@/components/button";
import { authSchema } from "@/utils/api/auth/schema";
import { useToken } from "@/utils/context/tokenContext";
import { login } from "@/utils/api/auth/api";
import { Input } from "@/components/forms/input";

export default function Login() {
  const navigate = useNavigate();
  const { saveTokenAndUser } = useToken();
  const [showPassword, setShowPassword] = useState(false);

  // Konfigurasi React Hook Form dengan Zod:
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  // Handler saat form submit
  const onSubmit = async (data) => {
    try {
      // Panggil API login(email, password)
      const result = await login(data.email, data.password);

      // Simpan token ke localStorage (atau sesuai kebutuhan)
      localStorage.setItem("accessToken", result.token);
      // Simpan user dan token di context/global state
      saveTokenAndUser(result.token, result.user, true);

      // Arahkan ke dashboard
      navigate("/dashboard");
    } catch (error) {
      // Tangani semua jenis error (401, 500, dsb) dengan SweetAlert
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.message,
      });
    }
  };

  // Toggle tampilan password
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Konten Utama */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center px-4 py-6 md:py-0">
        {/* Bagian Kiri: Logo (hanya ditampilkan di layar medium ke atas) */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
          <div className="max-w-xs md:max-w-md w-full px-4 md:px-8">
            <img
              src={LogoBesar}
              alt="Dian Brata Medika"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* Bagian Kanan: Form Login */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">
              Selamat Datang!
            </h2>
            <p className="text-center text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              Mari kelola stok obat dengan lebih baik
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              {/* Input Email */}
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-gray-200"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </div>

              {/* Input Password dengan toggle show/hide */}
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Kata Sandi"
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-gray-200"
                  error={errors.password?.message}
                  {...register("password")}
                />
                {showPassword ? (
                  <IoEyeOffOutline
                    onClick={handleShowPassword}
                    className="w-5 h-5 absolute right-4 top-5 cursor-pointer text-gray-500"
                  />
                ) : (
                  <IoEyeOutline
                    onClick={handleShowPassword}
                    className="w-5 h-5 absolute right-4 top-5 cursor-pointer text-gray-500"
                  />
                )}
              </div>

              {/* Tombol Masuk */}
              <div className="mt-2">
                <Button
                  type="submit"
                  className="w-full rounded-lg font-semibold text-2xl"
                >
                  Masuk
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
