import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { parseAsInteger, parseAsStringEnum } from "nuqs/server";

export function useGlobalParams() {
  const [params, setParams] = useQueryStates({
    openClassSubjectId: parseAsInteger,
    openStudentsForClass: parseAsInteger,
    tab: parseAsStringEnum(["classStudents", "classSubjects"]),
  });
  return {
    params,
    setParams,
  };
}
export function usePostMutate() {
  const trpc = useTRPC();
  const createAction = useMutation(trpc.ftd.createPost.mutationOptions({}));
  const updateAction = useMutation(trpc.ftd.updatePost.mutationOptions({}));
  const deleteAction = useMutation(trpc.ftd.updatePost.mutationOptions({}));
  return {
    createAction,
    updateAction,
    isPending: createAction.isPending || updateAction.isPending,
    isSuccess: createAction.isSuccess || updateAction.isSuccess,
    isError: createAction.isError || updateAction.isError,
    deleteAction,
  };
}
