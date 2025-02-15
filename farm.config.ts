import { defineConfig } from "@farmfe/core";

export default defineConfig({
  compilation: {
    input: {
      index: "./index.html",
    },
    output: {
      path: "./build",
      publicPath: "/",
    },
    lazyCompilation: false,
    persistentCache: false,
    minify: false,
    treeShaking: false,
  },
  server: {
    port: 9000,
  },
  plugins: ["@farmfe/plugin-react"],
});
