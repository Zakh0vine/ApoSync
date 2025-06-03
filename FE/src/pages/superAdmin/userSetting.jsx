import { useEffect, useState, useMemo } from "react";
import { TiPlusOutline } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import { IoIosSearch, IoIosWarning } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { debounce } from "lodash";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/button";
import Layout from "@/components/layout";
import Pagination from "@/components/pagination";
import Modal from "@/components/modal";
import Breadcrumb from "@/components/breadcrumb";
import { getUser, deleteUser, toggleUser } from "@/utils/api/userSetting/api";
import { Loader } from "@/components/loader";
import { useToast } from "@/utils/toastify/toastProvider";
import Status from "@/utils/sweetalert/status";
import StaffModal from "@/pages/superAdmin/user/userModal";
import Delete from "@/utils/sweetalert/delete";

export default function UserSetting() {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const keywordFromURL = searchParams.get("search") || "";
    setUserSearch(keywordFromURL);
    fetchData(keywordFromURL);
  }, [searchParams]);

  async function fetchData(searchTerm = "") {
    try {
      setIsLoading(true);
      const result = await getUser();
      const sortedUsers = result.sort((userA, userB) => {
        const dateA = new Date(userA.createdAt);
        const dateB = new Date(userB.createdAt);
        return dateA - dateB;
      });
      setUser(sortedUsers);

      if (searchTerm.trim()) {
        searchUsers(searchTerm, sortedUsers);
      } else {
        setFilteredUser(sortedUsers);
      }
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="size-5" />
            <span className="ml-2">Gagal Mendapatkan Pengguna</span>
          </div>
        ),
        description: <span className="ml-7">{error.message}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleToggleStatus = async (user) => {
    const isAktif = user.isActive;

    const result = await Status({
      title: isAktif ? "Profil di Non-aktifkan" : "Aktifkan User?",
      text: `${
        isAktif
          ? "Data profil yang di non-aktif dapat diaktifkan kembali!"
          : "Data profil yang diaktifkan dapat di non-aktifkan kembali!"
      }`,
      status: isAktif ? "Aktif" : "Non-aktif",
    });

    if (result.isConfirmed) {
      try {
        setIsUpdatingStatus(user.id);

        const response = await toggleUser(user.id);
        const updatedUser = response.user;

        fetchData();

        const titleText = updatedUser.isActive
          ? "Berhasil mengaktifkan profil staff"
          : "Berhasil menon-aktifkan profil staff";

        const descriptionText = updatedUser.isActive
          ? "Data profil staff telah diaktifkan!"
          : "Data profil staff telah di non-aktifkan!";

        toast.addToast({
          title: (
            <div className="flex items-center">
              <FaRegCheckCircle className="size-5 text-[#23B000]" />
              <span className="ml-2">{titleText}</span>
            </div>
          ),
          description: <span className="ml-7">{descriptionText}</span>,
        });
      } catch (error) {
        toast.addToast({
          variant: "destructive",
          title: (
            <div className="flex items-center">
              <IoIosWarning className="size-5" />
              <span className="ml-2">Gagal Memperbarui Status</span>
            </div>
          ),
          description: (
            <span className="ml-7">
              Terjadi kesalahan saat memperbarui status pengguna.
            </span>
          ),
        });
      } finally {
        setIsUpdatingStatus(null);
      }
    }
  };

  async function onClickDelete(id) {
    try {
      const result = await Delete({
        title: "Hapus Pengguna!",
        text: "Pengguna yang terhapus tidak dapat dipulihkan!",
      });

      if (result.isConfirmed) {
        setIsLoading(true);
        await deleteUser(id);
        toast.addToast({
          variant: "deleted",
          title: (
            <div className="flex items-center">
              <FaRegCheckCircle className="size-5" />
              <span className="ml-2">Berhasil Menghapus Pengguna</span>
            </div>
          ),
          description: (
            <span className="ml-7">
              Pengguna yang dihapus tidak dapat dipulihkan!
            </span>
          ),
        });
        fetchData();
      }
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="size-5" />
            <span className="ml-2">Gagal Menghapus Pengguna!</span>
          </div>
        ),
        description: <span className="ml-7">Data pengguna gagal dihapus!</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleUserSearch = (e) => {
    const term = e.target.value;
    setUserSearch(term);

    if (term.trim() === "") {
      setSearchParams({});
      fetchData();
    } else {
      setSearchParams({ search: term });
      debouncedSearch(term);
    }
  };

  const searchUsers = (searchTerm, userData = user) => {
    const keyword = searchTerm.toLowerCase();

    const result = userData.filter((userItem) =>
      [userItem.name, userItem.role, userItem.email].some((field) =>
        (field || "").toLowerCase().includes(keyword)
      )
    );

    setFilteredUser(result);
    setCurrentPage(1);
  };

  const debouncedSearch = useMemo(() => debounce(searchUsers, 800), [user]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = filteredUser.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    fetchData();
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 md:pt-10 mt-16 rounded-lg shadow-md w-full">
        <Breadcrumb pageName="User Manajemen" />
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <Button
            onClick={handleAddUser}
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
                value={userSearch}
                onChange={handleUserSearch}
                className="bg-transparent outline-none ml-2 text-base placeholder-white text-white w-full"
              />
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto block">
          <div className="min-w-max w-full">
            <div className="w-full h-0.5 bg-[#6C757D] mb-3"></div>
            {isLoading ? (
              <Loader fullScreen={false} className="py-14" />
            ) : (
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
                  {currentItem.length > 0 ? (
                    currentItem.map((item, index) => (
                      <tr
                        key={item.id}
                        className="even:bg-[#A7CAF3] bg-[#9ABCF0]"
                      >
                        <td className="px-4 py-2">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.role}</td>
                        <td className="px-4 py-2 text-center">{item.email}</td>
                        <td className="px-4 py-2">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleToggleStatus(item)}
                              className={`px-3 py-1 text-sm rounded-md font-semibold flex items-center justify-center w-[100px] h-[36px] text-white ${
                                item.isActive === true
                                  ? "bg-[#23B000]"
                                  : "bg-[#F02626]"
                              }`}
                              disabled={isUpdatingStatus === item.id}
                            >
                              {isUpdatingStatus === item.id ? (
                                <Loader fullScreen={false} size="sm" />
                              ) : item.isActive ? (
                                "Aktif"
                              ) : (
                                "Non-aktif"
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex justify-center gap-2">
                            <TbEdit
                              onClick={() => handleEditUser(item)}
                              className="size-5 cursor-pointer"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-[#9ABCF0]">
                      <td colSpan="10" className="px-4 py-2 text-center">
                        Tidak ada data yang sesuai
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            totalItems={filteredUser.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={handlePageChange}
          />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <StaffModal
            userData={currentUser}
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleSuccess}
          />
        </Modal>
      </div>
    </Layout>
  );
}
