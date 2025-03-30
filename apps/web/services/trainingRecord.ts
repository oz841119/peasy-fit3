interface TrainingRecord {
	date: Date;
	exerciseId: number;
	weight: number;
	reps: number;
	id: number;
	comment: string;
}
interface GetTrainingRecordListResp {
	trainingRecordList: Array<TrainingRecord>;
	total: number;
}
export const getTrainingRecordList = async (params: {
	exerciseId?: number;
	skip?: number;
	take?: number;
	weight?: number;
	reps?: number;
}): Promise<GetTrainingRecordListResp> => {
		const searchParams = new URLSearchParams();
		const keyValuePairs = Object.entries(params);
		keyValuePairs.forEach((pair) => {
			if (pair[1] !== undefined) {
				searchParams.append(pair[0], pair[1].toString());
			}
		});
		return fetch(`/api/training-record?${searchParams}`, {
			method: "GET",
		}).then((res) => res.json());
};

interface Params {
	date: Date;
	exerciseId: number;
	weight: number;
	reps: number;
	comment: string;
	trainingSessionId: string | null;
}
export const addTrainingRecord = async (params: Params[]) => {
		return fetch("/api/training-record", {
			method: "POST",
			body: JSON.stringify(params),
		}).then((res) => {
			if (!res.ok) {
				throw res.json();
			}
			return res.json() as unknown as { count: number };
		});
};

export const deleteTrainingRecord = async (
	ids: number[],
): Promise<{ count: number }> => {
		return fetch("/api/training-record", {
			method: "DELETE",
			body: JSON.stringify({ ids }),
		}).then((res) => res.json());
};
