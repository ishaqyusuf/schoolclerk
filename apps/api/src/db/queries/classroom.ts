import type { TRPCContext } from "@api/trpc/init";
import type { ClassroomQuery } from "@api/trpc/schemas/schemas";

export async function getClassrooms(
  { db, profile }: TRPCContext,
  params: ClassroomQuery
) {
  const classRooms = await db.classRoomDepartment.findMany({
    where: {
      id: !params?.departmentId ? undefined : params.departmentId,
      classRoom: {
        schoolSessionId: profile?.sessionId,
        name: params.className ? params.className : undefined,
        session: {
          id: profile.sessionId,
        },
      },
    },
    select: {
      id: true,
      departmentName: true,
      _count: {
        select: {
          studentSessionForms: {
            where: {
              student: {
                deletedAt: null,
              },
            },
          },
        },
      },
      classRoom: {
        select: {
          session: {
            select: {
              title: true,
              id: true,
            },
          },
          name: true,
          id: true,
        },
      },
    },
  });
  return {
    data: classRooms.map(({ ...a }) => {
      const displayName = a.departmentName?.includes(
        a.classRoom?.name as string
      )
        ? a.departmentName
        : `${a.classRoom?.name} ${a.departmentName}`;
      return {
        ...a,
        displayName,
      };
    }),
    meta: {} as any,
  };
}
