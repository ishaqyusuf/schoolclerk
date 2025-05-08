import { useEffect, useState } from "react";

import { useToast } from "@school-clerk/ui/use-toast";

type Toast = Parameters<ReturnType<typeof useToast>["update"]>[1];
export function useLoadingToast() {
  const { toast, dismiss, update } = useToast();
  const [toastData, setToastData] = useState<Toast>(null);
  const [toastId, setToastId] = useState(null);
  useEffect(() => {
    if (!toastData) return;
    if (!toastId) {
      const { id } = toast(toastData);
      setToastData(null);
      setToastId(id);
    } else {
      update(toastId, toastData);
      setToastData(null);
    }
  }, [toastId, toastData]);
  type Data = Pick<
    Toast,
    "description" | "title" | "duration" | "variant" | "action" | "progress"
  >;
  const ctx = {
    setToastData,
    toastId,
    clearToastId() {
      setToastId(null);
    },
    description(description, data: Data = {}) {
      ctx.display({
        description,
        ...data,
      });
      // ctx.clearToastId();
    },
    loading(title, data: Data = {}) {
      ctx.display({
        title,
        duration: Number.POSITIVE_INFINITY,
        variant: "spinner",
        ...data,
      });
      ctx.clearToastId();
    },
    error(title, data: Data = {}) {
      ctx.display({
        title,
        duration: 1500,
        variant: "error",
        ...data,
      });
      ctx.clearToastId();
    },
    success(title, data: Data = {}) {
      ctx.display({
        title,
        duration: 1500,
        variant: "success",
        ...data,
      });
      ctx.clearToastId();
    },
    display(data: Data) {
      setToastData(data as any);
    },
  };
  return ctx;
}
