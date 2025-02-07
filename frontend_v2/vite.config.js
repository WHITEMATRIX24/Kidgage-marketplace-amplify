import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      // devOptions: {
      //   enabled: true,
      // },
      includeAssests: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Kidgage",
        short_name: "kidgage",
        description: "kidgage",
        icons: [
          {
            src: "/kidgae-fav.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "favicon",
          },
          {
            src: "/kidgae-fav.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "favicon",
          },
          {
            src: "/kidgae-fav.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "apple touch icon",
          },
          {
            src: "/kidgae-fav.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
    }),
  ],
  build: {
    rollupOptions: {
      external: ["jspdf"], // Exclude pdfkit from the final bundle
    },
  },
});
