import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const port = parseInt(process.env.VITE_PORT) || 5000;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: port,
  },
});
