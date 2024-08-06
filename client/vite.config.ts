import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), TanStackRouterVite()],
  server: {
    proxy: {
      "/api": "http://localhost:5005", // Replace with your backend server URL
    },
  },
});
