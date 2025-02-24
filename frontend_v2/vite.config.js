import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // devOptions: {
      //   enabled: true,
      // },
      includeAssests: [
        "favicon.ico",
        "apple-touc-icon.png",
        "masked-icon.svg",
        "assets/*",
      ],
      manifest: {
        name: "Kidgage",
        short_name: "kidgage",
        description: "kidgage",
        icons: [
          {
            src: "/KIDGAGE-24-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/KIDGAGE-24-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/KIDGAGE-24-180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/KIDGAGE-24-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: ["jspdf"], // Exclude pdfkit from the final bundle
    },
  },
});
