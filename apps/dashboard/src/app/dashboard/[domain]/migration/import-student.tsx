import { importStudentAction } from "@/actions/import-student-action";
import { useLoadingToast } from "@/hooks/use-loading-toast";
import { Button } from "@school-clerk/ui/button";
import { useTransition } from "react";

export function ImportStudentAction({ data }) {
  const [loading, startTransition] = useTransition();
  const t = useLoadingToast();
  async function importStudent() {
    t.loading("Importing...");
    console.log(data);

    startTransition(async () => {
      try {
        await importStudentAction(data);
        t.success("Done");
      } catch (error) {
        t.error("Failed");
      }
    });
  }
  return (
    <div>
      <Button disabled={loading} size="xs" onClick={importStudent}>
        <span className="whitespace-nowrap">Create Student</span>
      </Button>
    </div>
  );
}
