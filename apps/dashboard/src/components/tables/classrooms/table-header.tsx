import { useClassesParams } from "@/hooks/use-classes-params";

import { Button } from "@school-clerk/ui/button";

export function TableHeader({}) {
  const { setParams } = useClassesParams();
  return (
    <>
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={() =>
            setParams({
              type: "create",
            })
          }
        >
          Create invoice
        </Button>
      </div>
    </>
  );
}
