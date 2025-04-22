import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

import Logo from "@/assets/logo.png";

export default function footer() {
  return (
    <footer className="bg-[#0E3053] text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo dan Deskripsi */}
        <div className="flex flex-col items-center md:items-start">
          <img src={Logo} alt="Logo" className="w-20 mb-4" />
          <p className="text-lg text-gray-300 max-w-sm">
            Kami berkomitmen untuk terus dapat memberikan manfaat maksimal bagi
            apotek independen di seluruh Indonesia.
          </p>
        </div>

        {/* Menu Fitur */}
        <div className="flex justify-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-3">Fitur</h3>
            <ul className="text-gray-300 space-y-2">
              <li>
                <a href="#" className="hover:text-white text-lg">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white text-lg">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-white text-lg">
                  Tentang Apotek
                </a>
              </li>
              <li>
                <a href="#informasi" className="hover:text-white text-lg">
                  Lokasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Form dan Sosial Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold">Join social platform</h3>
          <div className="flex space-x-4 mt-3 justify-center md:justify-start">
            <a
              href="https://www.instagram.com/dianbratamedikaofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <RiInstagramFill size={25} />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <FaFacebookF size={25} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <FaTwitter size={25} />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <FaYoutube size={25} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
