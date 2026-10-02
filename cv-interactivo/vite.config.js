import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" genera rutas relativas: la web funciona igual en
// https://luisff511.github.io/ que en https://luisff511.github.io/otro-repo/
export default defineConfig({
  plugins: [react()],
  base: "./",
});
