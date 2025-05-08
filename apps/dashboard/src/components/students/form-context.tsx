import { createStudentSchema } from "@/actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import z from "zod";

type Type = z.infer<typeof createStudentSchema>;
export function FormContext({ children }) {
  const form = useForm<Type>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      name: "",
      surname: "",
      otherName: "",
      gender: "MALE",
      dob: null,
      classRoomId: null,
      fees: [],
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
export const useSchoolFeeFormContext = () => useFormContext<Type>();
