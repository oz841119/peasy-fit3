export const getExerciseByNames = async (names: string[]): Promise<Array<{ id: number, name: string }>> => {
  return fetch(`/api/public/exercise?names=${names.join(',')}`).then(res => res.json())
}