export const getTrainingRecord = async () => {
  return fetch('/api/training-record').then(res => res.json())
}

export const postTrainingRecord = async (params: {
  exercise: string
}): Promise<Array<{ date: string, exercise: string, weight: number, reps: number }>> => {
  return fetch('/api/training-record', {
    method: 'POST',
    body: JSON.stringify(params)
  }).then(res => res.json())
}