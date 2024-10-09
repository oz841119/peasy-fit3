export const postTrainingRecord = async (params: {
  exercise: string;
}): Promise<
  Array<{ date: string; exercise: string; weight: number; reps: number; id: string; comment: string }>
> => {
  return fetch("/api/training-record", {
    method: "POST",
    body: JSON.stringify(params),
  }).then((res) => res.json());
};
