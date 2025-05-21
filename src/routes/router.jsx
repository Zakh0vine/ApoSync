import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "@/pages/landingPage";
import Login from "@/pages/auth/login";
import Staff from "@/pages/superAdmin/user/userModal";
import Dashboard from "@/pages/dashboard";
import Notification from "@/pages/notification";
import Product from "@/pages/admin/products/index";
import IncomingProduct from "@/pages/admin/products/incomingProduct";
import OutcomingProduct from "@/pages/admin/products/outcomingProduct";
import History from "@/pages/superAdmin/history";
import Report from "@/pages/superAdmin/report";
import UserSetting from "@/pages/superAdmin/userSetting";
import InactiveAccount from "@/pages/admin/account/inactive";

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
      path: "/produk-masuk/edit/:id",
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
      element: <Report />,
    },
    {
      path: "/user-manajemen",
      element: <UserSetting />,
    },
    {
      path: "/profile-nonaktif",
      element: <InactiveAccount />,
    },
    {
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
