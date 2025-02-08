import { getUserTrainingSessionStatusActive, patchUserTrainingSessionStatusActive } from "@/services/trainingSession"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const USER_TRAINING_SESSION_IS_ACTIVE_QUERY_KEY = '_userTrainingSessionIsActive'
export const useUserTrainingSessionIsActiveQuery = () => {
  const result = useQuery({
    queryKey: [USER_TRAINING_SESSION_IS_ACTIVE_QUERY_KEY],
    queryFn: getUserTrainingSessionStatusActive
  })
  return result
}

export const useUserTrainingSessionIsActiveMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (isActive: boolean) => patchUserTrainingSessionStatusActive(isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_TRAINING_SESSION_IS_ACTIVE_QUERY_KEY] })
    }
  })
}