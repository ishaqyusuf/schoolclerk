import { useTRPC } from "@/trpc/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGlobalParams, usePostMutate } from "../../use-global";
import { TableCell, TableRow } from "@school-clerk/ui/table";
import { Button } from "@school-clerk/ui/button";
import { Icons } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@school-clerk/ui/popover";
import { useMemo, useState } from "react";
import { useZodForm } from "@/hooks/use-zod-form";
import z from "zod";
import { Form } from "@school-clerk/ui/form";
import FormInput from "@/components/controls/form-input";
import { SubmitButton } from "@/components/submit-button";
import FormSelect from "@/components/controls/form-select";
import { ClassSubjectAssessment } from "@api/db/queries/first-term-data";
import { ClassroomSubjectData } from "@/components/tables/subjects/columns";
import { SubjectForm } from "./subject-form";
import { toast } from "@school-clerk/ui/use-toast";
import { Menu } from "@/components/menu";
import { Badge } from "@school-clerk/ui/badge";

export function ClassroomSubjects({ classRoomId }) {
  const trpc = useTRPC();
  const g = useGlobalParams();
  const opened =
    g.params.openClassSubjectId === classRoomId &&
    g.params.tab === "classSubjects";
  const { data } = useQuery(
    trpc.ftd.getClassRoomSubjects.queryOptions(
      {
        classRoomId,
      },
      {
        enabled: opened,
      },
    ),
  );
  const quickCopy = useMemo(() => {
    const copiables = [];
    data?.classroomSubjects?.map((s) => {
      s.assessments.map((a) => {
        const { title, assessmentType, obtainable, index } = a;
        const slug = [title, assessmentType, obtainable, index]
          .map((a) => {
            // if(typeof a === 'string')
            // return a;
            if (typeof a === "boolean") return a ? "yes" : "no";
            return a ? a : "nill";
          })
          .join("-");
        if (copiables.indexOf((a) => a.slug === slug) == -1)
          copiables.push({
            slug,
            data: { title, assessmentType, obtainable, index },
          });
      });
    });
    return copiables;
  }, [data]);
  function CopyMenu({ onCopy }) {
    return (
      <Menu noSize className="">
        {quickCopy?.map((q) => (
          <Menu.Item onClick={(e) => onCopy(q.data)} dir="rtl" key={q.slug}>
            <Badge>{q.data.index}</Badge>
            <span>{q.data.title}</span>
            <Badge>{q.data.assessmentType}</Badge>
            <Badge>{q.data.obtainable}</Badge>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
  const m = usePostMutate();
  const qc = useQueryClient();
  const updateIndex = (id, inddex) =>
    m.updateAction.mutate(
      {
        id,
        data: {
          index: inddex,
        },
      },
      {
        onSuccess(data, variables, context) {
          qc.invalidateQueries({
            queryKey: trpc.ftd.getClassRoomSubjects.queryKey(),
          });
        },
      },
    );
  if (!opened) return null;
  return (
    <TableRow>
      <TableCell colSpan={100}>
        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-lg">Subjects</p>
            <SubjectForm
              selectableSubjects={data?.subjects?.filter((a) =>
                data?.classroomSubjects?.every((b) => b.subjectId != a.postId),
              )}
              subject={{}}
            >
              Add Subject
            </SubjectForm>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2 text-left">Subject</th>
                  <th className="border p-2 text-left">Assessments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.classroomSubjects.map((subject) => (
                  <tr key={subject.postId} className="hover:bg-gray-50">
                    <td className="border p-2 font-medium">
                      <span className="inline-flex gap-2 items-center">
                        <Menu Icon={null} label={`${subject.index}.`}>
                          {["1", "2", "3", "4", "5"].map((i) => (
                            <Menu.Item
                              onClick={(e) => {
                                updateIndex(subject.postId, Number(i));
                              }}
                            >
                              {i}
                            </Menu.Item>
                          ))}
                        </Menu>{" "}
                        {subject.title}
                      </span>
                    </td>
                    <td className="border p-2">
                      <div className="flex gap-2 flex-wrap">
                        {subject?.assessments?.map((a) => (
                          <Assessment
                            assessment={a}
                            key={a.postId}
                            CopyMenu={CopyMenu}
                          >
                            <Button variant="outline" size="sm">
                              <span>{a.title}</span>
                              <span>{a.obtainable}</span>
                            </Button>
                          </Assessment>
                        ))}
                        <Assessment
                          assessment={{
                            classId: subject.classId,
                            type: "class-subject-assessment",
                            classSubjectId: subject.postId,
                            assessmentType: "secondary",
                            index: subject?.assessments?.length,
                          }}
                          CopyMenu={CopyMenu}
                        >
                          <Button variant="ghost" size="sm">
                            <Icons.add className="h-4 w-4" />
                            Add
                          </Button>
                        </Assessment>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

interface AssessmentProps {
  assessment: Partial<ClassroomSubjectData>;
  children?;
  CopyMenu?;
}
function Assessment({ assessment, CopyMenu, children }: AssessmentProps) {
  const { postId, obtainable, classId, index, assessmentType, title } =
    assessment;
  const [opened, setOpened] = useState(false);
  const form = useZodForm(
    z.object({
      title: z.string(),
      obtainable: z.number(),
      index: z.number(),
      assessmentType: z.enum(["primary", "secondary"]),
    }),
    {
      defaultValues: {
        title,
        obtainable,
        assessmentType,
        index,
      },
    },
  );
  const m = usePostMutate();
  const trpc = useTRPC();
  const qc = useQueryClient();
  async function onSubmit({ title, index, obtainable, assessmentType }) {
    // console.log({ title });
    // return;
    const events = {
      onSuccess(data, variables, context) {
        qc.invalidateQueries({
          queryKey: trpc.ftd.getClassRoomSubjects.queryKey(),
        });
        toast({
          // type: "",
          variant: "success",
          description: "Updated successfully",
        });
        setOpened(false);
      },
      onError(error, variables, context) {
        console.log(error);
      },
    };
    if (assessment.postId) {
      m.updateAction.mutate(
        {
          id: assessment.postId,
          data: {
            ...assessment,
            title,
            obtainable,
            index,
            assessmentType,
          },
        },
        events,
      );
    } else {
      m.createAction.mutate(
        {
          data: {
            ...assessment,
            title,
            obtainable,
            assessmentType,
          } as ClassSubjectAssessment,
        },
        events,
      );
    }
  }
  return (
    <div className="inline-flex">
      <Popover open={opened} onOpenChange={setOpened}>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="">Post Id: {assessment?.postId}</div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput control={form.control} name="title" label="Title" />
                <FormInput
                  control={form.control}
                  name="index"
                  label="Index"
                  type="number"
                />
                <FormInput
                  control={form.control}
                  name="obtainable"
                  label="Obtainable"
                  type="number"
                />
                <FormSelect
                  label="Assessment Type"
                  options={["primary", "secondary"]}
                  control={form.control}
                  name="assessmentType"
                />
                <SubmitButton isSubmitting={m.isPending}>Submit</SubmitButton>
              </form>
            </Form>
          </div>
        </PopoverContent>
      </Popover>
      <CopyMenu
        onCopy={(data) => {
          onSubmit(data);
        }}
      />
    </div>
  );
}
