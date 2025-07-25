import type { TRPCContext } from "@api/trpc/init";
import { generateRandomString } from "@school-clerk/utils";
const postCode = `firstTerm-1446-1447`;
const raws = {
  stacks: [] as any[],
  stackObj: {} as any,
};
async function clear(ctx: TRPCContext) {
  await ctx.db.posts.deleteMany({
    where: {
      name: postCode,
    },
  });
}
export async function generateFirstTermData(ctx: TRPCContext, payload: Data[]) {
  await clear(ctx);
  const assessmentsList: Partial<StudentSubjectAssessment>[] = [];
  try {
    await ctx.db.$transaction(
      async (db) => {
        const _ctx = { db };
        // for (const item of payload) {
        for (let ci = 0; ci < payload.length; ci++) {
          const item = payload[ci]!;
          const classRoom = await getClassroom(_ctx, item.course);
          if (!classRoom?.postId) {
            raws.stacks.push({ classRoom });
            throw new Error("CLASS ROOM POST ID NOT FOUND");
          }
          const subjects = await getSubjects(_ctx);
          for (let si = 0; si < item.subjects.length; si++) {
            const subjectData = item.subjects[si];
            let subject;
            try {
              subject = subjects.find((s) =>
                s.title?.localeCompare(subjectData?.subject!)
              );
            } catch (error) {
              raws.stacks.push({
                subjects,
                error,
              });
              throw new Error("SUBJECT LOCALE COMPARE FAILED");
            }
            if (!(subject?.postId > 0))
              subject = await createSubject(_ctx, subjectData?.subject!);
            if (!subject?.postId) {
              raws.stacks.push({
                subject,
                subjectData,
              });
              throw new Error("");
            }
            const classSubject = await createClassSubject(
              _ctx,
              classRoom?.postId,
              subject.postId
            );
            payload[ci]!.subjects[si]!.id = classSubject.postId;
            const subjectId = payload[ci]!.subjects[si]!.id;
            raws.stacks.push({
              subjectId,
              classSubject,
            });
            if (!subjectId) {
              throw new Error("unable to set subject id");
            }
            for (let ai = 0; ai < subjectData?.assessments.length!; ai++) {
              const assessmentData = subjectData?.assessments[ai];
              const classSubjectAssessment =
                await createClassroomSubjectAssessment(_ctx, {
                  classId: classRoom?.postId,
                  classSubjectId: classSubject.postId,
                  title: assessmentData?.type,
                  obtainable: assessmentData?.obtainable!,
                  index: ai,
                });
              payload[ci]!.subjects[si]!.assessments[ai]!.id =
                classSubjectAssessment.postId;
            }
          }
          for (let sti = 0; sti < item.students.length; sti++) {
            const studentData = item.students[sti];
            const {
              assessments,
              firstName,
              gender,
              otherName,
              rawData,
              surname,
            } = studentData!;
            const student = await createStudent(_ctx, {
              classId: classRoom?.postId,
              firstName,
              surname,
              otherName,
              gender,
            });
            payload[ci]!.students[sti]!.id = student.postId;
            assessments.map((assessment) => {
              const subject = payload[ci]!.subjects?.find((a) =>
                a.code?.localeCompare(assessment.subjectCode)
              );
              const subjectAssessmentId = subject?.assessments?.find(
                (_) => _.code === assessment.assessmentCode
              )?.id!;
              if (!subjectAssessmentId) {
                raws.stacks.push({
                  error: "Assessment id not found",
                  stack: [payload[ci]!.subjects, assessment],
                });
                throw new Error("Assessment Id not found");
              }
              assessmentsList.push({
                markObtained: assessment.score,
                studentId: student.postId,
                subjectAssessmentId,
                calculatedScore: assessment.score!,
                classId: classRoom?.postId,
                classSubjectId: subject.id!,
                type: "student-subject-assessment",
              });
            });
          }
        }

        await db.posts.createMany({
          data: assessmentsList.map((data) => ({
            name: postCode,
            data,
          })),
        });
        // throw new Error("FAILED");
      },
      {
        timeout: 60000,
      }
    );
  } catch (error) {
    raws.stackObj.error = { error };
  }

  return {
    raws,
    assessmentsList,
    payload,
  };
}
async function getClassroom(ctx, classTitle) {
  const db: TRPCContext["db"] = ctx.db;
  const course = await getData<ClassPostData>(ctx, [
    pathEquals("classTitle", classTitle),
    pathEquals("type", "class" as PostTypes),
  ]);

  if (course?.postId) return course;
  const data = {
    courseCode: generateRandomString(5),
    classTitle,
    type: "class",
  } as Partial<ClassPostData>;
  const classRoom = await createPost<ClassPostData>(ctx, data);
  if (classRoom) return classRoom;
}
export async function getSubjects(ctx) {
  const subjects = await getDataList<SubjectPostData>(
    ctx,
    pathEquals("type", "subject" as PostTypes)
  );
  return subjects;
}
async function createSubject(ctx, title) {
  const data: Partial<SubjectPostData> = {
    type: "subject",
    title,
  };
  const subject = await createPost<SubjectPostData>(ctx, data);
  return subject;
}
async function createClassSubject(ctx, classId, subjectId) {
  const db: TRPCContext["db"] = ctx.db;
  const data: Partial<ClassSubject> = {
    type: "class-subject",
    classId,
    subjectId,
  };
  const r = await db.posts.create({
    data: {
      name: postCode,
      data,
    },
  });
  return transformData<ClassSubject>(r);
}
const pathEquals = (path, equals) => ({
  data: {
    path: [path],
    equals,
  },
});
export async function createPost<T>({ db }, data) {
  const post = await db.posts.create({
    data: {
      name: postCode,
      data: data as any,
    },
  });
  return transformData<T>(post);
}
export async function updatePost<T>({ db }, id, data) {
  const post = await db.posts.update({
    where: { id },
    data: {
      data: data as any,
    },
  });
  return transformData<T>(post);
}
async function getData<T>(ctx, dataQuery?, postId?) {
  const db: TRPCContext["db"] = ctx.db;
  const where: any[] = [
    {
      name: postCode,
    },
    // ...(Array.isArray(dataQuery) ? dataQuery : []),
  ];
  if (Array.isArray(dataQuery)) where.push(...dataQuery);
  else where.push(dataQuery);
  if (postId) where.push({ id: postId });
  const post = await db.posts.findFirst({
    where: {
      AND: where,
      //   id: postId || undefined,
      //   name: postCode,
      //   data: Array.isArray(dataQuery) ? undefined : dataQuery || undefined,
      //   AND: Array.isArray(dataQuery)
      //     ? dataQuery.map((q) => ({
      //         data: q,
      //       }))
      //     : undefined,
    },
  });
  if (!post) return null;
  return {
    ...(post?.data as any),
    postId: post?.id,
  } as T;
}
async function getDataList<T>(ctx, dataQuery) {
  const db: TRPCContext["db"] = ctx.db;
  const where = [
    {
      name: postCode,
    },
    // ...(Array.isArray(dataQuery) ? dataQuery : []),
  ];
  if (Array.isArray(dataQuery)) where.push(...dataQuery);
  else where.push(dataQuery);
  const ls = await db.posts.findMany({
    where: {
      AND: where,
      //     AND: ,
      //   data: Array.isArray(dataQuery) ? undefined : dataQuery,
      //   AND: Array.isArray(dataQuery)
      //     ? dataQuery.map((q) => ({
      //         data: q,
      //       }))
      //     : undefined,
    },
  });
  return ls.map(
    ({ id: postId, data }) =>
      ({
        postId,
        ...(data as any),
      }) as T
  );
}

