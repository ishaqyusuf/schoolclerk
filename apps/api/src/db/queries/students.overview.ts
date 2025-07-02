import type { TRPCContext } from "@api/trpc/init";
import type { GetStudentOverviewSchema } from "@api/trpc/schemas/schemas";

export async function studentsOverview(
  ctx: TRPCContext,
  query: GetStudentOverviewSchema
) {
  const termSheet = await ctx.db.studentTermForm.findFirstOrThrow({
    where: {
      id: query.termSheetId,
    },
    select: {
      id: true,
    },
  });
  return {
    id: termSheet?.id,
  };
}
