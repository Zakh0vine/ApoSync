import { useState, useEffect, useRef } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const filterHistory = ({ onSelectCategory, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    onSelectCategory(category);
    setIsOpen(false); // Menutup dropdown setelah memilih
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between border border-[#6499E9] text-[#6499E9] p-2 rounded-lg text-base font-semibold w-full md:w-32"
      >
        Filter
        <MdOutlineKeyboardArrowDown className="size-5" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 md:left-auto md:right-auto mt-2 rounded-md shadow-lg bg-white flex flex-col gap-1 w-full md:w-32 p-1 z-10">
          <button
            onClick={() => handleSelect(null)}
            className={`border text-black font-normal rounded-md py-2 ${
              selectedCategory === null
                ? "!text-[#6499E9] border-[#6499E9] hover:bg-gray-200"
                : "bg-white border-[#D0D5DD] hover:bg-gray-200"
            }`}
          >
            Semua
          </button>
          {[
            "MASUK",
            "KELUAR",
            "RUSAK",
            "KADALUARSA",
            "TIDAK SESUAI",
            "TERJUAL",
          ].map((category) => (
            <button
              key={category}
              onClick={() => handleSelect(category)}
              className={`border text-black font-normal rounded-md py-2 ${
                selectedCategory === category
                  ? "!text-[#6499E9] border-[#6499E9] hover:bg-gray-200"
                  : "bg-white border-[#D0D5DD] hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default filterHistory;
