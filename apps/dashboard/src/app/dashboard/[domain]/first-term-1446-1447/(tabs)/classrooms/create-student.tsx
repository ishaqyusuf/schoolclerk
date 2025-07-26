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

const createStudentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Surname is required"),
  otherName: z.string().optional(),
  gender: z.enum(["M", "F"]),
});

export function CreateStudent({ classId }: { classId: number }) {
  const [open, setOpen] = useState(false);
  const form = useZodForm(createStudentSchema, {
    defaultValues: {
      gender: "M",
    },
  });
  const m = usePostMutate();
  const qc = useQueryClient();
  const trpc = useTRPC();

  const onSubmit = form.handleSubmit(async (data) => {
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
      }
    );
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">New Student</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <h4 className="font-medium leading-none">Add New Student</h4>
            <p className="text-sm text-muted-foreground">
              Fill in the details to add a new student to this class.
            </p>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="otherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Name(s)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
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
              {m.createAction.isPending ? "Creating..." : "Create Student"}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
