import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const pages = Object.fromEntries(
  readdirSync(".")
    .filter((file) => file.endsWith(".html"))
    .map((file) => [file.replace(/\.html$/, ""), resolve(__dirname, file)])
);

export default defineConfig({
  appType: "mpa",
  build: {
    rollupOptions: { input: pages }
  }
});
