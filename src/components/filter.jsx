import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between border border-[#6499E9] text-[#6499E9] p-2 rounded-lg text-sm font-semibold w-32"
      >
        Filter
        <MdOutlineKeyboardArrowDown className="size-5" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-32 rounded-md shadow-lg bg-transparent flex flex-col gap-1">
          <button className="bg-[#53DFB5] text-white font-semibold rounded-md py-1">
            Obat Bebas
          </button>
          <button className="bg-[#59C5F7] text-white font-semibold rounded-md py-1">
            Obat Keras
          </button>
          <button className="bg-[#A6D000] text-white font-semibold rounded-md py-1">
            Konsi
          </button>
          <button className="bg-[#FF949F] text-white font-semibold rounded-md py-1">
            Alkes
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
