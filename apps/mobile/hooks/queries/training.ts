import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 模擬 API 函數
const getTrainingStatus = async () => {
  // TODO: 替換為實際的 API 調用
  return { isTraining: false };
};

const startTraining = async () => {
  // TODO: 替換為實際的 API 調d用
  return { success: true };
};

const endTraining = async () => {
  // TODO: 替換為實際的 API 調用
  return { success: true };
};

// 訓練狀態查詢
export const useTrainingStatus = () => {
  return useQuery({
    queryKey: ['trainingStatus'],
    queryFn: getTrainingStatus,
  });
};

// 開始訓練 mutation
export const useStartTraining = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: startTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainingStatus'] });
    },
  });
};

// 結束訓練 mutation
export const useEndTraining = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: endTraining,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainingStatus'] });
    },
  });
}; 