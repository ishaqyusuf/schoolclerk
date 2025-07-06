import { getSaasProfileCookie } from "@/actions/cookies/login-session";
import { getStudentsListAction } from "@/actions/get-students-list";
import { useStudentParams } from "@/hooks/use-student-params";
import { timeout } from "@/utils/timeout";
import { randomInt } from "@/utils/utils";
import { useAsyncMemo } from "use-async-memo";

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@school-clerk/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@school-clerk/ui/tabs";

import { CustomSheet, CustomSheetContent } from "../custom-sheet-content";
import { useTRPC } from "@/trpc/client";
import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { StudentOverviewSheetHeader } from "../students/student-overview-sheet-header";

export function StudentOverviewSheet({}) {
  const { studentViewId, studentViewTab, setParams } = useStudentParams();
  const isOpen = Boolean(studentViewId);

  // const { setParams, ...params } = useStudentParams();

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const {
    data: overviewData,
    error,
    isLoading,
  } = useQuery(
    trpc.students.overview.queryOptions(
      {
        studentId: studentViewId,
      },
      {
        enabled: isOpen,
      },
    ),
  );
  if (!isOpen) return null;

  return (
    <CustomSheet
      floating
      rounded
      size="lg"
      open={isOpen}
      onOpenChange={() => setParams(null)}
      sheetName="student-overview"
    >
      <Tabs
        onValueChange={(e) => {
          setParams({
            studentViewTab: e,
          });
        }}
        defaultValue="overview"
        value={studentViewTab || "overview"}
      >
        <StudentOverviewSheetHeader overview={overviewData} />
        <TabsList className="w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
        </TabsList>
      </Tabs>
      <CustomSheetContent className="flex flex-col gap-2">
        <Tabs defaultValue="overview" value={studentViewTab || "overview"}>
          <TabsContent value="overview" className="h-screen bg-red-100">
            {/* <StudentOverview /> */}
          </TabsContent>
        </Tabs>
      </CustomSheetContent>
    </CustomSheet>
  );
}
