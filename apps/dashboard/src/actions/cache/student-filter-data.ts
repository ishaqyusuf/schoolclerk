"use server";

import { unstable_cache } from "next/cache";
import { PageFilterData } from "@/types";

import { Gender } from "@school-clerk/db";

import { getSaasProfileCookie } from "../cookies/login-session";
import { getCachedClassRooms } from "./classrooms";

export async function studentFilterData() {
  const profile = await getSaasProfileCookie();
  const { termId } = profile;
  const fn = async () => {
    const [classes] = await Promise.all([getCachedClassRooms(profile.termId)]);

    const response: PageFilterData[] = [
      {
        value: "search",
        icon: "Search",
      },
      {
        value: "departmentId",
        label: "Class",
        icon: "Search",
        options: [
          {
            label: "Not enrolled",
            value: "undocumented",
          },
          ...classes?.map((c) => ({
            label: c.name,
            value: c.departmentId,
          })),
        ],
      },
      {
        value: "gender",
        icon: "gender",
        options: [
          {
            label: "Male",
            value: "Male" as Gender,
          },
          {
            label: "Female",
            value: "Female" as Gender,
          },
        ],
      },
    ];

    return response;
  };
  const tags = [`students_class_filter_${termId}`];
  return unstable_cache(fn, tags, {
    tags,
  });
}
