import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    server: {
      port: 3000, // Explicitly pinapantay sa host port mo
      strictPort: true,

      // FIX: Local proxy bridge added here
      proxy: {
        "/api": {
          target: "http://localhost:5000", // Forward relative /api requests to Express
          changeOrigin: true,
          secure: false,
        },
      },

      // HMR Setup: Pinapanatili ang platform checks pero inaayos ang socket configs
      hmr:
        process.env.DISABLE_HMR === "true"
          ? false
          : {
              protocol: "ws",
              host: "localhost",
              port: 3000,
              clientPort: 3000, // Ito ang lunas sa biglaang 400 Bad Request ng client
            },

      // Disable file watching kapag DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };
});
