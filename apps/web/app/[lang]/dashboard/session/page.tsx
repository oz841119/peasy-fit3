'use client'
import { Button } from "@/components/shadcnUI/button";
import { useUserTrainingSessionIsActiveMutation } from "@/hooks/queries/useTrainingSession";

export default function SessionPage() {
  const {
    mutate: patchUserTrainingSessionStatusActiveMutate
  } = useUserTrainingSessionIsActiveMutation()
  const click = async () => {
    try {
      patchUserTrainingSessionStatusActiveMutate(true)
    } catch(err) {
      console.error(err)
    }
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard page</p> 
      <Button onClick={click}>Click</Button>
    </div>
  );
}