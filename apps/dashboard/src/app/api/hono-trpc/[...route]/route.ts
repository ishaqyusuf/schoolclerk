export * from "@school-clerk/api/api";
// Import your router here
// import { createTRPCContext } from "@/trpc/init";
// import { appRouter } from "@/trpc/routers/_app";
// import { trpcServer } from "@hono/trpc-server";
// import { OpenAPIHono } from "@hono/zod-openapi";
// import { Scalar } from "@scalar/hono-api-reference";
// import { secureHeaders } from "hono/secure-headers";

// import { handle } from "hono/vercel";
// const app = new OpenAPIHono<any>();

// app.use(secureHeaders());

// // app.use(
// //   "/trpc/*",
// //   cors({
// //     origin: process.env.ALLOWED_API_ORIGINS?.split(",") ?? [],
// //     allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
// //     allowHeaders: [
// //       "Authorization",
// //       "Content-Type",
// //       "accept-language",
// //       "x-trpc-source",
// //       "x-user-locale",
// //       "x-user-timezone",
// //       "x-user-country",
// //     ],
// //     exposeHeaders: ["Content-Length"],
// //     maxAge: 86400,
// //   }),
// // );

// app.use(
//   "/api/hono-trpc/*",
//   trpcServer({
//     router: appRouter,
//     createContext: createTRPCContext,
//     endpoint: "/api/hono-trpc", // This should match
//   }),
// );

// app.get("/health", async (c) => {
//   try {
//     // await checkHealth();

//     return c.json({ status: "ok" }, 200);
//   } catch (error) {
//     return c.json({ status: "error" }, 500);
//   }
// });

// app.doc("/openapi", {
//   openapi: "3.1.0",
//   info: {
//     version: "0.0.1",
//     title: "Midday API",
//     description:
//       "Midday is a platform for Invoicing, Time tracking, File reconciliation, Storage, Financial Overview & your own Assistant.",
//     contact: {
//       name: "Midday Support",
//       email: "engineer@midday.ai",
//       url: "https://midday.ai",
//     },
//     license: {
//       name: "AGPL-3.0 license",
//       url: "https://github.com/midday-ai/midday/blob/main/LICENSE",
//     },
//   },
//   servers: [
//     {
//       url: "https://api.midday.ai",
//       description: "Production API",
//     },
//   ],
//   security: [
//     {
//       token: [],
//     },
//   ],
// });

// // Register security scheme
// app.openAPIRegistry.registerComponent("securitySchemes", "token", {
//   type: "http",
//   scheme: "bearer",
//   description: "Default authentication mechanism",
//   "x-speakeasy-example": "MIDDAY_API_KEY",
// });

// app.get(
//   "/api/trpc",
//   Scalar({ url: "/openapi", pageTitle: "Midday API", theme: "saturn" }),
// );

// // app.route("/", routers);
// export const GET = handle(app);
// // export default {
// //   port: process.env.PORT ? Number.parseInt(process.env.PORT) : 3000,
// //   fetch: app.fetch,
// // };
