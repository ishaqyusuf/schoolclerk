import { composeQueryData } from "@api/query-response";
import type { TRPCContext } from "@api/trpc/init";
import type { GetStudentsSchema } from "@api/trpc/schemas/schemas";
import type { PageFilterData } from "@api/type";
import { composeQuery } from "@api/utils";
import type { Database, Prisma } from "@school-clerk/db";
import { studentDisplayName } from "./enrollment-query";
// import { Database, Prisma } from "@school-clerk/db";

type SearchParams = {
  sessionId?: string;
  departmentId?: string;
  studentId?: string;
  size?;
  sort?;
  start?;
};
export async function getStudents(ctx: TRPCContext, query: GetStudentsSchema) {
  const { db } = ctx;
  if (!query.sessionId && !query.sessionTermId) {
    query.sessionId = ctx.profile?.sessionId;
    query.sessionTermId = ctx.profile?.termId;
  }
  const model = db.students;
  const { response, searchMeta, where } = await composeQueryData(
    query,
    whereStudents(query),
    db.students
  );
  const list = await model.findMany({
    where,
    ...searchMeta,
    select: {
      id: true,
      name: true,
      otherName: true,
      surname: true,
      dob: true,
      gender: true,
      sessionForms: {
        where: {
          schoolSessionId: query.sessionId,
        },
        select: {
          id: true,
          classroomDepartment: {
            select: {
              departmentLevel: true,
              departmentName: true,
              id: true,
              classRoom: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          termForms: {
            where: !query?.sessionTermId
              ? {
                  schoolSessionId: query?.sessionId,
                }
              : {
                  sessionTermId: query?.sessionTermId,
                },
            take: 1,
            select: {
              id: true,
            },
          },
        },
        take: 1,
      },
    },
    orderBy: [
      {
        gender: "asc",
      },
      {
        name: "asc",
      },
    ],
  });
  return await response(
    list.map((student) => {
      const sf = student.sessionForms?.[0];
      const classroomDepartment = sf?.classroomDepartment;
      const classRoom = classroomDepartment?.classRoom;
      const className = classRoom?.name;
      const departmentName = classroomDepartment?.departmentName;
      const departmentId = classroomDepartment?.id;
      const termFormId = sf?.termForms?.[0]?.id;
      return {
        id: student.id,
        gender: student.gender,
        studentName: studentDisplayName(student),
        department: Array.from(new Set([className, departmentName])).join(" "),
        departmentId,
        classId: classRoom?.id,
        termFormId,
      };
    })
  );
}

function whereStudents(query: GetStudentsSchema) {
  const where: Prisma.StudentsWhereInput[] = [
    {
      sessionForms: {
        some: {
          deletedAt: null,
          schoolSessionId: query.sessionId,
        },
      },
    },
  ];

  Object.entries(query).map(([key, value]) => {
    if (!value) return;
    switch (key as keyof GetStudentsSchema) {
      case "search":
        break;
      case "departmentId":
        where.push({
          sessionForms: {
            some: {
              schoolSessionId: query.sessionId,
              classroomDepartmentId:
                query.departmentId == "undocumented" || !query?.departmentId
                  ? null
                  : query.departmentId,
            },
          },
        });
        break;
      case "departmentTitles":
        if (query.departmentTitles?.length!)
          where.push({
            sessionForms: {
              some: {
                schoolSessionId: query.sessionId,
                classroomDepartment:
                  query.departmentTitles?.length! > 1
                    ? {
                        OR: query.departmentTitles?.map((s) => ({
                          departmentName: s,
                        })),
                      }
                    : {
                        departmentName: query.departmentTitles[0],
                      },
              },
            },
          });
        break;
      case "classroomTitle":
        where.push({
          sessionForms: {
            some: {
              schoolSessionId: query.sessionId,
              classroomDepartment: {
                classRoom: {
                  name: value as any,
                },
              },
            },
          },
        });
        break;
    }
  });
  return composeQuery(where);
}
export async function getStudentsQueryParams(ctx: TRPCContext) {
  // session list
  const sessionList = await ctx.db.schoolSession.findMany({
    where: {
      id: {
        not: ctx.profile?.termId,
      },
      schoolId: ctx.profile?.schoolId,
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      terms: {
        select: {
          id: true,
          title: true,
        },
      },
      classRooms: {
        where: { deletedAt: null },
        select: {
          id: true,
          name: true,
          classRoomDepartments: {
            where: { deletedAt: null },
            select: {
              id: true,
              departmentName: true,
            },
          },
        },
      },
    },
  });
  type FilterData = PageFilterData<keyof GetStudentsSchema>;
  const resp = [
    {
      label: "Search",
      type: "input",
      value: "q",
    },
    {
      label: "Session",
      options: sessionList.map((s) => ({
        label: s.title,
        value: s.id,
      })),
      type: "checkbox",
      value: "sessionId",
    },
    {
      label: "Term",
      options: sessionList
        .map((s) =>
          s.terms.map((t) => ({
            label: `${t.title} | ${s.title}`,
            subLabel: s.title,
            value: t.id,
          }))
        )
        .flat(),
      type: "checkbox",
      value: "sessionId",
    },
    {
      label: "Departments",
      type: "checkbox",
      options: Array.from(
        new Set(
          ...sessionList.map((s) =>
            s.classRooms
              .map((c) =>
                c.classRoomDepartments.map((d) => d.departmentName).flat()
              )
              .flat()
          )
        )
      ).map((name) => ({
        label: name as any,
        value: name as any,
      })),
      value: "departmentTitles",
    },
  ] as FilterData[];
  const multiDepsClasses = sessionList
    .map((s) =>
      s.classRooms
        .map((c) => ({
          className: c.name,
          id: c.id,
          depsCount: c.classRoomDepartments.length,
        }))
        .flat()
    )
    .flat()
    .filter((a) => a.depsCount > 1);
  if (multiDepsClasses.length)
    resp.push({
      label: "Classes",
      type: "checkbox",
      options: multiDepsClasses.map((c) => ({
        label: c.className as any,
        value: c.className as any,
      })),
      value: "classroomTitle",
    });
  console.log(resp.length);

  return resp;
}
