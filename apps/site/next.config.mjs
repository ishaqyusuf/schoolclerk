// @ts-check
// import "./src/env.mjs";
import { fileURLToPath } from "url";
// import "@school-clerk/auth/env.mjs";

import { withNextDevtools } from "@next-devtools/core/plugin";
// import "@school-clerk/api/env";
import withMDX from "@next/mdx";

// !process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));
// createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    // "@school-clerk/api",
    // "@school-clerk/auth",
    // "@school-clerk/db",
    // "@school-clerk/common",
    "@school-clerk/ui",
    "@school-clerk/api",

    // "@school-clerk/stripe",
  ],
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    mdxRs: true,
    // serverActions: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "www.twillot.com",
      "cdnv2.ruguoapp.com",
      "www.setupyourpay.com",
    ],
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  output: "standalone",
};

// export default withNextDevtools(withMDX()(config));
export default config;
