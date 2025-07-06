import type { TRPCContext } from "@api/trpc/init";
import type { GetStudentTermListSchema } from "@api/trpc/schemas/schemas";

export async function getStudentTermsList(
  ctx: TRPCContext,
  query: GetStudentTermListSchema
) {
  const school = await ctx.db.schoolProfile.findFirstOrThrow({
    where: {
      students: {
        some: {
          id: query.studentId,
        },
      },
    },
  });
  // list of school terms
  const terms = await ctx.db.sessionTerm.findMany({
    where: {
      schoolId: school.id,
    },
    orderBy: {
      endDate: "desc",
    },
    select: {
      title: true,
      id: true,
      startDate: true,
      endDate: true,
      session: {
        select: {
          title: true,
        },
      },
      termForms: {
        where: {
          student: {
            id: query.studentId,
          },
          deletedAt: null,
        },
        select: {
          id: true,
          classroomDepartment: {
            select: {
              departmentName: true,
              classRoom: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return terms.map((term) => {
    const termForm = term?.termForms?.[0];
    return {
      term: `${term.title} ${term.session?.title}`,
      termId: term?.id,
      //   description: [term.startDate, term.endDate].map(d => ())
      studentTermId: termForm?.id,
      departmentName: termForm?.classroomDepartment?.departmentName,
    };
  });
}
