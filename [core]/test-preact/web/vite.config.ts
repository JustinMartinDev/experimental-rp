import { defineConfig } from "vite";
import createExternal from "vite-plugin-external";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createExternal({
      externals: {
        react: "Preact",
      },
    }),
  ],
});
