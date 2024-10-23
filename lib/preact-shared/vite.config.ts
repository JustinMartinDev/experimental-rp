import { defineConfig } from "vite";
import createExternal from "vite-plugin-external";
import preact from "@preact/preset-vite";

// Helper to check if the current environment is development
const isDev = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: isDev
    ? [preact()]
    : [
        createExternal({
          externals: {
            react: "Preact",
          },
        }),
      ],
});
