import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "build", // Vercel will deploy this
    assetsDir: "assets", // keep this as is
  },
  server: {
    port: 5173,
  },
  base: "/", // ✅ use absolute paths for assets in production
});