async function createClassroomSubjectAssessment(
  ctx,
  data: Partial<ClassSubjectAssessment>
) {
  data.type = "class-subject-assessment";
  return await createPost<ClassSubjectAssessment>(ctx, data);
}
async function createStudent(ctx, data: Partial<Student>) {
  const db: TRPCContext["db"] = ctx.db;
  data.type = "student";
  const r = await db.posts.create({
    data: {
      name: postCode,
      data,
    },
  });
  return transformData<Student>(r);
}
function transformData<T>(data) {
  const dataResponse = {
    ...data.data,
    postId: data.id,
  } as T;
  const type = data.data?.type;
  if (type) {
    if (!raws.stackObj[type]) {
      raws.stackObj[type] = [dataResponse];
    } else raws.stackObj[type].push(dataResponse);
  } else raws.stacks.push(dataResponse);
  return dataResponse;
}
async function createStudentSubjectAssessment(
  ctx,
  data: Partial<StudentSubjectAssessment>
) {
  const db: TRPCContext["db"] = ctx.db;
  data.type = "student-subject-assessment";
  const r = await db.posts.create({
    data: {
      name: postCode,
      data,
    },
  });
  return transformData<StudentSubjectAssessment>(r);
}
export async function getClassroomStudents(ctx: TRPCContext, classId) {
  //   const classroomSubjects = await getDataList<ClassSubject>(ctx, [
  //     pathEquals("type", "class-subject" as PostTypes),
  //     pathEquals("classId" as keyof ClassSubject, classId),
  //   ]);
  const classSubjects = await getClassroomSubjects(ctx, classId);
  const students = await getDataList<Student>(ctx, [
    pathEquals("type", "student" as PostTypes),
    pathEquals("classId" as keyof Student, classId),
  ]);
  const assessments = await getDataList<ClassSubjectAssessment>(ctx, [
    pathEquals("type", "student-subject-assessment" as PostTypes),
    // pathEquals("classId" as keyof ClassSubjectAssessment, classId),
  ]);
  //   const subjects = await getSubjects(ctx);
  type T = ClassSubjectAssessment;

  return {
    // classroomSubjects: classroomSubjects.map((s) => ({
    //   ...s,
    //   title: subjects?.find((a) => a.postId === s.subjectId)?.title,
    //   assessments: assessments.filter((a) => a.classSubjectId == s.postId),
    // })),
    assessments,
    classSubjects,
    students,
  };
}
export async function getClassroomSubjects(ctx: TRPCContext, classId) {
  const classroomSubjects = await getDataList<ClassSubject>(ctx, [
    pathEquals("type", "class-subject" as PostTypes),
    pathEquals("classId" as keyof ClassSubject, classId),
  ]);
  //   const subjects = await getDataList<SubjectPostData>(ctx, [
  //     pathEquals("type", "subject" as PostTypes),
  //     {
  //       id: {
  //         in: classroomSubjects.map((s) => s.subjectId),
  //       },
  //     },
  //   ]);
  const subjects = await getSubjects(ctx);
  type T = ClassSubjectAssessment;
  const assessments = await getDataList<T>(ctx, [
    pathEquals("type", "class-subject-assessment" as PostTypes),
    {
      OR: [
        ...classroomSubjects.map((s) =>
          pathEquals("classSubjectId" as keyof T, s.postId)
        ),
      ],
    },
  ]);
  return {
    classroomSubjects: classroomSubjects.map((s) => ({
      ...s,
      title: subjects?.find((a) => a.postId === s.subjectId)?.title,
      assessments: assessments.filter((a) => a.classSubjectId == s.postId),
    })),
    subjects,
  };
}
export async function getClassrooms(ctx: TRPCContext) {
  const classrooms = await getDataList<ClassPostData>(
    ctx,
    pathEquals("type", "class" as PostTypes)
  );
  return classrooms;
}
async function getStudentAssessmentForm(ctx: TRPCContext, studentId) {
  const student = await getData<Student>(ctx, null, studentId);
  const assessments = await getDataList<StudentSubjectAssessment>(ctx, [
    pathEquals("type", "student-subject-assessment" as PostTypes),
    pathEquals("studentId", studentId),
  ]);
  const classSubjectAssessments = await getDataList<ClassSubjectAssessment>(
    ctx,
    [
      pathEquals("type", "class-subject" as PostTypes),
      pathEquals("classId", student?.classId),
    ]
  );
  const classSubjects = await getDataList<ClassSubject>(ctx, [
    pathEquals("type", "class-subject" as PostTypes),
    pathEquals("classId", student?.classId),
  ]);
}
export type PostTypes = BasePostData["type"];
export interface StudentSubjectAssessment extends BasePostData {
  studentId: number;
  subjectAssessmentId: number;
  classSubjectId: number;
  classId: number;
  markObtained: number;
  calculatedScore: number;
}
export interface Student extends BasePostData {
  firstName;
  otherName;
  surname;
  classId;
  gender;
}
export interface ClassSubjectAssessment extends BasePostData {
  classSubjectId;
  classId;
  title;
  obtainable;
  index;
  assessmentType: "primary" | "secondary";
}
export interface ClassSubject extends BasePostData {
  classId;
  subjectId;
}
export interface BasePostData {
  type:
    | "subject"
    | "class"
    | "class-subject"
    | "class-subject-assessment"
    | "student-subject-assessment"
    | "student";
  postId?;
}
export interface SubjectPostData extends BasePostData {
  title: string;
  code?: string;
}
export interface ClassPostData extends BasePostData {
  classCode: string;
  classTitle: string;
  courseIndex;
}
export interface Data {
  course: string;
  subjects: {
    id?: null;
    code: string;
    subject: string;
    assessments: {
      id?: null;
      code: string;
      type: "test" | "exam";
      obtainable: number;
    }[];
  }[];
  students: {
    id?: null;
    firstName: string;
    surname: string;
    otherName: string;
    gender: "M" | "F";
    rawData: string;
    assessments: {
      id?: null;
      subjectCode: string;
      assessmentCode: string;
      score: number;
    }[];
  }[];
}
