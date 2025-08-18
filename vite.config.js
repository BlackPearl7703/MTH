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
  theme: {
    extend: {
      fontFamily: {
         grenzeGotisch: ["'Grenze Gotisch'", "serif"], // <-- key matches class name
      },
    },
  },
   optimizeDeps: {
    include: ["@ffmpeg/ffmpeg"]
  },

  plugins: [react(), tailwindcss(), scrollbar],
});
