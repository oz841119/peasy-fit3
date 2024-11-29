export const getExerciseByNames = async (names: string[]) => {
  return fetch(`/api/public/exercise?names=${names.join(',')}`).then(res => res.json())
}