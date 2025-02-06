export const getUserTrainingSessionStatus: () => Promise<boolean> = async () => {
  return fetch('/api/training-session/status', {
    method: 'GET',
  }).then(res => {
    if(res.ok) {
      return res.json()
    } else {
      throw new Error(`Error: ${res.status} - ${res.statusText}`)
    }
  })
}