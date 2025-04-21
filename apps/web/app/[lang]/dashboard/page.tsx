"use client";
import { FullCalendar } from "@/components/FullCalendar/FullCalendar";
import { TrainingSessionDialogProvider, useTrainingSessionDialogContext } from "@/contexts/TrainingSessionDialogContext";
import { useUserTrainingSessions } from "@/hooks/queries/useTrainingSession";

export default function DashboardPage() {
	return (
		<TrainingSessionDialogProvider>
			<Content />
		</TrainingSessionDialogProvider>
	)
}

const Content = () => {
	const { data } = useUserTrainingSessions();
	const events = data?.map((session) => ({
		id: session.id,
		text: session.name,
		date: session.startAt,
	}));
	const handleEventClick = (event: { id: string; text: string; date: Date }) => {
		const trainingSession = data?.find((session) => session.id === event.id);
		if (!trainingSession) {
			return;
		}
		open({
			trainingSessionId: trainingSession.id
		});
	};
	const { open } = useTrainingSessionDialogContext()
	return (
		<div>
			<FullCalendar events={events} onEventClick={handleEventClick} />
		</div>
	);
}
