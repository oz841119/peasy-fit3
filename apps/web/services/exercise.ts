type AddExercise = (body: {
  exercise: string
}) => Promise<{ isSuccess: boolean }>
export const addExercise: AddExercise = async (body) => {
  return fetch('/api/exercise', {
    method: 'POST',
    body: JSON.stringify(body)
  }).then(res => res.json())
}