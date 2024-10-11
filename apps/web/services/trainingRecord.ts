interface TrainingRecord {
  date: Date; exercise: string; weight: number; reps: number; id: string; comment: string
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

export const addTrainingRecord = async (params: Array<Omit<TrainingRecord, 'id'>>) => {
  return fetch("/api/training-record", {
    method: "POST",
    body: JSON.stringify(params),
  }).then((res) => res.json());
}