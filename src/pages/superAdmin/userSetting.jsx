import { useState } from "react";
import { TiPlusOutline } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { GoTrash } from "react-icons/go";

import { Button } from "@/components/button";
import Layout from "@/components/Layout";
import Pagination from "@/components/pagination";
import Modal from "@/components/modal";
import Staff from "@/pages/staff/index";

export default function UserSetting() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const produkList = [
    {
      no: 1,
      nama: "Fasha Agatha",
      role: "Admin Staff",
      kontak: "fashaagatha@gmail.com",
      status: "Aktif",
    },
    {
      no: 2,
      nama: "Aditya Setiawan",
      role: "Admin Staff",
      kontak: "adityasetiawan@gmail.com",
      status: "Aktif",
    },
    {
      no: 3,
      nama: "Gaga",
      role: "Admin Staff",
      kontak: "gaga@gmail.com",
      status: "Aktif",
    },
  ];

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 md:pt-10 rounded-lg shadow-md w-full">
        <h1 className="text-xl md:text-2xl font-bold mb-5 md:mb-10 pt-3 md:pt-5 text-center">
          User Manajemen
        </h1>
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#23B000] hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto"
          >
            Tambah Staff <TiPlusOutline className="size-5" />
          </Button>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex items-center bg-[#6499E9A6] p-2 rounded-lg w-full sm:w-auto">
              <IoIosSearch className="text-white" />
              <input
                type="text"
                placeholder="Cari"
                className="bg-transparent outline-none ml-2 text-base placeholder-white text-white w-full"
              />
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto block">
          <div className="min-w-max w-full">
            <div className="w-full h-0.5 bg-[#6C757D] mb-3"></div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#A7CAF3] text-left">
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Nama User</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2 text-center">Kontak</th>
                  <th className="px-4 py-2 text-center">Status</th>
                  <th className="px-4 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {produkList.map((item) => (
                  <tr key={item.no} className="even:bg-[#A7CAF3] bg-[#9ABCF0]">
                    <td className="px-4 py-2">{item.no}</td>
                    <td className="px-4 py-2">{item.nama}</td>
                    <td className="px-4 py-2">{item.role}</td>
                    <td className="px-4 py-2 text-center">{item.kontak}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-3 py-1 text-sm rounded-md font-semibold text-white ${
                          item.status === "Aktif"
                            ? "bg-[#23B000]"
                            : "bg-[#F02626]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-center gap-2">
                        <TbEdit
                          onClick={() => setIsModalOpen(true)}
                          className="size-5 cursor-pointer"
                        />
                        <GoTrash className="size-5 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Staff isModal={true} onClose={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </Layout>
  );
}
