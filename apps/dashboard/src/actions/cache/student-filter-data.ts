"use server";

import { PageFilterData } from "@/types";

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
  ];

  return response;
}
