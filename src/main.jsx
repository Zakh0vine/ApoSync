import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastProvider } from "./utils/toastify/toastProvider";
import "./styles/index.css";
import Router from "@/routes/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <Router />
    </ToastProvider>
  </StrictMode>
);
