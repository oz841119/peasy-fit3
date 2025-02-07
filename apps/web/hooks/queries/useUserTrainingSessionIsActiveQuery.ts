import { getUserTrainingSessionStatusActive } from "@/services/trainingSession"
import { useQuery } from "@tanstack/react-query"

export const useUserTrainingSessionIsActiveQuery = () => {
  const result = useQuery({
    queryKey: ['userTrainingSessionIsActive'],
    queryFn: getUserTrainingSessionStatusActive
  })
  return result
}