import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Helps Vercel resolve index.html -> /src correctly during build
  root: ".",
  server: {
    port: 5173,
    strictPort: true,
  },
  esbuild: {
    loader: "jsx",
  },
});
