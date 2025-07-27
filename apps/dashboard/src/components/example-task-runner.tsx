"use client";

import { exampleTaskAction } from "@/actions/example-task-action";
import { useSyncStatus } from "@/hooks/use-sync-status";
import { Button } from "@school-clerk/ui/button";
import { useToast } from "@school-clerk/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";

export function ExampleTaskRunner({}) {
  const [isSyncing, setSyncing] = useState(false);
  const { toast, dismiss } = useToast();
  const [runId, setRunId] = useState<string | undefined>();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const { status, setStatus } = useSyncStatus({ runId, accessToken });

  const manualSyncTransactions = useAction(exampleTaskAction, {
    onExecute: () => setSyncing(true),
    onSuccess: ({ data }) => {
      console.log(data);

      if (data) {
        setRunId(data.id);
        setAccessToken(data.publicAccessToken);
      }
    },
    onError: (error) => {
      console.log(error);
      setSyncing(false);
      setRunId(undefined);
      setStatus("FAILED");

      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
  });
  useEffect(() => {
    if (isSyncing) {
      toast({
        title: "Syncing...",
        description: "We're connecting to your bank, please wait.",
        duration: Number.POSITIVE_INFINITY,
        variant: "spinner",
      });
    }
  }, [isSyncing]);

  useEffect(() => {
    if (status === "COMPLETED") {
      dismiss();
      setRunId(undefined);
      setSyncing(false);
    }
  }, [status]);

  useEffect(() => {
    if (status === "FAILED") {
      setSyncing(false);
      setRunId(undefined);

      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    }
  }, [status]);
  const handleExampleTask = () => {
    manualSyncTransactions.execute({});
  };
  return;
  return (
    <div className="fixed bottom-0 right-0 m-16 h-10 rounded border shadow">
      <Button onClick={handleExampleTask}>Run Task</Button>
    </div>
  );
}
