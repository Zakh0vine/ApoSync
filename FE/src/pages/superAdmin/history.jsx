import { useEffect, useMemo, useState } from "react";
import { IoIosSearch, IoIosWarning } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

import Layout from "@/components/layout";
import Breadcrumb from "@/components/breadcrumb";
import Filter from "@/components/filterhistory";
import Pagination from "@/components/pagination";
import { getHistory } from "@/utils/api/history/api";
import { Loader } from "@/components/loader";
import { useToast } from "@/utils/toastify/toastProvider";

export default function History() {
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil parameter dari URL saat pertama kali
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    setSearchTerm(search);
    setSelectedCategory(category);
    setDebouncedSearchTerm(search);
  }, [searchParams]);

  // Fetch data pertama kali
  useEffect(() => {
    const delayedFetchData = debounce(fetchData, 800);
    delayedFetchData();

    return () => delayedFetchData.cancel();
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      applyFilters(debouncedSearchTerm, selectedCategory);
    }
  }, [history, debouncedSearchTerm, selectedCategory]);

  async function fetchData() {
    try {
      setIsLoading(true);
      const result = await getHistory();
      setHistory(result.data);
      setFilteredHistory(result.data);
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="text-xl" />
            <span className="ml-2">Gagal Mendapatkan Riwayat</span>
          </div>
        ),
        description: <span className="ml-7">{error.message}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const applyFilters = (term, category) => {
    let temp = history;

    if (category) {
      if (category === "MASUK" || category === "KELUAR") {
        temp = temp.filter((item) => item.status === category);
      } else {
        temp = temp.filter((item) => item.subStatus === category);
      }
    }

    if (term.trim()) {
      const keyword = term.toLowerCase();
      temp = temp.filter(
        (item) =>
          item.namaProduk.toLowerCase().includes(keyword) ||
          item.merkProduk.toLowerCase().includes(keyword) ||
          item.kodeProduk.toLowerCase().includes(keyword)
      );
    }

    setFilteredHistory(temp);
    setCurrentPage(1);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((term) => {
        setDebouncedSearchTerm(term);
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          if (term.trim()) newParams.set("search", term);
          else newParams.delete("search");
          return newParams;
        });
      }, 500),
    [setSearchParams]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Fungsi pencarian
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  const handleFilterCategory = (category) => {
    setSelectedCategory(category);

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (category) newParams.set("category", category);
      else newParams.delete("category");
      return newParams;
    });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = filteredHistory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 md:pt-10 mt-16 rounded-lg shadow-md w-full">
        {/* Breadcrumb */}
        <Breadcrumb pageName="Riwayat" />

        {/* Header: title + search + filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <h3 className="text-xl font-semibold">Riwayat Harian</h3>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex items-center bg-[#6499E9A6] p-2 rounded-lg w-full sm:w-auto">
              <IoIosSearch className="text-white" />
              <input
                type="text"
                placeholder="Cari..."
                value={searchTerm}
                onChange={handleSearch}
                className="bg-transparent outline-none ml-2 text-base placeholder-white text-white w-full"
              />
            </div>

            <Filter
              onSelectCategory={handleFilterCategory}
              selectedCategory={selectedCategory}
              options={[
                { label: "Semua Status", value: "" },
                { label: "MASUK", value: "MASUK" },
                { label: "KELUAR", value: "KELUAR" },
                { label: "RUSAK", value: "RUSAK" },
                { label: "KADALUARSA", value: "KADALUARSA" },
                { label: "TIDAK SESUAI", value: "TIDAK SESUAI" },
                { label: "TERJUAL", value: "TERJUAL" },
              ]}
            />
          </div>
        </div>

        {/* Tabel Riwayat */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[1000px]">
            <div className="w-full h-0.5 bg-[#6C757D] mb-3"></div>
            {isLoading ? (
              <Loader fullScreen={false} className="py-14" />
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#A7CAF3] text-left">
                    <th className="px-4 py-2">No.</th>
                    <th className="px-4 py-2">Nama Produk</th>
                    <th className="px-4 py-2">Merk Produk</th>
                    <th className="px-4 py-2">Kode Produk</th>
                    <th className="px-4 py-2">Jumlah</th>
                    <th className="px-4 py-2">Harga</th>
                    <th className="px-4 py-2">Tanggal</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Sub-Status</th>
                    <th className="px-4 py-2">Penanggung Jawab</th>
                  </tr>
                </thead>
                <tbody>
                  {currentHistory.length > 0 ? (
                    currentHistory.map((item, idx) => (
                      <tr
                        key={`${item.tanggal}-${idx}`}
                        className={
                          idx % 2 === 0 ? "bg-[#9ABCF0]" : "bg-[#A7CAF3]"
                        }
                      >
                        <td className="px-4 py-2">
                          {indexOfFirstItem + idx + 1}
                        </td>
                        <td className="px-4 py-2">{item.namaProduk}</td>
                        <td className="px-4 py-2">{item.merkProduk}</td>
                        <td className="px-4 py-2">{item.kodeProduk}</td>
                        <td className="px-4 py-2">{item.jumlah}</td>
                        <td className="px-4 py-2">
                          {item.harga.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          })}
                        </td>
                        <td className="px-4 py-2">
                          {new Date(item.tanggal).toLocaleDateString("id-ID", {
                            dateStyle: "medium",
                          })}
                        </td>
                        <td className="px-4 py-2">
                          <span
                            className={`px-3 py-1 text-sm rounded-md font-semibold text-white ${
                              item.status === "MASUK"
                                ? "bg-[#23B000]"
                                : "bg-[#F02626]"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">{item.subStatus || "-"}</td>
                        <td className="px-4 py-2">{item.user}</td>
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
            setCurrentPage={handlePageChange}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
}
