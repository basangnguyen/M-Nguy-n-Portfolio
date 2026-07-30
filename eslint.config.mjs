import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Authentic portfolio media has already been resized for the gallery and
    // intentionally renders at its intrinsic ratio without an image proxy.
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".wrangler/**",
    "assets/**",
    "dist/**",
    "legacy/**",
    "out/**",
    "public/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
