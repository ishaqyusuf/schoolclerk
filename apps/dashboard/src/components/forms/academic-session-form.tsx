"use client";

import { createAcadSessionAction } from "@/actions/create-acad-session";
import { createAcadSessionSchema } from "@/actions/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@school-clerk/ui/button";
import { Form } from "@school-clerk/ui/form";
import { Icons } from "@school-clerk/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@school-clerk/ui/table";

import FormInput from "../controls/form-input";
import { SubmitButton } from "../submit-button";

export function AcademicSessionForm({ defaultValues }) {
  const form = useForm<z.infer<typeof createAcadSessionSchema>>({
    defaultValues,
    // resolver: zodResolver(createAcadSessionSchema),
  });
  const terms = useFieldArray({
    control: form.control,
    name: "terms",
    keyName: "_id",
  });
  const createSession = useAction(createAcadSessionAction, {
    onSuccess(args) {
      console.log(args);
    },
    onError(e) {
      console.log(e);
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createSession.execute)}>
        <div className="grid gap-4">
          <FormInput
            control={form.control}
            name="title"
            label="Session Title"
            placeholder="2025/2026"
          />
          <div className="h-auto">
            <Table className="h-auto table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead>Term</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {terms?.fields.map((t, ti) => (
                  <TableRow key={t._id}>
                    <TableCell>
                      <FormInput
                        control={form.control}
                        name={`terms.${ti}.title`}
                        placeholder="1st Term"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant={"outline"}
              type="button"
              className="w-full"
              onClick={(e) => {
                terms.append({
                  endDate: undefined,
                  startDate: undefined,
                  title: "",
                });
              }}
            >
              <Icons.Add className="size-4" />
              <span>Add</span>
            </Button>
          </div>
          <div className="flex justify-end">
            <SubmitButton isSubmitting={createSession?.isExecuting}>
              Submit
            </SubmitButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
