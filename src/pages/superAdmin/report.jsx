import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

import reportImage from "@/assets/report.png";
import Layout from "@/components/Layout";
import Filter from "@/components/filter";
import { Button } from "@/components/button";
import Pagination from "@/components/pagination";
import { getReport } from "@/utils/api/report/api";

export default function PharmacyReport() {
  const [report, setReport] = useState([]);
  const [filteredReport, setFilteredReport] = useState([]);
  const [reportSearch, setReportSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [report2, setReport2] = useState([]);
  const [filteredReport2, setFilteredReport2] = useState([]);
  const [reportSearch2, setReportSearch2] = useState("");
  const [selectedCategory2, setSelectedCategory2] = useState("");
  const [currentPage2, setCurrentPage2] = useState(1);

  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getReport();
      setReport(result);
      setFilteredReport(result);
      setReport2(result);
      setFilteredReport2(result);
    } catch (error) {
      console.log(error.toString());
    }
  }

  const handleReportSearch = (e) => {
    const term = e.target.value;
    setReportSearch(term);

    let filtered = report;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.kategori === selectedCategory
      );
    }

    if (term.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.nama.toLowerCase().includes(term.toLowerCase()) ||
          product.merk.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredReport(filtered);
    setCurrentPage(1);
  };

  const handleFilterCategory = (category) => {
    setSelectedCategory(category);

    let filtered = report;

    // Jika kategori dipilih (bukan null), filter berdasarkan kategori
    if (category) {
      filtered = filtered.filter((product) => product.kategori === category);
    }

    // Terapkan filter pencarian jika ada
    if (reportSearch.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.nama.toLowerCase().includes(reportSearch.toLowerCase()) ||
          product.merk.toLowerCase().includes(reportSearch.toLowerCase()) ||
          product.kode.toLowerCase().includes(reportSearch.toLowerCase())
      );
    }

    setFilteredReport(filtered);
    setCurrentPage(1);
  };

  // Get current products for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReport = filteredReport.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReportSearch2 = (e) => {
    const term = e.target.value;
    setReportSearch2(term);

    let filtered = report2;

    if (selectedCategory2) {
      filtered = filtered.filter(
        (product) => product.kategori === selectedCategory2
      );
    }

    if (term.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.nama.toLowerCase().includes(term.toLowerCase()) ||
          product.merk.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredReport2(filtered);
    setCurrentPage2(1);
  };

  const handleFilterCategory2 = (category) => {
    setSelectedCategory2(category);

    let filtered = report2;

    if (category) {
      filtered = filtered.filter((product) => product.kategori === category);
    }

    if (reportSearch2.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.nama.toLowerCase().includes(reportSearch2.toLowerCase()) ||
          product.merk.toLowerCase().includes(reportSearch2.toLowerCase())
      );
    }

    setFilteredReport2(filtered);
    setCurrentPage2(1);
  };

  const indexOfLastItem2 = currentPage2 * itemsPerPage;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage;
  const currentReport2 = filteredReport2.slice(
    indexOfFirstItem2,
    indexOfLastItem2
  );

  const handlePageChange2 = (pageNumber) => {
    setCurrentPage2(pageNumber);
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

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-3">
          <div className="w-full sm:w-auto mt-2 sm:mt-0">
            <Button className="bg-[#23B000] hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold w-full sm:w-auto">
              Print Laporan
            </Button>
          </div>
        </div>
      </div>

      {/* Sisa Produk */}
      <div className="bg-white p-4 md:p-6 md:pt-10 rounded-lg shadow-md w-full">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <h3 className="text-xl font-semibold">Sisa Produk</h3>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex items-center bg-[#6499E9A6] p-2 rounded-lg w-full sm:w-auto">
              <IoIosSearch className="text-white" />
              <input
                type="text"
                placeholder="Cari"
                value={reportSearch}
                onChange={handleReportSearch}
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#A7CAF3] text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nama Produk</th>
                  <th className="px-4 py-2">Merk Produk</th>
                  <th className="px-4 py-2">Harga</th>
                  <th className="px-4 py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {currentReport.length > 0 ? (
                  currentReport.map((item) => (
                    <tr
                      key={item.id}
                      className="even:bg-[#A7CAF3] bg-[#9ABCF0]"
                    >
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.nama}</td>
                      <td className="px-4 py-2">{item.merk}</td>
                      <td className="px-4 py-2">{item.harga}</td>
                      <td className="px-4 py-2">{item.jumlah}</td>
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
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            totalItems={filteredReport.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Laba Keuntungan*/}
      <div className="bg-white p-4 md:p-6 md:pt-10 mt-10 rounded-lg shadow-md w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <h3 className="text-xl font-semibold">Laba Keuntungan</h3>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex items-center bg-[#6499E9A6] p-2 rounded-lg w-full sm:w-auto">
              <IoIosSearch className="text-white" />
              <input
                type="text"
                placeholder="Cari"
                value={reportSearch2}
                onChange={handleReportSearch2}
                className="bg-transparent outline-none ml-2 text-base placeholder-white text-white w-full"
              />
            </div>
            <Filter
              onSelectCategory={handleFilterCategory2}
              selectedCategory={selectedCategory2}
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto block">
          <div className="min-w-max w-full">
            <div className="w-full h-0.5 bg-[#6C757D] mb-3"></div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#A7CAF3] text-left">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Nama Produk</th>
                  <th className="px-4 py-2">Merk Produk</th>
                  <th className="px-4 py-2">Harga Modal+PPN</th>
                  <th className="px-4 py-2">Harga Jual+25%</th>
                  <th className="px-4 py-2">Total Keuntungan</th>
                </tr>
              </thead>
              <tbody>
                {currentReport2.length > 0 ? (
                  currentReport2.map((item) => (
                    <tr
                      key={item.id}
                      className="even:bg-[#A7CAF3] bg-[#9ABCF0]"
                    >
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.nama}</td>
                      <td className="px-4 py-2">{item.merk}</td>
                      <td className="px-4 py-2">{item.harga}</td>
                      <td className="px-4 py-2">{item.harga_jual}</td>
                      <td className="px-4 py-2">{item.jumlah}</td>
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
          </div>
        </div>

        <div className="mt-6">
          <Pagination
            totalItems={filteredReport2.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage2}
            setCurrentPage={setCurrentPage2}
            onPageChange={handlePageChange2}
          />
        </div>
      </div>
    </Layout>
  );
}
