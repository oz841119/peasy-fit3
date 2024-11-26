interface TrainingRecord {
  date: Date; exerciseId: number; weight: number; reps: number; id: string; comment: string
}

export const getTrainingRecordList = async (params: {
  exerciseId?: number;
  skip?: number;
  take?: number;
}): Promise<
  Array<TrainingRecord>
> => {
  const searchParams = new URLSearchParams()
  const keyValuePairs = Object.entries(params)
  keyValuePairs.forEach(pair => {
    if(pair[1] !== undefined) {
      searchParams.append(pair[0], pair[1].toString())
    }
  })
  return fetch('/api/training-record?' + searchParams, {
    method: "GET",
  }).then((res) => res.json());
};

interface Params {
  date: Date; exerciseId: number; weight: number; reps: number; comment: string
}
export const addTrainingRecord = async (params: Params[]) => {
  return fetch("/api/training-record", {
    method: "POST",
    body: JSON.stringify(params),
  }).then((res) => res.json());
}

export const deleteTrainingRecord = async (ids: string[]) => {
  return fetch("/api/training-record", {
    method: "DELETE",
    body: JSON.stringify({ ids }),
  }).then((res) => res.json());
}