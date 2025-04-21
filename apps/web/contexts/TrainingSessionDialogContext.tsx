import { TrainingSessionDialog } from "@/components/Dialogs/TrainingSessionDialog/TrainingSessionDialog";
import { createContext, useContext, useState } from "react";

const TrainingSessionDialogContext = createContext<{
  open: ({ trainingSessionId }: { trainingSessionId: string }) => void;
}>({ open: () => { } });

export const useTrainingSessionDialogContext = () => {
  return useContext(TrainingSessionDialogContext);
};

export const TrainingSessionDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [trainingSessionId, setTrainingSessionId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const open = ({ trainingSessionId }: { trainingSessionId: string }) => {
    setTrainingSessionId(trainingSessionId);
    setIsDialogOpen(true);
  };
  return (
    <TrainingSessionDialogContext.Provider value={{ open }}>
      {children}
      <TrainingSessionDialog open={isDialogOpen} trainingSession={null} isLoading={false} />
    </TrainingSessionDialogContext.Provider>
  )
};

