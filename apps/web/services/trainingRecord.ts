interface TrainingRecord {
  date: Date; exerciseId: number; weight: number; reps: number; id: string; comment: string
}

export const getTrainingRecordList = async (params: {
  exercise: string;
}): Promise<
  Array<TrainingRecord>
> => {
  const searchParams = new URLSearchParams()
  const keyValuePairs = Object.entries(params)
  keyValuePairs.forEach(pair => {
    searchParams.append(...pair)
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