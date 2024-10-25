'use client'

import { TrainingRecordTableCard } from "@/components/Cards/TrainingRecordTableCard/TrainingRecordTableCard";
import { Button } from "@/components/shadcnUI/button";
import { Card, CardContent, CardHeader } from "@/components/shadcnUI/card";
import { mocker } from "@/mock";
import { addTrainingRecord } from "@/services/trainingRecord";
export default function DevCards() {
  function addMockTraining() {
    addTrainingRecord(mocker.trainingList).then(res => {
      console.log(res);
    })
  }
  return (
    <div>
      <Card className="w-96">
        <CardHeader>Options</CardHeader>
        <CardContent>
          <Button onClick={addMockTraining}>ADD MOCK TRAINING</Button>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-10">
        <TrainingRecordTableCard/>
      </div>
    </div>
  )
}