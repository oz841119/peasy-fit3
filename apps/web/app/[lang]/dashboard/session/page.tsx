'use client'
import { Button } from "@/components/shadcnUI/button";
import { patchUserTrainingSessionStatusActive } from "@/services/trainingSession";

export default function SessionPage() {
  const click = async () => {
    try {
      const r = await patchUserTrainingSessionStatusActive(true)
      console.log(r); // TODO: Need to trigger get status
      
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