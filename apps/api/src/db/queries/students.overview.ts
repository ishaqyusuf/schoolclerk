import type { TRPCContext } from "@api/trpc/init";
import type { GetStudentOverviewSchema } from "@api/trpc/schemas/schemas";

export async function studentsOverview(
  ctx: TRPCContext,
  query: GetStudentOverviewSchema
) {
  // const termSheetId = query.termSheetId || ctx.profile?.termId;
  const termSheet = await ctx.db.studentTermForm.findFirstOrThrow({
    where: {
      OR: [
        {
          id: query.termSheetId!!,
        },
        {
          studentId: query.studentId,
        },
      ],
    },
    select: {
      id: true,
    },
  });
  return {
    id: termSheet?.id,
  };
}
