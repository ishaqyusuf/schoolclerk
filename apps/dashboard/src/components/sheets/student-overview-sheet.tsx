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
import { StudentOverview } from "../students/student-overview";

export function StudentOverviewSheet({}) {
  const { studentViewId, studentViewTab, setParams } = useStudentParams();
  const isOpen = Boolean(studentViewId);

  const student = useAsyncMemo(async () => {
    if (!studentViewId) return null;
    const profile = await getSaasProfileCookie();
    await timeout(randomInt(100));
    const {
      data: [student],
    } = await getStudentsListAction({
      sessionId: profile.sessionId,
      studentId: studentViewId,
    });
    return student;
  }, [studentViewId]);
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
      <SheetHeader>
        <SheetTitle>{student?.studentName}</SheetTitle>
        <SheetDescription>{student?.department}</SheetDescription>
      </SheetHeader>
      <Tabs
        onValueChange={(e) => {
          setParams({
            studentViewTab: e,
          });
        }}
        defaultValue="overview"
        value={studentViewTab || "overview"}
      >
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
