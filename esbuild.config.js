import { build } from "esbuild";
import alias from "esbuild-plugin-alias";
import path, { resolve } from "path";
import pkg from "fast-glob";
const { sync } = pkg;

// Use __dirname for CJS compatibility
const projectRoot = path.resolve(process.cwd());
const entryPoints = sync("src/**/*.ts", {
  ignore: ["**/*.test.ts"],
});

const aliasEntries = {
  "@models": resolve(projectRoot, "src/models"),
  "@config": resolve(projectRoot, "src/config"),
  "@controllers": resolve(projectRoot, "src/controllers"),
  "@routes": resolve(projectRoot, "src/routes"),
  "@services": resolve(projectRoot, "src/services"),
  "@utilities": resolve(projectRoot, "src/utilities"),
};

build({
  // entryPoints: ["./src/index.ts"],
  entryPoints,
  outdir: "dist",
  outbase: "src",
  bundle: true,
  format: "esm",
  splitting: true,
  platform: "node",
  target: ["node16"],
  sourcemap: false,
  minify: true,
  treeShaking: true,
  // preserveSymlinks: true,
  tsconfig: "tsconfig.json",
  loader: { ".ts": "ts" },
  logLevel: "info",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  plugins: [alias(aliasEntries)],
  chunkNames: "vendor/[name]-[hash]", // vendor folder
  external: [
    "@sequelize/postgres",
    "cookie-parser",
    "cors",
    "crypto",
    "dotenv",
    "express",
    "express-validator",
    "helmet",
    "http-status-codes",
    "jsonwebtoken",
    "pg",
    "pg-hstore",
    "sequelize",
    "validator",
  ],
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
