import { NextRequest } from "next/server"

export const POST = async (request: NextRequest) => {
  const { exercise } = await request.json()
  return Response.json([
    { id: Math.random().toString(), date: "113.08.06", exercise: exercise, comment: "早期臺灣陶瓷的發展主要是受到大陸福建移民的影響，在各大窯場裏的陶師都是由「唐山師傅」擔任，他們帶來陶瓷製作的技術。「唐山師傅」指的就是泉州師傅和福州師傅，", weight: 20, reps: 12 },
    { id: Math.random().toString(), date: "113.08.06", exercise: exercise, comment: "asasdasdasdasdasdddddddddddddddddddddddddddddddddddddddddddddddd", weight: 40, reps: 12 },
    { id: Math.random().toString(), date: "113.08.06", exercise: exercise, comment: "1", weight: 50, reps: 10 },
    { id: Math.random().toString(), date: "113.08.06", exercise: exercise, comment: "1", weight: 60, reps: 6 },
    { id: Math.random().toString(), date: "113.08.06", exercise: exercise, comment: "1", weight: 60, reps: 6 },
    { id: Math.random().toString(), date: "113.08.06", exercise: exercise, comment: "1", weight: 60, reps: 6 },
    { id: Math.random().toString(), date: "113.08.06", exercise: exercise, comment: "1", weight: 60, reps: 5 },
    { id: Math.random().toString(), date: "113.09.03", exercise: exercise, comment: "1", weight: 40, reps: 12 },
    { id: Math.random().toString(), date: "113.09.03", exercise: exercise, comment: "1", weight: 50, reps: 10 },
    { id: Math.random().toString(), date: "113.09.03", exercise: exercise, comment: "1", weight: 55, reps: 8 },
    { id: Math.random().toString(), date: "113.09.03", exercise: exercise, comment: "1", weight: 55, reps: 8 },
    { id: Math.random().toString(), date: "113.09.09", exercise: exercise, comment: "1", weight: 60, reps: 5 },
    { id: Math.random().toString(), date: "113.09.09", exercise: exercise, comment: "1", weight: 60, reps: 6 },
    { id: Math.random().toString(), date: "113.09.09", exercise: exercise, comment: "1", weight: 60, reps: 7 },
    { id: Math.random().toString(), date: "113.09.09", exercise: exercise, comment: "1", weight: 60, reps: 5 },
    { id: Math.random().toString(), date: "113.09.09", exercise: exercise, comment: "1", weight: 60, reps: 5 },
    { id: Math.random().toString(), date: "119.09.16", exercise: exercise, comment: "1", weight: 50, reps: 11 },
    { id: Math.random().toString(), date: "119.09.16", exercise: exercise, comment: "1", weight: 50, reps: 9 },
    { id: Math.random().toString(), date: "119.09.16", exercise: exercise, comment: "1", weight: 50, reps: 10 },
    { id: Math.random().toString(), date: "119.09.16", exercise: exercise, comment: "1", weight: 60, reps: 3 },
    { id: Math.random().toString(), date: "119.09.16", exercise: exercise, comment: "1", weight: 50, reps: 10 },
    { id: Math.random().toString(), date: "113.09.23", exercise: exercise, comment: "1", weight: 50, reps: 10 },
    { id: Math.random().toString(), date: "113.09.23", exercise: exercise, comment: "1", weight: 55, reps: 8 },
    { id: Math.random().toString(), date: "113.09.23", exercise: exercise, comment: "1", weight: 60, reps: 5 },
    { id: Math.random().toString(), date: "113.09.23", exercise: exercise, comment: "1", weight: 60, reps: 5 },
    { id: Math.random().toString(), date: "113.09.23", exercise: exercise, comment: "1", weight: 60, reps: 5 },
    { id: Math.random().toString(), date: "113.10.04", exercise: exercise, comment: "1", weight: 60, reps: 5 },
    { id: Math.random().toString(), date: "113.10.04", exercise: exercise, comment: "1", weight: 60, reps: 5 },
    { id: Math.random().toString(), date: "113.10.04", exercise: exercise, comment: "1", weight: 65, reps: 3 },
    { id: Math.random().toString(), date: "113.10.04", exercise: exercise, comment: "1", weight: 65, reps: 2 },
    { id: Math.random().toString(), date: "113.10.04", exercise: exercise, comment: "1", weight: 60, reps: 5 }
  ])
}