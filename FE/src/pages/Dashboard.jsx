import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false); // Simulasi status enrollment
  const navigate = useNavigate();

  useEffect(() => {
    if (isEnrolled) {
      navigate("/dashboard");
    }
  }, [isEnrolled, navigate]);

  if (!isEnrolled) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
            Menunggu Enrollment
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Akun Anda belum mendapatkan akses sebagai pegawai. Silakan tunggu
            persetujuan dari owner.
          </p>
          <button
            className="w-full bg-gray-400 text-white p-3 rounded-lg font-medium cursor-not-allowed"
            disabled
          >
            Menunggu Persetujuan
          </button>
          <button
            onClick={() => setIsEnrolled(true)}
            className="w-full mt-4 bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Simulasi Disetujui
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Dashboard Pegawai
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Selamat datang! Anda telah ter-enroll sebagai pegawai.
        </p>
        <button
          className="w-full bg-red-500 text-white p-3 rounded-lg font-medium hover:bg-red-600 transition"
          onClick={() => {
            setIsEnrolled(false);
            navigate("/"); // Mengarahkan kembali ke halaman login
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
