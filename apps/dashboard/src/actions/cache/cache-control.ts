import { revalidatePath, revalidateTag } from "next/cache";

import { getSaasProfileCookie } from "../cookies/login-session";

export function billablesChanged() {
  revalidatePath("/finance/billables");
  getSaasProfileCookie().then(({ termId }) => {
    revalidateTag(`billables_${termId}`);
    revalidateTag(`billables_filter_${termId}`);
  });
}
export function billChanged() {
  revalidatePath("/finance/bills");
  // getSaasProfileCookie().then(({ termId }) => {
  //   revalidateTag(`staffs_${termId}`);
  //   revalidateTag(`staffs_filter_${termId}`);
  // });
}
export function classChanged() {
  revalidatePath("/academic/classes");
  getSaasProfileCookie().then(({ termId }) => {
    revalidateTag(`classrooms_${termId}`);
    revalidateTag(`students_class_filter_${termId}`);
  });
}
export function feesChanged() {
  revalidatePath("/finance/fees-management");
  getSaasProfileCookie().then(({ termId }) => {
    revalidateTag(`feees_${termId}`);
    revalidateTag(`fees_filter_${termId}`);
  });
}
export function staffChanged() {
  revalidatePath("/staff/teachers");
  getSaasProfileCookie().then(({ termId }) => {
    revalidateTag(`staffs_${termId}`);
    revalidateTag(`staffs_filter_${termId}`);
  });
}
export function studentChanged() {
  revalidatePath("/students/list");
  getSaasProfileCookie().then(({ termId }) => {
    // revalidateTag(`classrooms_${termId}`);
  });
}
export function subjectChanged() {
  revalidatePath("/academic/subjects");
  getSaasProfileCookie().then(({ termId }) => {
    revalidateTag(`subjects_${termId}`);
    revalidateTag(`subjects_filter_${termId}`);
  });
}
export function walletAdded() {
  // revalidatePath("/academic/subjects");
  getSaasProfileCookie().then(({ termId }) => {
    revalidateTag(`wallets_${termId}`);
    revalidateTag(`wallet_filter_${termId}`);
  });
}
export function walletTxChanged(walletName) {
  // revalidatePath("/academic/subjects");
  getSaasProfileCookie().then(({ termId }) => {
    revalidateTag(`wallets_tx_${termId}_${walletName}`);
    revalidateTag(`wallet_filter_${termId}_${walletName}`);
  });
}
