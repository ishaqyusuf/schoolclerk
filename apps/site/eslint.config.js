import baseConfig, {
  restrictEnvAccess,
} from "@school-clerk/eslint-config/base";
import nextjsConfig from "@school-clerk/eslint-config/nextjs";
import reactConfig from "@school-clerk/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
  {
    ignores: [".next/**"],
    rules: {
      "no-unsafe-optional-chaining": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    },
  },
];
