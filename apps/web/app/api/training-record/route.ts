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