import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
    global: "window",  // Fixes missing 'global'
  },
  resolve: {
    alias: {
      buffer: path.resolve(__dirname, "node_modules/buffer/"), // Absolute path
      stream: path.resolve(__dirname, "node_modules/stream-browserify/"), // Fix for stream
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://pinterest-clone-1-9mwr.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      external: ["mock-aws-s3", "aws-sdk", "nock"],
    },
  },
});
