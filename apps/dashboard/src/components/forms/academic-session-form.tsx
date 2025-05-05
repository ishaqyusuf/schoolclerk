"use client";

import { useForm } from "react-hook-form";

import { Form } from "@school-clerk/ui/form";

import FormInput from "../controls/form-input";

export function AcademicSessionForm({ defaultValues }) {
  const form = useForm({ defaultValues });

  return (
    <Form {...form}>
      <form>
        <div className="grid gap-4">
          <FormInput
            control={form.control}
            name="title"
            label="Session Title"
            placeholder="2025/2026"
          />
        </div>
      </form>
    </Form>
  );
}
