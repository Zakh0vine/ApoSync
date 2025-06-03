import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import ProtectedRoute from "./protectedRoute";
import RoleProtectedRoute from "./roleProtected";
import LandingPage from "@/pages/landingPage";
import Login from "@/pages/auth/login";
import Dashboard from "@/pages/dashboard";
import Notification from "@/pages/notification";
import Product from "@/pages/admin/products/index";
import IncomingProduct from "@/pages/admin/products/incomingProduct";
import OutcomingProduct from "@/pages/admin/products/outcomingProduct";
import History from "@/pages/superAdmin/history";
import Report from "@/pages/superAdmin/report";
import UserSetting from "@/pages/superAdmin/userSetting";
import Unauthorized from "@/pages/unauthorized";
import NotFound from "@/pages/404NotFound";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/masuk",
      element: <Login />,
    },
    {
      // Semua yang membutuhkan login
      element: (
        <ProtectedRoute>
          <Outlet />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/notifikasi",
          element: <Notification />,
        },
        {
          path: "/riwayat",
          element: <History />,
        },
      ],
    },
    {
      // Superadmin only
      element: (
        <RoleProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
          <Outlet />
        </RoleProtectedRoute>
      ),
      children: [
        {
          path: "/laporan",
          element: <Report />,
        },
        {
          path: "/user-manajemen",
          element: <UserSetting />,
        },
      ],
    },
    {
      // Karyawan only
      element: (
        <RoleProtectedRoute allowedRoles={["KARYAWAN"]}>
          <Outlet />
        </RoleProtectedRoute>
      ),
      children: [
        {
          path: "/produk",
          element: <Product />,
        },
        {
          path: "/produk-masuk",
          element: <IncomingProduct />,
        },
        {
          path: "/produk-masuk/edit/:id",
          element: <IncomingProduct />,
        },
        {
          path: "/produk-keluar",
          element: <OutcomingProduct />,
        },
      ],
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}
