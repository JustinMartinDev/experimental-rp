import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "PreactMenuUi",
      formats: ["es", "umd"],
      fileName: (format) => `preact-menu-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["preact"],
      output: {
        globals: {
          preact: "Preact",
        },
      },
    },
  },
});
