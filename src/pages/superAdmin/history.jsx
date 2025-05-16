import { useEffect, useState } from "react";
import { IoIosSearch, IoIosWarning } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";

import Layout from "@/components/layout";
import Breadcrumb from "@/components/Breadcrumb";
import Filter from "@/components/filter";
import Pagination from "@/components/pagination";
import { getHistory } from "@/utils/api/history/api";
import { Loader } from "@/components/loader";
import { useToast } from "@/utils/toastify/toastProvider";

export default function History() {
  const toast = useToast();
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [historySearch, setHistorySearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getHistory();
      setHistory(result);
      setFilteredHistory(result);
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="size-5" />
            <span className="ml-2">Gagal Mendapatkan Riwayat</span>
          </div>
        ),
        description: (
          <span className="ml-7">Data riwayat tidak ditemukan!</span>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleHistorySearch = (e) => {
    const term = e.target.value;
    setHistorySearch(term);

    let filtered = history;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.kategori === selectedCategory
      );
    }

    if (term.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.nama.toLowerCase().includes(term.toLowerCase()) ||
          product.merk.toLowerCase().includes(term.toLowerCase()) ||
          product.kode.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredHistory(filtered);
    setCurrentPage(1);
  };

  const handleFilterCategory = (category) => {
    setSelectedCategory(category);

    let filtered = history;

    // Jika kategori dipilih (bukan null), filter berdasarkan kategori
    if (category) {
      filtered = filtered.filter((product) => product.kategori === category);
    }

    // Terapkan filter pencarian jika ada
    if (historySearch.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.nama.toLowerCase().includes(historySearch.toLowerCase()) ||
          product.merk.toLowerCase().includes(historySearch.toLowerCase()) ||
          product.kode.toLowerCase().includes(historySearch.toLowerCase())
      );
    }

    setFilteredHistory(filtered);
    setCurrentPage(1);
  };

  // Get current products for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = filteredHistory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 md:pt-10 mt-16  rounded-lg shadow-md w-full">
        {/* Breadcrumb */}
        <Breadcrumb pageName="Riwayat" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <h3 className="text-xl font-semibold">Riwayat Harian</h3>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex items-center bg-[#6499E9A6] p-2 rounded-lg w-full sm:w-auto">
              <IoIosSearch className="text-white" />
              <input
                type="text"
                placeholder="Cari"
                value={historySearch}
                onChange={handleHistorySearch}
                className="bg-transparent outline-none ml-2 text-base placeholder-white text-white w-full"
              />
            </div>
            <Filter
              onSelectCategory={handleFilterCategory}
              selectedCategory={selectedCategory}
            />
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
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Nama Produk</th>
                    <th className="px-4 py-2">Merk Produk</th>
                    <th className="px-4 py-2">Stok Barang</th>
                    <th className="px-4 py-2">Kode Produk</th>
                    <th className="px-4 py-2">Harga</th>
                    <th className="px-4 py-2">Tanggal</th>
                    <th className="px-4 py-2 text-center">Masuk/Keluar</th>
                    <th className="px-4 py-2">Nama PJ</th>
                  </tr>
                </thead>
                <tbody>
                  {currentHistory.length > 0 ? (
                    currentHistory.map((item) => (
                      <tr
                        key={item.id}
                        className="even:bg-[#A7CAF3] bg-[#9ABCF0]"
                      >
                        <td className="px-4 py-2">{item.id}</td>
                        <td className="px-4 py-2">{item.nama}</td>
                        <td className="px-4 py-2">{item.merk}</td>
                        <td className="px-4 py-2">{item.stok}</td>
                        <td className="px-4 py-2">{item.kode}</td>
                        <td className="px-4 py-2">{item.harga}</td>
                        <td className="px-4 py-2">{item.tanggal}</td>
                        <td className="px-4 py-2 text-center">
                          <span
                            className={`px-3 py-1 text-sm rounded-md font-semibold text-white ${
                              item.status === "Masuk"
                                ? "bg-[#23B000]"
                                : "bg-[#F02626]"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">{item.pj}</td>
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
            totalItems={filteredHistory.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
}
