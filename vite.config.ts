import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split third-party code into cacheable vendor chunks so a content
        // edit only invalidates the small app chunk, not the whole bundle.
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("@radix-ui") || id.includes("embla-carousel") || id.includes("cmdk") || id.includes("vaul") || id.includes("sonner") || id.includes("next-themes") || id.includes("input-otp")) {
            return "vendor-ui";
          }
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("@tanstack")) return "vendor-data";
          if (id.includes("lucide-react")) return "vendor-icons";
          // pdf-lib is only used by the lazily-loaded DownloadsSection —
          // isolate it so the homepage never downloads it upfront.
          if (id.includes("pdf-lib") || id.includes("file-saver")) return "vendor-pdf";
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/react-router") || id.includes("/scheduler/") || id.includes("react-helmet") || id.includes("react-hook-form") || id.includes("react-day-picker") || id.includes("react-resizable-panels")) {
            return "vendor-react";
          }
          return "vendor";
        },
      },
    },
  },
}));
