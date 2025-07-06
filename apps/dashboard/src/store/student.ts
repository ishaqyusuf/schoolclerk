import { dotSet } from "@/utils/dot-utils";
import { RouterOutputs } from "@api/trpc/routers/_app";
import { FieldPath, FieldPathValue } from "react-hook-form";
import { create } from "zustand";

const data = {
  studentsList: [] as RouterOutputs["students"]["index"]["data"],
};
type Action = ReturnType<typeof funcs>;
type Data = typeof data;
type Store = Data & Action;
export type ZusFormSet = (update: (state: Data) => Partial<Data>) => void;

function funcs(set: ZusFormSet) {
  return {
    reset: (resetData) =>
      set((state) => ({
        ...data,
        ...resetData,
      })),
    update: <K extends FieldPath<Data>>(k: K, v: FieldPathValue<Data, K>) =>
      set((state) => {
        const newState = {
          ...state,
        };
        const d = dotSet(newState);
        d.set(k, v);
        return newState;
      }),
  };
}
export const useStudentsStore = create<Store>((set) => ({
  ...data,
  ...funcs(set),
}));
