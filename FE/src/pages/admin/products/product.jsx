import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { TiPlusOutline } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import { GoTrash } from "react-icons/go";
import { IoIosSearch, IoMdClose, IoIosWarning } from "react-icons/io";

import { Button } from "@/components/button";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import Filter from "@/components/filter";
import Pagination from "@/components/pagination";
import { getProducts } from "@/utils/api/products/api";
import { Loader } from "@/components/loader";
import { useToast } from "@/utils/toastify/toastProvider";
import Delete from "@/utils/sweetalert/delete";
import Edit from "@/utils/sweetalert/edit";
import { formatNumber } from "@/utils/formatter/formatNumber";

export default function Produk() {
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredDetail, setFilteredDetail] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delayedFetchData = debounce(fetchData, 800);
    delayedFetchData();

    return () => delayedFetchData.cancel();
  }, []);

  async function fetchData() {
    try {
      const result = await getProducts();
      const productsData = result.data || result;
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="size-5" />
            <span className="ml-2">Gagal Mendapatkan Data</span>
          </div>
        ),
        description: <span className="ml-7">{error.message}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onClickEdit(id) {
    try {
      const result = await Edit({
        title: "Edit Data!",
        text: "Data yang sudah diedit dapat diedit kembali:)",
      });

      if (result.isConfirmed) {
        setIsLoading(true);
        navigate(`/produk-masuk/edit/${id}`);
      }
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="size-5" />
            <span className="ml-2">Gagal Mengedit Data!</span>
          </div>
        ),
        description: <span className="ml-7">{error.message}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onClickDelete(id) {
    try {
      const result = await Delete({
        title: "Hapus Data!",
        text: "Data yang terhapus tidak dapat dipulihkan!",
      });

      if (result.isConfirmed) {
        // setIsLoading(true);
        // navigate(`/produk-keluar`);
        setIsLoading(true);
        navigate(`/produk-keluar/${id}`);
      }
    } catch (error) {
      toast.addToast({
        variant: "destructive",
        title: (
          <div className="flex items-center">
            <IoIosWarning className="size-5" />
            <span className="ml-2">Gagal Menghapus Data!</span>
          </div>
        ),
        description: <span className="ml-7">{error.message}</span>,
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Product search handler
  const handleProductSearch = (e) => {
    const term = e.target.value;
    setProductSearch(term);

    let filtered = products;

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
          product.kodeProduk.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleFilterCategory = (category) => {
    setSelectedCategory(category);

    let filtered = products;

    // Jika kategori dipilih (bukan null), filter berdasarkan kategori
    if (category) {
      filtered = filtered.filter((product) => product.kategori === category);
    }

    // Terapkan filter pencarian jika ada
    if (productSearch.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.nama.toLowerCase().includes(productSearch.toLowerCase()) ||
          product.merk.toLowerCase().includes(productSearch.toLowerCase()) ||
          product.kodeProduk.toLowerCase().includes(productSearch.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleDetailSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!selectedProduct || !selectedProduct.stokBatch) return;

    if (term.trim() === "") {
      setFilteredDetail(selectedProduct.stokBatch);
    } else {
      const filtered = selectedProduct.stokBatch.filter((item) => {
        if (!item.tanggalExp) return false;
        const expDate = new Date(item.tanggalExp).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return expDate.toLowerCase().includes(term.toLowerCase());
      });
      setFilteredDetail(filtered);
    }
  };

  const openProductDetail = (product) => {
    if (product && Array.isArray(product.stokBatch)) {
      // Hanya ambil batch yang masih punya sisaStok > 0
      const availableBatches = product.stokBatch.filter((b) => b.sisaStok > 0);
      setSelectedProduct(product);
      setFilteredDetail(availableBatches);
    }
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
    setFilteredDetail([]);
    setSearchTerm("");
  };

  // Get current products for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <div className="bg-white p-4 md:mt-16 md:p-6 md:pt-10 mt-16 rounded-lg shadow-md w-full">
        {/* Breadcrumb */}
        <Breadcrumb pageName="Produk" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
          <Button
            onClick={() => navigate("/produk-masuk")}
            className="bg-[#23B000] hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto"
          >
            Tambah Produk <TiPlusOutline className="size-5" />
          </Button>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex items-center bg-[#6499E9A6] p-2 rounded-lg w-full sm:w-auto">
              <IoIosSearch className="text-white" />
              <input
                type="text"
                placeholder="Cari"
                value={productSearch}
                onChange={handleProductSearch}
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
                    <th className="px-4 py-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((item, index) => (
                      <tr
                        key={item.id}
                        className="even:bg-[#A7CAF3] bg-[#9ABCF0]"
                      >
                        <td className="px-4 py-2">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td
                          className="px-4 py-2 cursor-pointer hover:underline"
                          onClick={() => openProductDetail(item)}
                        >
                          {item.nama}
                        </td>
                        <td className="px-4 py-2">{item.merk}</td>
                        <td className="px-4 py-2">{item.stok}</td>
                        <td className="px-4 py-2">{item.kodeProduk}</td>
                        <td className="px-4 py-2">
                          Rp {formatNumber(item.hargaJual)}
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex justify-center gap-2">
                            <TbEdit
                              onClick={() => onClickEdit(item.id)}
                              className="size-5 cursor-pointer"
                            />
                            <GoTrash
                              onClick={() => onClickDelete(item.id)}
                              className="size-5 cursor-pointer"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-[#9ABCF0]">
                      <td colSpan="7" className="px-4 py-2 text-center">
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
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Modal/Popup */}
        {selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Semi-transparent dark background */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Modal Content */}
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto z-10 relative">
              {/* Modal Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 pt-4 px-4">
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                  <div className="flex items-center bg-[#6499E9A6] p-2 rounded-lg w-full sm:w-auto">
                    <IoIosSearch className="text-white" />
                    <input
                      type="text"
                      placeholder="Cari"
                      className="bg-transparent outline-none ml-2 text-base placeholder-white text-white w-full"
                      value={searchTerm}
                      onChange={handleDetailSearch}
                    />
                  </div>
                  <Filter />
                </div>
                <button
                  onClick={closeProductDetail}
                  className="text-gray-400 hover:text-gray-500 self-end sm:self-auto"
                >
                  <IoMdClose className="size-6" />
                </button>
              </div>

              {/* Modal Body with Table */}
              <div className="overflow-x-auto">
                <div className="w-full h-0.5 bg-[#6C757D] mb-3"></div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#A7CAF3] text-left">
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Nama Barang</th>
                      <th className="px-4 py-2">Merek Barang</th>
                      <th className="px-4 py-2">Kadaluwarsa</th>
                      <th className="px-4 py-2">Stok Barang</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDetail.length > 0 ? (
                      filteredDetail.map((entry, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? "bg-[#9ABCF0]" : "bg-[#A7CAF3]"
                          }
                        >
                          <td className="px-4 py-2">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td className="px-4 py-2">{selectedProduct.nama}</td>
                          <td className="px-4 py-2">{selectedProduct.merk}</td>
                          <td className="px-4 py-2">
                            {" "}
                            {new Date(entry.tanggalExp).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="px-4 py-2">{entry.sisaStok}</td>
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
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
