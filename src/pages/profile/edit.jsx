import { IoArrowBack } from "react-icons/io5";
import { FaPencilAlt, FaCheckSquare } from "react-icons/fa";

import Layout from "@/components/Layout";
import { Button } from "@/components/button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Main Content Area */}
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
          {/* Header with Profile Picture */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => navigate("/profile")}
                className="text-gray-600 hover:text-black"
              >
                <IoArrowBack className="size-5" />
              </button>
              <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>
            </div>
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full"></div>
              <div className="absolute bottom-0 right-0 rounded-full p-1 pb-2">
                <FaPencilAlt className="size-4 sm:size-5 text-[#6499E9]" />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="w-full">
            <form className="flex flex-col gap-6">
              {/* First Name & Last Name */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col w-full">
                  <label className="mb-2 text-base sm:text-lg font-medium">
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    defaultValue="Fasha"
                    className="border border-[#858585] rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="mb-2 text-base sm:text-lg font-medium">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    defaultValue="Agatha"
                    className="border border-[#858585] rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>

              {/* Email with check icon */}
              <div className="flex flex-col relative">
                <label className="mb-2 text-base sm:text-lg font-medium">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="fashaagatha@gmail.com"
                  className="border border-[#858585] rounded-md p-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <FaCheckSquare
                  className="absolute right-3 top-11 sm:top-12 text-green-500"
                  size={20}
                />
              </div>

              {/* Password with check icon */}
              <div className="flex flex-col relative">
                <label className="mb-2 text-base sm:text-lg font-medium">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  defaultValue="Abcd1234"
                  className="border border-[#858585] rounded-md p-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <FaCheckSquare
                  className="absolute right-3 top-11 sm:top-12 text-green-500"
                  size={20}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-start gap-4 mt-6">
                <Button
                  onClick={() => navigate("/profile")}
                  type="button"
                  className="border border-[#6499E9] !text-[#6499E9] hover:bg-blue-50 bg-transparent rounded-md px-6 py-2.5 text-base font-semibold w-full sm:w-auto"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="bg-[#6499E9] hover:bg-blue-600 text-white rounded-md px-6 py-2.5 text-base font-semibold w-full sm:w-auto"
                >
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
