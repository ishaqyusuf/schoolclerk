import { dotSet } from "@/utils/dot-utils";
import { FieldPath, FieldPathValue } from "react-hook-form";
import { create } from "zustand";

const data = {
  studentGrade: {} as {
    [studentId: string]: {
      totalStudents: number;
      position: number;
      comment: {
        arabic?;
        english?;
      };
      totalScore: number;
      totalObtainable: number;
    };
  },
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
export const useStore = create<Store>((set) => ({
  ...data,
  ...funcs(set),
}));
