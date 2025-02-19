import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: "/src/components",
      pages: "/src/pages",
      src: "/src",
    },
  },
  plugins: [react()],
});
