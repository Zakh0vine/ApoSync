import { IoArrowBack } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import Layout from "@/components/Layout";

export default function Profile() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Main Content Area */}
        <div className="max-w-3xl mx-auto px-4 py-4">
          {/* Header with Profile Picture */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <IoArrowBack className="size-5" />
              <h1 className="text-xl font-medium">Profile</h1>
            </div>
            {/* Profile Picture aligned with header */}
            <div className="relative">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <div className="absolute bottom-0 right-0 rounded-full p-1">
                <FaPencilAlt className="size-5 text-[#6499E9]" />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="w-full">
            <form className="flex flex-col gap-4">
              {/* First Name & Last Name */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col w-full">
                  <label className="mb-2 font-medium">Nama Depan</label>
                  <input
                    type="text"
                    defaultValue="Fasha"
                    className="border rounded-md p-2.5 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="mb-2 font-medium">Nama Belakang</label>
                  <input
                    type="text"
                    defaultValue="Agatha"
                    className="border rounded-md p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Email</label>
                <input
                  type="email"
                  defaultValue="fashaagatha@gmail.com"
                  className="border rounded-md p-2.5 focus:outline-none"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Kata Sandi</label>
                <input
                  type="password"
                  defaultValue="abcd1234"
                  className="border rounded-md p-2.5 focus:outline-none"
                />
              </div>

              {/* Edit Profile Button */}
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-[#6499E9] hover:bg-blue-600 text-white rounded-md px-6 py-2.5 text-sm"
                >
                  Edit Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
