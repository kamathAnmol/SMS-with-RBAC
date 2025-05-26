// Bun build configuration
export default {
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  target: "node",
  platform: "node",
  minify: {
    identifiers: true,
    whitespace: true,
    syntax: true,
  },
  sourcemap: "external",
  plugins: [],
  define: {
    "process.env.NODE_ENV": `"${process.env.NODE_ENV || "development"}"`,
  },
  external: [
    // External packages that should not be bundled
    "express",
    "sequelize",
    "pg",
    "jsonwebtoken",
    "crypto",
    "dotenv",
    "cors",
    "cookie-parser",
    "helmet",
    "validator",
    "express-validator",
  ],
};
