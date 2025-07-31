import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import scrollbar from "tailwind-scrollbar";
// https://vite.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
  },

  plugins: [react(), tailwindcss(), scrollbar],
});
