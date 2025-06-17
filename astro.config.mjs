// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

import sanity from "@sanity/astro";

import projectId from "./sanity/projectId.js";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    svelte(),
    sanity({
      projectId: projectId,
      dataset: "production",
      // Set useCdn to false if you're building statically.
      useCdn: false,
    }),
  ],
  base: "/blog",
  server: {
    allowedHosts: true,
  },
});
