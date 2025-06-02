// FE/src/pages/Notification.jsx

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { getAllNotifications } from "@/utils/api/notif/api";
import { useToken } from "@/utils/context/tokenContext";

export default function Notification() {
  const { token } = useToken();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const data = await getAllNotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetch notifications:", err);
        setError(err.message || "Gagal memuat notifikasi");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  // Mapping warna berdasarkan type notifikasi
  const typeColorMap = {
    MASUK: {
      border: "border-green-500",
      badgeBg: "bg-green-100 text-green-800",
    },
    KELUAR: {
      border: "border-blue-500",
      badgeBg: "bg-blue-100 text-blue-800",
    },
    STOK_RENDAH: {
      border: "border-yellow-500",
      badgeBg: "bg-yellow-100 text-yellow-800",
    },
    EXPIRED: {
      border: "border-red-500",
      badgeBg: "bg-red-100 text-red-800",
    },
  };

  return (
    <Layout>
      <div className="sm:mt-16 mt-16 p-6 py-10 bg-white min-h-screen flex justify-center">
        <div className="w-full max-w-5xl">
          {/* Title */}
          <div className="relative flex items-center mb-8">
            <div className="w-10 h-10 bg-[#4C84FF40] rounded-full absolute -left-2"></div>
            <h1 className="text-2xl font-bold relative">Notifikasi</h1>
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-6 flex justify-center">
              <p className="text-gray-500">Memuat notifikasi…</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="py-6">
              <p className="text-red-500">Error: {error}</p>
            </div>
          )}

          {/* Daftar notifikasi */}
          {!loading && !error && (
            <div className="space-y-4">
              {notifications.length === 0 && (
                <p className="text-gray-600">Belum ada notifikasi.</p>
              )}

              {notifications.map((notif) => {
                // Default warna jika type tidak dikenali
                const {
                  border = "border-gray-300",
                  badgeBg = "bg-gray-100 text-gray-800",
                } = typeColorMap[notif.type] ?? {};

                return (
                  <div
                    key={notif.id}
                    className={`flex border ${border} rounded-lg shadow-sm overflow-hidden`}
                  >
                    {/* Strip warna di sebelah kiri */}
                    <div
                      className={`w-1 ${border.replace("border-", "bg-")}`}
                    ></div>

                    {/* Konten utama */}
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-4 text-base text-gray-800">
                          {notif.message}
                        </div>
                        {notif.tanggal && (
                          <div className="text-sm text-gray-500 whitespace-nowrap">
                            {new Date(notif.tanggal).toLocaleString("id-ID", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </div>
                        )}
                      </div>
                      {/* Badge type */}
                      <div className="mt-2">
                        <span
                          className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${badgeBg}`}
                        >
                          {notif.type.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
