import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import CopyPlugin from "copy-webpack-plugin";
import WasmPackPlugin from "@wasm-tool/wasm-pack-plugin";

const localDir = dirname(fileURLToPath(import.meta.url));
const dist = resolve(localDir, "dist");

export default {
  mode: "production",
  experiments: {
    futureDefaults: true,
  },
  entry: {
    index: "./js/index.js",
  },
  output: {
    path: dist,
    filename: "[name].js",
  },
  devServer: {
    static: dist,
  },
  plugins: [
    new CopyPlugin({
      patterns: [resolve(localDir, "static")],
    }),
    new WasmPackPlugin({
      crateDirectory: localDir,
    }),
  ],
};
