import { TrainingRecordContextProvider } from "@/contexts/TrainingRecordContext";
import { PropsWithChildren } from "react";

export default function TrainingRecordLayout({ children }: PropsWithChildren) {
  return <TrainingRecordContextProvider>{children}</TrainingRecordContextProvider>
}
