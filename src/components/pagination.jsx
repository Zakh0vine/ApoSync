import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = () => {
  return (
    <div className="flex justify-end mt-6">
      <div className="flex items-center gap-2 bg-[#2E2A55] rounded-lg px-4">
        {/* Tombol panah kiri */}
        <button className="text-[#A0A0C0] hover:text-white">
          <FaChevronLeft size={16} />
        </button>

        {/* Halaman aktif */}
        <button className="bg-[#5598F0] text-white font-semibold w-8 h-10 rounded-md flex items-center justify-center">
          1
        </button>

        {/* Halaman lain */}
        <button className="text-[#40D9FD] w-8 h-10 rounded-md flex items-center justify-center hover:bg-[#404080] hover:text-white">
          2
        </button>

        {/* Tombol panah kanan */}
        <button className="text-[#A0A0C0] hover:text-white">
          <FaChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
