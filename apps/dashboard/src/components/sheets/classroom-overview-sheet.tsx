import { getSaasProfileCookie } from "@/actions/cookies/login-session";
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
import {
  CustomSheet,
  CustomSheetContent,
  MultiSheetContent,
  SecondarySheetContent,
  SecondarySheetHeader,
} from "../custom-sheet-content";
import { useClassesParams } from "@/hooks/use-classes-params";
import { getClassRooms } from "@/actions/get-class-rooms";
import { DataSkeletonProvider } from "@/hooks/use-data-skeleton";
import { DataSkeleton } from "../data-skeleton";
import { StudentsByClassRoom } from "../students/students-by-classroom";
import { ClassroomSubject } from "../classroom-subjects";
import { FormContext } from "../students/form-context";
import { Form } from "../forms/student-form";

export function ClassroomOverviewSheet({}) {
  const { setParams, ...params } = useClassesParams();
  const { viewClassroomId } = params;
  const isOpen = Boolean(params.viewClassroomId);

  const classRoom = useAsyncMemo(async () => {
    if (!viewClassroomId) return null;
    const profile = await getSaasProfileCookie();
    await timeout(randomInt(100));
    const s = await getClassRooms({
      departmentId: params.viewClassroomId,
    });
    const item = s?.data?.[0];
    return item;
  }, [params.viewClassroomId]);
  if (!isOpen) return null;
  return (
    <CustomSheet
      floating
      rounded
      size={params.secondaryTab ? "5xl" : "xl"}
      open={isOpen}
      onOpenChange={() => setParams(null)}
      sheetName="student-overview"
    >
      <DataSkeletonProvider
        value={
          {
            loading: !classRoom?.id,
          } as any
        }
      >
        <SheetHeader>
          <SheetTitle>
            <DataSkeleton pok="textLg">{classRoom?.displayName}</DataSkeleton>
          </SheetTitle>
          <SheetDescription>
            <DataSkeleton pok="textLg">
              {classRoom?._count?.studentSessionForms} students
            </DataSkeleton>
          </SheetDescription>
        </SheetHeader>
        <MultiSheetContent
          Header={
            <Tabs
              onValueChange={(e) => {
                setParams({
                  classroomTab: e as any,
                });
              }}
              defaultValue="overview"
              value={params?.classroomTab || "overview"}
            >
              <TabsList className="w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
              </TabsList>
            </Tabs>
          }
        >
          <CustomSheetContent className="flex flex-col gap-2">
            <Tabs
              defaultValue="overview"
              value={params?.classroomTab || "overview"}
            >
              <TabsContent value="students" className="h-screen">
                <StudentsByClassRoom departmentId={viewClassroomId} />
              </TabsContent>
              <TabsContent value="subjects" className="h-screen">
                <ClassroomSubject departmentId={viewClassroomId} />
              </TabsContent>
            </Tabs>
          </CustomSheetContent>
          <StudentForm />
        </MultiSheetContent>
      </DataSkeletonProvider>
    </CustomSheet>
  );
}
function StudentForm({}) {
  const ctx = useClassesParams();
  if (ctx.secondaryTab != "student-form") return null;

  return (
    <SecondarySheetContent>
      <SecondarySheetHeader ctx={ctx} title="New  Student" />
      <CustomSheetContent>
        <FormContext>
          <Form />
        </FormContext>
      </CustomSheetContent>
    </SecondarySheetContent>
  );
}
