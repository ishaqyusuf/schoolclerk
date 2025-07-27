"use client";
import { Button } from "@school-clerk/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@school-clerk/ui/popover";
import { useZodForm } from "@/hooks/use-zod-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@school-clerk/ui/form";
import { Input } from "@school-clerk/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@school-clerk/ui/select";
import { usePostMutate } from "../../use-global";
import { useState } from "react";
import { Student } from "@api/db/queries/first-term-data";
import { useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@school-clerk/ui/tabs";
import { Textarea } from "@school-clerk/ui/textarea";
import FormInput from "@/components/controls/form-input";
import FormSelect from "@/components/controls/form-select";

const createStudentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Surname is required"),
  otherName: z.string().optional(),
  gender: z.enum(["M", "F"]),
});

const createBatchStudentSchema = z.object({
  names: z.string().min(1, "Names are required"),
  gender: z.enum(["M", "F"]),
});

export function CreateStudent({ classId }: { classId: number }) {
  const [open, setOpen] = useState(false);
  const form = useZodForm(createStudentSchema, {
    defaultValues: {
      gender: "M",
    },
  });
  const batchForm = useZodForm(createBatchStudentSchema, {
    defaultValues: {
      gender: "M",
    },
  });
  const m = usePostMutate();
  const qc = useQueryClient();
  const trpc = useTRPC();

  const onSingleSubmit = form.handleSubmit(async (data) => {
    const studentData: Partial<Student> = {
      type: "student",
      classId,
      ...data,
    };

    m.createAction.mutate(
      {
        data: studentData,
      },
      {
        onSuccess: () => {
          form.reset();
          setOpen(false);
          qc.invalidateQueries({
            queryKey: trpc.ftd.getClassroomStudents.queryKey(),
          });
        },
      },
    );
  });

  const onBatchSubmit = batchForm.handleSubmit(async (data) => {
    const names = data.names.split("\n").filter((name) => name.trim() !== "");
    const students = names.map((name) => {
      const separator = name.includes(".") ? "." : " ";
      const parts = name.split(separator);
      const [firstName, surname, ...otherName] = parts;
      return {
        firstName,
        surname,
        otherName: otherName.join(" "),
        gender: data.gender,
        type: "student",
        classId,
      };
    });

    m.createAction.mutate(
      {
        data: students,
      },
      {
        onSuccess: () => {
          batchForm.reset();
          setOpen(false);
          qc.invalidateQueries({
            queryKey: trpc.ftd.getClassroomStudents.queryKey(),
          });
        },
      },
    );
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">New Student</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Tabs defaultValue="single">
          <TabsList>
            <TabsTrigger value="single">Single Student</TabsTrigger>
            <TabsTrigger value="batch">Batch Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="single">
            <Form {...form}>
              <form onSubmit={onSingleSubmit} className="space-y-4 pt-4">
                <h4 className="font-medium leading-none">Add New Student</h4>
                <p className="text-sm text-muted-foreground">
                  Fill in the details to add a new student to this class.
                </p>
                <FormInput
                  inlineLabel
                  label="First Name"
                  control={form.control}
                  name="firstName"
                />
                <FormInput
                  inlineLabel
                  label="Surname"
                  control={form.control}
                  name="surname"
                />
                <FormInput
                  inlineLabel
                  label="Other Name"
                  control={form.control}
                  name="otherName"
                />
                <FormSelect
                  inlineLabel
                  label="Gender"
                  options={[
                    {
                      label: "Male",
                      value: "M",
                    },
                    {
                      label: "Female",
                      value: "F",
                    },
                  ]}
                  control={form.control}
                  name="gender"
                />

                <Button type="submit" disabled={m.createAction.isPending}>
                  {m.createAction.isPending ? "Creating..." : "Create Student"}
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="batch">
            <Form {...batchForm}>
              <form onSubmit={onBatchSubmit} className="space-y-4 pt-4">
                <h4 className="font-medium leading-none">
                  Add Multiple Students
                </h4>
                <p className="text-sm text-muted-foreground">
                  Enter one student name per line. Split names with a space or
                  dot.
                </p>
                <FormField
                  control={batchForm.control}
                  name="names"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Names</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., John Doe\nJane.Doe"
                          rows={10}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={batchForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M">Male</SelectItem>
                          <SelectItem value="F">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={m.createAction.isPending}>
                  {m.createAction.isPending ? "Creating..." : "Create Students"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
