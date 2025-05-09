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
