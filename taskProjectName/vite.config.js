import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      vue(),
      // vueDevTools(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: true,
      proxy: {
        "/api": {
          target: env.VITE_BACK_URL, 
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, ''), 
        },
      },
    },
  };
});
