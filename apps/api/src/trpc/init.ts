import type { Context } from "hono";
import { Database, prisma } from "@school-clerk/db";
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { withPrimaryReadAfterWrite } from "./middleware/primary-read-after-write";

type TRPCContext = {
  //   session: Session | null;
  //   supabase: SupabaseClient;
  db: Database;
  //   geo: ReturnType<typeof getGeoContext>;
  //   teamId?: string;
};
export const createTRPCContext = async (
  _: unknown,
  c: Context,
): Promise<TRPCContext> => {
  // const accessToken = c.req.header("Authorization")?.split(" ")[1];
  // const session = await verifyAccessToken(accessToken);
  const db = prisma;
  return {
    db,
  };
};

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
const withPrimaryDbMiddleware = t.middleware(async (opts) => {
  return withPrimaryReadAfterWrite({
    ctx: opts.ctx,
    type: opts.type,
    next: opts.next,
  });
});
// const withTeamPermissionMiddleware = t.middleware(async (opts) => {
//   return withTeamPermission({
//     ctx: opts.ctx,
//     next: opts.next,
//   });
// });

export const publicProcedure = t.procedure.use(withPrimaryDbMiddleware);
