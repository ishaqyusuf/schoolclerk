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
      gender: "Male",
      dob: null,
      classRoomId: null,
      fees: [],
      termForms: [],
      guardian: {
        id: null,
        name: null,
        phone: null,
        phone2: null,
      },
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
export const useStudentFormContext = () => useFormContext<Type>();
