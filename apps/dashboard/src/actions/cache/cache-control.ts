import { revalidatePath, revalidateTag } from "next/cache";

import { getSaasProfileCookie } from "../cookies/login-session";

export function studentChanged() {
  revalidatePath("/students/list");
  getSaasProfileCookie().then(({ termId }) => {
    // revalidateTag(`classrooms_${termId}`);
  });
}

export function classChanged() {
  revalidatePath("/academic/classes");
  getSaasProfileCookie().then(({ termId }) => {
    revalidateTag(`classrooms_${termId}`);
    revalidateTag(`students_class_filter_${termId}`);
  });
  studentChanged();
}
export function subjectChanged() {
  revalidatePath("/academic/subjects");
  getSaasProfileCookie().then(({ termId }) => {
    revalidateTag(`subjects_${termId}`);
    revalidateTag(`subjects_filter_${termId}`);
  });
}
export function staffChanged() {
  revalidatePath("/staff/teachers");
  getSaasProfileCookie().then(({ termId }) => {
    revalidateTag(`staffs_${termId}`);
    revalidateTag(`staffs_filter_${termId}`);
  });
}
