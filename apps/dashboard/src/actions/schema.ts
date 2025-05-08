import { z } from "zod";

export const createAcadSessionSchema = z.object({
  title: z.string().min(1),
  terms: z
    .array(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        title: z.string().min(1),
      }),
    )
    .optional(),
});
export const studentFeePaymentSchema = z.object({
  studentFeeId: z.string(),
  amount: z.number(),
  paymentType: z.string(),
  termId: z.string(),
});
export const guardianSchema = z.object({
  id: z.string().optional(),
  phone: z.string(),
  phone2: z.string().optional(),
  name: z.string(),
});
export const studentFeeSchema = z.object({
  feeId: z.string(),
  title: z.string().optional(),
  amount: z.number().optional(),
  paid: z.number().optional(),
  studentTermId: z.string().optional(),
});
export const createStudentSchema = z.object({
  name: z.string(),
  surname: z.string(),
  otherName: z.string(),
  gender: z.enum(["Male", "Female"]),
  dob: z.date().nullable(),
  classRoomId: z.string().nullable(),
  fees: z.array(studentFeeSchema).optional(),
  guardian: guardianSchema.optional(),
});
export const createSchoolFeeSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  amount: z.number(),
});
export const createBillableSchema = z.object({
  title: z.string(),
  amount: z.number(),
  departments: z
    .array(
      z.object({
        id: z.string(),
      }),
    )
    .optional(),
});
export const createClassroomSchema = z.object({
  className: z.string().min(1),
  departments: z
    .array(
      z
        .object({
          name: z.string(),
        })
        .optional(),
    )
    .optional(),
});
export const createSignupSchema = (t: any) =>
  z.object({
    institutionName: z.string().min(2, {
      message: "Institution name must be at least 2 characters.",
    }),
    institutionType: z
      .string({
        required_error: "Please select an institution type.",
      })
      .optional(),
    adminName: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    studentCount: z
      .string()
      // .min(1, {
      //   message: "Please enter approximate number of students.",
      // })
      .optional(),
    country: z
      .string()
      // .min(1, {
      //   message: "Please select your country/region.",
      // })
      .optional(),
    phone: z.string().optional(),
    educationSystem: z.string().optional(),
    curriculumType: z.string().optional(),
    languageOfInstruction: z.string().optional(),
    // Add to the schema (inside createSignupSchema function)
    domainName: z
      .string()
      .min(2, {
        message: "Subdomain must be at least 2 characters.",
      })
      .regex(/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i, {
        message: "Domain can only contain letters, numbers, and hyphens.",
      }),
  });
