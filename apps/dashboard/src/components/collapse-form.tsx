import { Button } from "@school-clerk/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@school-clerk/ui/collapsible";

export function CollapseForm({ label, children }) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full">
        <Button className="w-full" size="xs" variant="secondary" type="button">
          Parent
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid gap-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
