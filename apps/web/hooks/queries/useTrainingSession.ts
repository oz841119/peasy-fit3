import {
	getUserTrainingSessionStatus,
	getUserTrainingSessions,
	patchUserTrainingSessionStatusActive,
} from "@/services/trainingSession";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

const USER_TRAINING_SESSION_IS_ACTIVE_QUERY_KEY =
	"_useUserTrainingSessionStatus";
const USER_TRAINING_SESSIONS_QUERY_KEY = "_useUserTrainingSessions";
export const useUserTrainingSessionStatus = () => {
	const result = useQuery({
		queryKey: [USER_TRAINING_SESSION_IS_ACTIVE_QUERY_KEY],
		queryFn: getUserTrainingSessionStatus,
	});
	return result;
};

export const useUserTrainingSessionIsActiveMutation = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	return useMutation({
		mutationFn: async (
			opts: { isActive: true; name: string } | { isActive: false },
		) => {
			const status = await patchUserTrainingSessionStatusActive(opts);
			return status;
		},
		onSuccess: (status: boolean) => {
			queryClient.invalidateQueries({
				queryKey: [USER_TRAINING_SESSION_IS_ACTIVE_QUERY_KEY],
			});
			if (status) {
				toast({
					title: "Success",
					description: "Session Start.",
				});
			} else {
				toast({
					title: "Success",
					description: "Session End.",
				});
			}
		},
	});
};

export const useUserTrainingSessions = () => {
	const result = useQuery({
		queryKey: [USER_TRAINING_SESSIONS_QUERY_KEY],
		queryFn: getUserTrainingSessions,
	});
	return result;
};
