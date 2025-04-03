import { build } from "esbuild";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === "production";

build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  target: "node18",
  sourcemap: !isProd,
  minify: isProd,
  tsconfig: "tsconfig.json",
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
  },
  external: ["express"],
  alias: {
    "@routes": path.resolve(__dirname, "src/routes"),
    "@controllers": path.resolve(__dirname, "src/controllers"),
    "@models": path.resolve(__dirname, "src/models"),
  },
}).catch(() => process.exit(1));
