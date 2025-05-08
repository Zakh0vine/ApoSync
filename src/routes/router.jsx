import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "@/pages/landingPage";
import Login from "@/pages/auth/login";
import Staff from "@/pages/staff/index";
import Dashboard from "@/pages/dashboard";
import Notification from "@/pages/notification";
import Product from "@/pages/products/index";
import IncomingProduct from "@/pages/products/incomingProduct";
import OutcomingProduct from "@/pages/products/outcomingProduct";
import History from "@/pages/history";
import PharmacyReport from "@/pages/superAdmin/pharmacyReport";
import UserSetting from "@/pages/superAdmin/userSetting";

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
      path: "/staff",
      element: <Staff />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/notifikasi",
      element: <Notification />,
    },
    {
      path: "/produk",
      element: <Product />,
    },
    {
      path: "/produk-masuk",
      element: <IncomingProduct />,
    },
    {
      path: "/produk-keluar",
      element: <OutcomingProduct />,
    },
    {
      path: "/riwayat",
      element: <History />,
    },
    {
      path: "/laporan",
      element: <PharmacyReport />,
    },
    {
      path: "/user-manajemen",
      element: <UserSetting />,
    },
    {
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
