import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" garante que os assets carreguem corretamente quando o app
// for hospedado em um subdiretório (ex.: GitHub Pages em /usuario/repo/).
export default defineConfig({
  plugins: [react()],
  base: "./",
});
