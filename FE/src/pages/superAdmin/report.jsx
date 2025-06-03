import { useEffect, useState } from "react";
import { IoIosSearch, IoIosWarning } from "react-icons/io";

import reportImage from "@/assets/report.png";
import Layout from "@/components/Layout";
import { Button } from "@/components/button";
import Pagination from "@/components/pagination";
import {
  getReportPersediaan,
  getReportLaba,
  downloadReportPDF,
} from "@/utils/api/report/api";
import { Loader } from "@/components/loader";
import { useToast } from "@/utils/toastify/toastProvider";

export default function PharmacyReport() {
  const toast = useToast();

  // → State untuk Persediaan
  const [persediaan, setPersediaan] = useState([]);
  const [filteredPersediaan, setFilteredPersediaan] = useState([]);
  const [searchPersediaan, setSearchPersediaan] = useState("");
  const [currentPagePers, setCurrentPagePers] = useState(1);

  // → State untuk Laba Keuntungan
  const [laba, setLaba] = useState([]);
  const [filteredLaba, setFilteredLaba] = useState([]);
  const [searchLaba, setSearchLaba] = useState("");
  const [currentPageLaba, setCurrentPageLaba] = useState(1);

  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllReports();
  }, []);

  async function fetchAllReports() {
    try {
      setIsLoading(true);

      // 1) Ambil data Persediaan
      const persediaanData = await getReportPersediaan();

      // 2) Ambil data Laba
      const labaData = await getReportLaba();

      // Simpan ke state
      setPersediaan(persediaanData);
      setFilteredPersediaan(persediaanData);
      setLaba(labaData);
      setFilteredLaba(labaData);
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="text-xl text-red-600" />
            <span className="ml-2">Gagal Mendapatkan Laporan</span>
          </div>
        ),
        description: <span className="ml-7">Cek koneksi atau server.</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearchPers = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchPersediaan(term);

    let temp = persediaan;
    if (term !== "") {
      temp = temp.filter(
        (item) =>
          item.namaProduk.toLowerCase().includes(term) ||
          item.merekProduk.toLowerCase().includes(term) ||
          item.kodeProduk.toLowerCase().includes(term)
      );
    }
    setFilteredPersediaan(temp);
    setCurrentPagePers(1);
  };

  // Pagination Persediaan
  const idxLastPers = currentPagePers * itemsPerPage;
  const idxFirstPers = idxLastPers - itemsPerPage;
  const currentPersediaan = filteredPersediaan.slice(idxFirstPers, idxLastPers);
  const handlePageChangePers = (page) => setCurrentPagePers(page);

  const handleSearchLaba = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchLaba(term);

    let temp = laba;
    if (term !== "") {
      temp = temp.filter(
        (item) =>
          item.namaProduk.toLowerCase().includes(term) ||
          item.merekProduk.toLowerCase().includes(term)
      );
    }
    setFilteredLaba(temp);
    setCurrentPageLaba(1);
  };

  // Pagination Laba
  const idxLastLaba = currentPageLaba * itemsPerPage;
  const idxFirstLaba = idxLastLaba - itemsPerPage;
  const currentLaba = filteredLaba.slice(idxFirstLaba, idxLastLaba);
  const handlePageChangeLaba = (page) => setCurrentPageLaba(page);

  // Handler untuk tombol Download PDF
  const onClickDownload = async () => {
    try {
      // Panggil API, terima Blob
      const pdfBlob = await downloadReportPDF();

      // Buat object URL dan buat elemen <a> untuk mendownload
      const url = window.URL.createObjectURL(
        new Blob([pdfBlob], { type: "application/pdf" })
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "laporan.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Jika terjadi error (401, 500, dsb), tampilkan toast
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="text-xl text-red-600" />
            <span className="ml-2">Gagal Download PDF Laporan</span>
          </div>
        ),
        description: <span className="ml-7">Cek koneksi atau server.</span>,
      });
    }
  };

  return (
    <Layout>
      <div className="p-4 md:p-6 pb-6 md:pb-10 md:pt-10 mt-14 rounded-lg w-full mb-4 md:mb-6 text-center">
        <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 pt-3 md:pt-5">
          Laporan
        </h1>

        <div className="flex justify-center mb-3 md:mb-4">
          <img
            src={reportImage}
            alt="Ilustrasi Laporan"
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
          />
        </div>

        <div className="flex justify-center mb-3 md:mb-4">
          <Button
            className="bg-[#23B000] hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
            onClick={onClickDownload}
          >
            Download PDF Laporan
          </Button>
        </div>
      </div>

      {/* Bagian Tabel Persediaan */}
      <div className="bg-white p-4 md:p-6 md:pt-10 rounded-lg shadow-md w-full mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <h3 className="text-xl font-semibold">Sisa Produk</h3>

          <div className="flex items-center bg-[#6499E9A6] p-2 rounded-lg w-full sm:w-auto">
            <IoIosSearch className="text-white" />
            <input
              type="text"
              placeholder="Cari nama/merk/kode"
              value={searchPersediaan}
              onChange={handleSearchPers}
              className="bg-transparent outline-none ml-2 text-base placeholder-white text-white w-full"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-max w-full">
            <div className="w-full h-0.5 bg-[#6C757D] mb-3"></div>
            {isLoading ? (
              <Loader fullScreen={false} className="py-14" />
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#A7CAF3] text-left">
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2">Nama Produk</th>
                    <th className="px-4 py-2">Merk Produk</th>
                    <th className="px-4 py-2">Kode Produk</th>
                    <th className="px-4 py-2">Total Sisa Stok</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPersediaan.length > 0 ? (
                    currentPersediaan.map((item, idx) => (
                      <tr
                        key={`${item.kodeProduk}-${idx}`}
                        className="even:bg-[#A7CAF3] bg-[#9ABCF0]"
                      >
                        <td className="px-4 py-2">{idxFirstPers + idx + 1}</td>
                        <td className="px-4 py-2">{item.namaProduk}</td>
                        <td className="px-4 py-2">{item.merekProduk}</td>
                        <td className="px-4 py-2">{item.kodeProduk}</td>
                        <td className="px-4 py-2">{item.totalSisaStok}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-[#9ABCF0]">
                      <td colSpan="5" className="px-4 py-2 text-center">
                        Tidak ada data yang sesuai
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Pagination
            totalItems={filteredPersediaan.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPagePers}
            setCurrentPage={setCurrentPagePers}
            onPageChange={handlePageChangePers}
          />
        </div>
      </div>

      {/* Bagian Tabel Laba Keuntungan */}
      <div className="bg-white p-4 md:p-6 md:pt-10 rounded-lg shadow-md w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <h3 className="text-xl font-semibold">Laba Keuntungan (30 hari)</h3>

          <div className="flex items-center bg-[#6499E9A6] p-2 rounded-lg w-full sm:w-auto">
            <IoIosSearch className="text-white" />
            <input
              type="text"
              placeholder="Cari nama/merk"
              value={searchLaba}
              onChange={handleSearchLaba}
              className="bg-transparent outline-none ml-2 text-base placeholder-white text-white w-full"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-max w-full">
            <div className="w-full h-0.5 bg-[#6C757D] mb-3"></div>
            {isLoading ? (
              <Loader fullScreen={false} className="py-14" />
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#A7CAF3] text-left">
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2">Nama Produk</th>
                    <th className="px-4 py-2">Merk Produk</th>
                    <th className="px-4 py-2">Harga Modal</th>
                    <th className="px-4 py-2">Harga Jual</th>
                    <th className="px-4 py-2">Total Keuntungan</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLaba.length > 0 ? (
                    currentLaba.map((item, idx) => (
                      <tr
                        key={`${item.namaProduk}-${idx}`}
                        className="even:bg-[#A7CAF3] bg-[#9ABCF0]"
                      >
                        <td className="px-4 py-2">{idxFirstLaba + idx + 1}</td>
                        <td className="px-4 py-2">{item.namaProduk}</td>
                        <td className="px-4 py-2">{item.merekProduk}</td>
                        <td className="px-4 py-2">{item.hargaModal}</td>
                        <td className="px-4 py-2">{item.hargaJual}</td>
                        <td className="px-4 py-2">{item.totalKeuntungan}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-[#9ABCF0]">
                      <td colSpan="6" className="px-4 py-2 text-center">
                        Tidak ada data yang sesuai
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Pagination
            totalItems={filteredLaba.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPageLaba}
            setCurrentPage={setCurrentPageLaba}
            onPageChange={handlePageChangeLaba}
          />
        </div>
      </div>
    </Layout>
  );
}
