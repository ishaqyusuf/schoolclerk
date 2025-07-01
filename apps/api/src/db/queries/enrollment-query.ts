import { composeQueryData } from "@api/query-response";
import type { TRPCContext } from "@api/trpc/init";
import type { EnrollmentQuery } from "@api/trpc/schemas/schemas";
import { composeQuery } from "@api/utils";
import type { Prisma } from "@school-clerk/db";

export async function enrollmentsIndex(
  ctx: TRPCContext,
  input: EnrollmentQuery
) {
  const model = ctx.db.students;
  const qd = await composeQueryData(input, whereEnrollments(input), model);
  const { response, searchMeta, where } = qd;
  const list = await model.findMany({
    where,
    ...searchMeta,
    // select: {},
    include: {},
  });
  return await response(
    list.map((item) => {
      return { ...item };
    })
  );
}
function whereEnrollments(input: EnrollmentQuery) {
  const where: Prisma.StudentsWhereInput[] = [];
  Object.entries(input)
    // .filter(([k, v]) => !!v)
    .map(([key, value]) => {
      switch (key as keyof EnrollmentQuery) {
        case "previousSessionId":
          if (value)
            where.push({
              sessionForms: {
                some: {
                  schoolSessionId: value,
                },
              },
            });

          break;
        case "previousTermId":
          if (value)
            where.push({
              termForms: {
                some: {
                  id: value,
                },
              },
            });
          break;
      }
    });
  return composeQuery(where);
}
