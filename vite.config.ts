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
        // NOTE: previously this split node_modules into vendor/vendor-react/
        // vendor-ui/... which produced a circular import
        // (vendor <-> vendor-react) and a blank white page in production.
        // Keep only the safe split: pdf-lib is only used by the lazily-loaded
        // DownloadsSection, so isolate it; everything else uses Vite's
        // default chunking to avoid cross-chunk cycles.
        manualChunks(id: string) {
          if (id.includes("node_modules/pdf-lib") || id.includes("node_modules/file-saver")) {
            return "vendor-pdf";
          }
          return undefined;
        },
      },
    },
  },
}));
