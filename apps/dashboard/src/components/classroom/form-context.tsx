import { FormProvider, useForm } from "react-hook-form";

export function FormContext({ children }) {
  const form = useForm({
    defaultValues: {},
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
