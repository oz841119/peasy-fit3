'use client'

import { TrainingRecordTableCard } from "@/components/Cards/TrainingRecordTableCard/TrainingRecordTableCard";
import { Button } from "@/components/shadcnUI/button";
import { Card, CardContent, CardHeader } from "@/components/shadcnUI/card";
import { addTrainingRecord } from "@/services/trainingRecord";
export default function DevCards() {
  function addMockTraining() {
    addTrainingRecord([
      { date: new Date(), exercise: 'push', comment: "早期臺灣陶瓷的發展主要是受到大陸福建移民的影響，在各大窯場裏的陶師都是由「唐山師傅」擔任，他們帶來陶瓷製作的技術。「唐山師傅」指的就是泉州師傅和福州師傅，", weight: 20, reps: 12 },
      { date: new Date(), exercise: 'push', comment: "asasdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddd", weight: 40, reps: 12 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 50, reps: 10 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 6 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 6 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 6 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 5 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 40, reps: 12 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 50, reps: 10 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 55, reps: 8 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 55, reps: 8 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 5 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 6 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 7 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 5 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 5 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 50, reps: 11 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 50, reps: 9 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 50, reps: 10 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 3 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 50, reps: 10 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 50, reps: 10 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 55, reps: 8 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 5 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 5 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 5 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 5 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 5 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 65, reps: 3 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 65, reps: 2 },
      { date: new Date(), exercise: 'push', comment: "1", weight: 60, reps: 5 }
    ]).then(res => {
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