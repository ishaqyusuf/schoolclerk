import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { parseAsInteger, useQueryStates } from "nuqs";

export function useGlobalParams() {
  const [params, setParams] = useQueryStates({
    openClassSubjectId: parseAsInteger,
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
  return {
    createAction,
    updateAction,
    isPending: createAction.isPending || updateAction.isPending,
  };
}
