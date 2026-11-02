import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import * as path from "path";
import { fileURLToPath } from "node:url";

const filesNeedToExclude = [
  "src/api/*",
  "src/table/*",
  "src/table/data-table.tsx",
];
const filesPathToExclude = filesNeedToExclude.map((src) => {
  return fileURLToPath(new URL(src, import.meta.url));
});

// https://vite.dev/config/
export default defineConfig({
  /*
  server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          bypass: function (req, res, proxyOptions) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
            return false
          }
        }
      }
  },
   */
  build: {
    manifest: true,
    chunkSizeWarningLimit: 100000,
    rolldownOptions: {
      output: {
        codeSplitting: {
        minSize: 2000,
        groups: [
          {
            name: "vendor",
            test: /node_modules/,
          },
          ],
        },
      },
    },
    rollupOptions: {
      external: [...filesPathToExclude],
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),

    /* mix({
      handler: './handler.ts',
      }), */
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    cors: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5555",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
