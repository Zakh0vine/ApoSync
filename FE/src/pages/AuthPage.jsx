import { useState } from "react";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">
          {isSignUp ? "Buat Akun" : "Masuk"}
        </h2>
        <form className="w-full space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Kata Sandi"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition">
            {isSignUp ? "Daftar" : "Masuk"}
          </button>
        </form>
        <div className="text-center my-4 text-gray-500">atau</div>
        <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg p-3 hover:bg-gray-100 transition">
          <img
            src="/google-logo.png"
            alt="Google Logo"
            className="w-6 h-6 mr-2"
          />
          Lanjutkan dengan Google
        </button>
        <p className="text-center mt-4 text-gray-600">
          {isSignUp ? "Sudah punya akun?" : "Belum punya akun?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-500 hover:underline ml-1"
          >
            {isSignUp ? "Masuk" : "Daftar"}
          </button>
        </p>
      </div>
    </div>
  );
}
