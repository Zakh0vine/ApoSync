import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "@/pages/landingPage";
import Register from "@/pages/auth/register";
import Login from "@/pages/auth/login";
import Profile from "@/pages/profile";
import Dashboard from "@/pages/dashboard";
import Notification from "@/pages/notification";
import Product from "@/pages/products/index";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/daftar",
      element: <Register />,
    },
    {
      path: "/masuk",
      element: <Login />,
    },
    {
      path: "/profile",
      element: <Profile />,
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
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
