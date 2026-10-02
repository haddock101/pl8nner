import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import babel from "@rolldown/plugin-babel";
import mix from "vite-plugin-mix";
import { defineConfig } from "vite";

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

  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),

    /* mix({
      handler: './handler.ts',
      }), */
  ],
  server: {
    port: 5173,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5555',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
