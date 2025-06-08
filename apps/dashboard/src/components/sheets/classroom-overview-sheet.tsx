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
import { CustomSheet, CustomSheetContent } from "../custom-sheet-content";
import { useClassesParams } from "@/hooks/use-classes-params";
import { getClassRooms } from "@/actions/get-class-rooms";
import { DataSkeletonProvider } from "@/hooks/use-data-skeleton";
import { DataSkeleton } from "../data-skeleton";
import { StudentsByClassRoom } from "../students/students-by-classroom";

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
      size="lg"
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
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
          </TabsList>
        </Tabs>
        <CustomSheetContent className="flex flex-col gap-2">
          <Tabs
            defaultValue="overview"
            value={params?.classroomTab || "overview"}
          >
            <TabsContent value="students" className="h-screen">
              <StudentsByClassRoom departmentId={viewClassroomId} />
            </TabsContent>
          </Tabs>
        </CustomSheetContent>
      </DataSkeletonProvider>
    </CustomSheet>
  );
}
