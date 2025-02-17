export const getUserTrainingSessionStatusActive: () => Promise<boolean> = async () => {
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

export const patchUserTrainingSessionStatusActive: (isActive: boolean) => Promise<boolean> = async (isActive) => {
  return fetch('/api/training-session/status', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ isActive })
  }).then(res => {
    if(res.ok) {
      return res.json()
    } else {
      throw new Error(`Error: ${res.status} - ${res.statusText}`)
    }
  })
}