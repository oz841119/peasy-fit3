export const getUserTrainingSessionStatus: () => Promise<{
  isActive: boolean;
  trainingSession: { name: string; id: string } | null;
}> = async () => {
  return fetch("/api/training-session/status", {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Error: ${res.status} - ${res.statusText}`);
  });
};

export const patchUserTrainingSessionStatusActive = async (
  opts: { isActive: true; name: string } | { isActive: false }
) => {
  return fetch("/api/training-session/status", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(opts),
  }).then((res) => {
    if (res.ok) {
      return res.json() as Promise<boolean>;
    }
    throw new Error(`Error: ${res.status} - ${res.statusText}`);
  });
};

export const getUserTrainingSessions = async () => {
  return fetch("/api/training-session/list", {
    method: "GET",
  }).then((res) => {
    return res.json() as Promise<{ id: string; name: string; startAt: Date }[]>;
  });
};
