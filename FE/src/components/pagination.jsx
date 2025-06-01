import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  totalItems,
  itemsPerPage = 5,
  onPageChange,
  currentPage: externalCurrentPage,
  setCurrentPage: setExternalCurrentPage,
}) => {
  // Use local state if external control is not provided
  const [localCurrentPage, setLocalCurrentPage] = useState(1);

  // Determine if we're using external or local state
  const currentPage =
    externalCurrentPage !== undefined ? externalCurrentPage : localCurrentPage;
  const setCurrentPage = setExternalCurrentPage || setLocalCurrentPage;

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Change page handler
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Notify parent component when page changes
  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange]);

  // Handle auto-go to previous page if current page becomes invalid
  useEffect(() => {
    const newTotalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  }, [totalItems, currentPage, itemsPerPage, setCurrentPage]);

  // Create page buttons array
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3; // Show at most 3 page numbers

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-end mt-6">
      <div className="flex items-center gap-2 bg-[#2E2A55] rounded-lg px-4">
        {/* Left arrow button */}
        <button
          className={`text-[#A0A0C0] hover:text-white ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            className={`${
              pageNum === currentPage
                ? "bg-[#5598F0] text-white font-semibold"
                : "text-[#40D9FD] hover:bg-[#404080] hover:text-white"
            } w-8 h-10 rounded-md flex items-center justify-center`}
            onClick={() => handlePageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}

        {/* Right arrow button */}
        <button
          className={`text-[#A0A0C0] hover:text-white ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
