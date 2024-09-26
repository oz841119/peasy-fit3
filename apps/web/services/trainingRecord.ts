export const getTrainingRecord = async () => {
  return fetch('/api/training-record').then(res => res.json())
}