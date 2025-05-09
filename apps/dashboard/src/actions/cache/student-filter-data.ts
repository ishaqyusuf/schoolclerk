"use server";

import { PageFilterData } from "@/types";

import { Gender } from "@school-clerk/db";

import { getCachedClassRooms } from "./classrooms";

export async function studentFilterData(termId) {
  const [classes] = await Promise.all([getCachedClassRooms(termId)]);

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
}
