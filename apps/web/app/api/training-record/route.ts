import { NextRequest } from "next/server"

export const GET = () => {
  return Response.json([
    { 
      id: Math.random().toString(),
      date: '2024-09-22',
      type: '腿',
      comment: '棒',
      exercise: [
        { name: '槓鈴臥推', reps: 12, weight: 30, id: Math.random().toString() },
        { name: '槓鈴臥推', reps: 12, weight: 30, id: Math.random().toString() },
        { name: '槓鈴臥推', reps: 12, weight: 30, id: Math.random().toString() },
        { name: '槓鈴臥推', reps: 12, weight: 30, id: Math.random().toString() },
        { name: '槓鈴臥推', reps: 12, weight: 30, id: Math.random().toString() },
        { name: '槓鈴臥推', reps: 12, weight: 30, id: Math.random().toString() },
      ]
    }
  ])
}

export const POST = async (request: NextRequest) => {
  const { exercise } = await request.json()
  return Response.json([
    { date: "113.08.06", exercise: exercise, weight: 20, reps: 12 },
    { date: "113.08.06", exercise: exercise, weight: 40, reps: 12 },
    { date: "113.08.06", exercise: exercise, weight: 50, reps: 10 },
    { date: "113.08.06", exercise: exercise, weight: 60, reps: 6 },
    { date: "113.08.06", exercise: exercise, weight: 60, reps: 6 },
    { date: "113.08.06", exercise: exercise, weight: 60, reps: 6 },
    { date: "113.08.06", exercise: exercise, weight: 60, reps: 5 },
    { date: "113.09.03", exercise: exercise, weight: 40, reps: 12 },
    { date: "113.09.03", exercise: exercise, weight: 50, reps: 10 },
    { date: "113.09.03", exercise: exercise, weight: 55, reps: 8 },
    { date: "113.09.03", exercise: exercise, weight: 55, reps: 8 },
    { date: "113.09.09", exercise: exercise, weight: 60, reps: 5 },
    { date: "113.09.09", exercise: exercise, weight: 60, reps: 6 },
    { date: "113.09.09", exercise: exercise, weight: 60, reps: 7 },
    { date: "113.09.09", exercise: exercise, weight: 60, reps: 5 },
    { date: "113.09.09", exercise: exercise, weight: 60, reps: 5 },
    { date: "119.09.16", exercise: exercise, weight: 50, reps: 11 },
    { date: "119.09.16", exercise: exercise, weight: 50, reps: 9 },
    { date: "119.09.16", exercise: exercise, weight: 50, reps: 10 },
    { date: "119.09.16", exercise: exercise, weight: 60, reps: 3 },
    { date: "119.09.16", exercise: exercise, weight: 50, reps: 10 },
    { date: "113.09.23", exercise: exercise, weight: 50, reps: 10 },
    { date: "113.09.23", exercise: exercise, weight: 55, reps: 8 },
    { date: "113.09.23", exercise: exercise, weight: 60, reps: 5 },
    { date: "113.09.23", exercise: exercise, weight: 60, reps: 5 },
    { date: "113.09.23", exercise: exercise, weight: 60, reps: 5 },
    { date: "113.10.04", exercise: exercise, weight: 60, reps: 5 },
    { date: "113.10.04", exercise: exercise, weight: 60, reps: 5 },
    { date: "113.10.04", exercise: exercise, weight: 65, reps: 3 },
    { date: "113.10.04", exercise: exercise, weight: 65, reps: 2 },
    { date: "113.10.04", exercise: exercise, weight: 60, reps: 5 }
  ])
}