import { CreateClassRoom } from "@/actions/create-classroom";
import { createClassroomSchema } from "@/actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RouterOutputs } from "@school-clerk/api/trpc/routers/_app";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

export function FormContext({ children }) {
  const form = useForm<RouterOutputs["questions"]["all"][number]>({
    // resolver: zodResolver(createClassroomSchema),
    defaultValues: {
      classRoomId: null,
      subjectId: null,
      id: null,
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
export const useQuestionFormContext = () =>
  useFormContext<RouterOutputs["questions"]["all"][number]>();
