'use client'
import { Button } from "@/components/shadcnUI/button";
import { useUserTrainingSessionIsActiveMutation } from "@/hooks/queries/useTrainingSession";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const usePatchUserTrainingSessionStatusActiveMutateErrorToast = (error: any) => {
  const {toast} = useToast()
  useEffect(() => {
    (function handlePatchUserTrainingSessionStatusActiveMutateError () {
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        })
      }
    })()
  }, [error])
}

export default function SessionPage() {
  const {
    mutate: patchUserTrainingSessionStatusActiveMutate,
    error: patchUserTrainingSessionStatusActiveMutateError
  } = useUserTrainingSessionIsActiveMutation()
  usePatchUserTrainingSessionStatusActiveMutateErrorToast(patchUserTrainingSessionStatusActiveMutateError)
  const click = async () => {
    patchUserTrainingSessionStatusActiveMutate(true)
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard page</p>
      <Button onClick={click}>Click</Button>
    </div>
  );
}