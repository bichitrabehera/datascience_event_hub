import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "build", // this folder will be deployed
    assetsDir: "assets", // default, ensure it matches
  },
  server: {
    port: 5173,
  },
  base: "./", // important for relative paths
});
