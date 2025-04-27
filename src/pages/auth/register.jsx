import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "@/components/auth/navbar";
import LogoBesar from "@/assets/logo besar.png";
import { Button } from "@/components/button";

export default function Register() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center px-4 py-6 md:py-0">
        {/* Left side - Logo besar */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
          <div className="max-w-xs md:max-w-md w-full px-4 md:px-8">
            <img
              src={LogoBesar}
              alt="Dian Brata Medika"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* Right side - Register Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-2">
              Buat Akun Baru.
            </h2>
            <p className="text-center text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-[#00A9B4] font-semibold">
                Masuk.
              </Link>
            </p>

            <form className="space-y-4 md:space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Nama Depan"
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A9B4]"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Nama Belakang"
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A9B4]"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A9B4]"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Kata Sandi"
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A9B4]"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Konfirmasi Kata Sandi"
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00A9B4]"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-start text-base text-gray-600">
                <input type="checkbox" className="mr-2 mt-1" />
                <label>
                  Saya setuju untuk mengikuti Syarat dan Ketentuan serta
                  Kebijakan Privasi
                </label>
              </div>

              {/* Button */}
              <div className="pt-2">
                <Button
                  onClick={() => navigate("/masuk")}
                  className="w-full rounded-lg font-semibold text-2xl"
                >
                  Buat Akun
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
