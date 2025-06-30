import { useEffect, useRef, useState } from "react";
import { Button } from "@school-clerk/ui/button";
import { sessionRecord } from "./data";
import { useLoadingToast } from "@/hooks/use-loading-toast";
import { importStudentAction } from "@/actions/import-student-action";
import { useMigrationStore } from "./store";
import { generateRandomString } from "@/utils/utils";
import { timeout } from "@/utils/timeout";

export function AutoCreate({
  data,
}: {
  data: ReturnType<typeof sessionRecord>;
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const students = Object.values(data)
    .flat()
    .map((a) => a.students)
    .flat()
    .filter((a) => !a.paymentData?.storePayments?.studentId);

  const t = useLoadingToast();
  const store = useMigrationStore();
  const isProcessing = useRef(false); // prevent multiple calls at once

  async function importStudent(index: number) {
    if (!isRunning || index >= students.length) {
      setIsRunning(false);
      document.title = "Migration";
      return;
    }

    const student = students[0];
    if (!student) return;

    const title = `Importing ${student.fullName} | ${students.length} left`;
    t.loading(title);
    // update documeent tab title
    document.title = title;
    isProcessing.current = true;

    try {
      //   if (index == 0) {
      const r = await importStudentAction(student, null);
      store.update(
        `studentPayments.${student.classRoom}.${student.fullName}`,
        r.postData,
      );
      store.update("refreshToken", generateRandomString());
      //   } else await timeout(2000);
      t.success("Done");

      setTimeout(() => {
        isProcessing.current = false;
        setCurrentIndex((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      t.error("Failed");
      isProcessing.current = false;
      setIsRunning(false);
    }
  }

  useEffect(() => {
    if (isRunning && !isProcessing.current) {
      importStudent(currentIndex);
    }
  }, [isRunning, currentIndex]);

  function toggleRun() {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setCurrentIndex(0);
      setIsRunning(true);
    }
  }

  return (
    <div className="fixed z-10 top-0 left-0 m-2">
      <Button onClick={toggleRun}>{isRunning ? "Stop" : "Start"}</Button>
    </div>
  );
}
