import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastProvider } from "./utils/toastify/toastProvider";
import { TokenProvider } from "./utils/context/tokenContext";
import "./styles/index.css";
import Router from "@/routes/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenProvider>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </TokenProvider>
  </StrictMode>
);
