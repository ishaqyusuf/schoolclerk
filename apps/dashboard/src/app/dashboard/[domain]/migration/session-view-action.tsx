"use client";

import { Button } from "@school-clerk/ui/button";

import { useNameMerger } from "./params";

export function SessionViewAction({}) {
  const { params, setParams } = useNameMerger();
  if (!params?.names?.length) return null;
  function merge() {
    console.log(params);
  }
  return (
    <div className="fixed bottom-0 left-1/2 z-10 mb-4 border bg-white p-4 py-2 shadow-sm">
      <Button
        onClick={(e) => {
          merge();
        }}
      >
        Merge
      </Button>
    </div>
  );
}
