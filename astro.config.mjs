import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { runtimeModulePreload } from "./tools/runtime-module-preload.mjs";

export default defineConfig({
  site: "https://luckymaomi.github.io",
  base: "/ui",
  output: "static",
  trailingSlash: "always",
  integrations: [react(), runtimeModulePreload()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
  },
});
