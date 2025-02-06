type AddExercise = (body: {
  exerciseList: string[]
}) => Promise<{ createdCount: number, content: { id: number, name: string }[] }>
export const addUserExercise: AddExercise = async (body) => {
  return fetch('/api/exercise', {
    method: 'POST',
    body: JSON.stringify(body)
  }).then(res => {
    if(res.ok) {
      return res.json()
    } else {
      throw new Error(`Error: ${res.status} - ${res.statusText}`)
    }
  })
}

export const getUserExerciseList: () => Promise<Array<{id: number, name: string}>> = async () => {
  return fetch('/api/exercise', {
    method: 'GET',
  }).then(res => {
    if(res.ok) {
      return res.json()
    } else {
      throw new Error(`Error: ${res.status} - ${res.statusText}`)
    }
  })
}

export const deleteUserExercise: ({ id }: { id: number }) => Promise<any> = ({ id }) => {
  return fetch('/api/exercise', {
    method: 'DELETE',
    body: JSON.stringify({ id })
  }).then(res => {
    if(res.ok) {
      return res.json()
    } else {
      throw new Error(`Error: ${res.status} - ${res.statusText}`)
    }
  })
}