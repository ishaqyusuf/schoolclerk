import { CreateClassRoom } from "@/actions/create-classroom";
import { createBillableSchema, createClassroomSchema } from "@/actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import z from "zod";

type Type = z.infer<typeof createBillableSchema>;
export function FormContext({ children }) {
  const form = useForm<Type>({
    resolver: zodResolver(createBillableSchema),
    defaultValues: {
      title: "",
      amount: 0,
      departments: [],
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
export const useBillableFormContext = () => useFormContext<Type>();
