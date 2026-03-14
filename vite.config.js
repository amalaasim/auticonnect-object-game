import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  assetsInclude: ["**/*.mpeg"],
  plugins: [
    {
      name: "jsx-in-js",
      async transform(code, id) {
        if (!id.includes("/src/") || !id.endsWith(".js")) {
          return null;
        }

        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic"
        });
      }
    },
    react()
  ],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx"
      }
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  preview: {
    host: "0.0.0.0",
    port: 3000
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js"
  }
});
