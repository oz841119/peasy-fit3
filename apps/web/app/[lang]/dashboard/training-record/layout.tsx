import { TrainingRecordContextProvider } from "@/contexts/TrainingRecordContext";
import type { PropsWithChildren } from "react";

export default function TrainingRecordLayout({ children }: PropsWithChildren) {
	return (
		<TrainingRecordContextProvider>{children}</TrainingRecordContextProvider>
	);
}
