"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function loadCookie() {
  const c = cookies();
  const d = c.get("migration")?.value;
  return JSON.parse(d || ("{}" as any)) satisfies {
    class?: string;
    term?: string;
  };
}
export async function cookieChanged(value) {
  //   const c = loadCookie();
  //   c[k] = val;
  const _c = cookies();
  _c.set("migration", JSON.stringify(value));
  revalidatePath("/migration");
}
