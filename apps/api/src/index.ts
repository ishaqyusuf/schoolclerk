import { Hono } from "hono";
import type { Context } from "./rest/types";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./trpc/routers/_app";
import { createTRPCContext } from "./trpc/init";
import { handle } from "hono/vercel";

export const config = {
  runtime: "edge",
};
const app = new Hono<Context>();

app.use(secureHeaders());
// adsad
// app.use(
//   "/trpc/*",
//   cors({
//     origin: process.env.ALLOWED_API_ORIGINS?.split(",") ?? [],
//     allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//     allowHeaders: [
//       "Authorization",
//       "Content-Type",
//       "accept-language",
//       "x-trpc-source",
//       "x-tenant-domain",
//       "x-tenant-session-term-id",
//       "x-user-timezone",
//       "x-user-country",
//     ],
//     exposeHeaders: ["Content-Length"],
//     maxAge: 86400,
//   }),
// );
app.use(
  "/api/hono-trpc/*",
  trpcServer({
    router: appRouter,
    createContext: createTRPCContext,
    endpoint: "/api/hono-trpc",
  }),
);
app.get("/api", (c) => {
  return c.json({ message: "Congrats! You've deployed Hono to Vercel" });
});

// export default app;
// export default {
//   port: process.env.PORT ? Number.parseInt(process.env.PORT) : 3000,
//   fetch: app.fetch,
// };

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
