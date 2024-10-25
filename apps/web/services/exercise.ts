type AddExercise = (body: {
  exercise: string
}) => Promise<{ isSuccess: boolean }>
export const addExercise: AddExercise = async (body) => {
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

export const getExerciseList: () => Promise<Array<{id: number, name: string}>> = async () => {
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

export const deleteExercise: ({ id }: { id: number }) => Promise<any> = ({ id }) => {
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