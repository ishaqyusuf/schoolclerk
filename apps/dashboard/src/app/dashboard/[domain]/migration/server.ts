"use server";

import { transaction } from "@/utils/db";
import { prisma } from "@school-clerk/db";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

export async function loadStudentPayments() {
  return unstable_cache(
    async () => {
      const data = await prisma.posts.findMany({
        where: {
          name: "student-migrate-data",
        },
        select: {
          id: true,
          data: true,
        },
      });
      const transformed = {};
      data.map((item) => {
        const { className, studentName, billables, payments, ...rest } =
          (item.data as any) || {};
        if (!transformed[className]) transformed[className] = {};
        transformed[className][studentName] = {
          payments,
          billables,
          studentName,
          postId: item.id,
          ...rest,
        };
      });
      return transformed;
    },
    ["student-migrate-data"],
    {
      tags: ["student-migrate-data"],
    },
  )();
}
export async function updateStudent(id, className, studentName, data) {
  if (id) {
    await prisma.posts.update({
      where: {
        id,
      },
      data: {
        data: {
          ...data,
          className,
          studentName,
        },
      },
    });
  } else {
    const p = await prisma.posts.create({
      data: {
        name: "student-migrate-data",
        data: {
          ...data,
          className,
          studentName,
        },
      },
    });
    return p.id;
  }
  revalidateTag("student-migrate-data");
  return id;
}
export async function loadGenders() {
  return unstable_cache(
    async () => {
      const data = await prisma.posts.findFirst({
        where: {
          name: "student-genders",
        },
        select: {
          id: true,
          data: true,
        },
      });
      return data.data as any;
    },
    ["student-genders"],
    {
      tags: ["student-genders"],
    },
  )();
}
export async function loadStudentMergeData() {
  return unstable_cache(
    async () => {
      const data = await prisma.posts.findFirst({
        where: {
          name: "student-merge-data",
        },
        select: {
          id: true,
          data: true,
        },
      });
      return data.data as any;
    },
    ["student-merge-data"],
    {
      tags: ["student-merge-data"],
    },
  )();
}
export async function updateGenderData(data) {
  await prisma.posts.updateMany({
    where: {
      name: "student-genders",
    },
    data: {
      data,
    },
  });
  revalidateTag("student-genders");
}
export async function dumpData(gender, studentData, studentMergeData) {
  return transaction(async (tx) => {
    await tx.posts.deleteMany({
      where: {
        name: {
          in: ["student-genders", "student-merge-data", "student-migrate-data"],
        },
      },
    });
    await tx.posts.create({
      data: {
        name: "student-genders",
        data: gender,
      },
    });
    await tx.posts.create({
      data: {
        name: "student-merge-data",
        data: studentMergeData,
      },
    });
    await Promise.all(
      studentData?.map(async (d) => {
        await tx.posts.create({
          data: {
            name: "student-migrate-data",
            data: d,
          },
        });
      }),
    );
  });
}
