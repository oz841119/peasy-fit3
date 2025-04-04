import { CreateExerciseCard } from "@/components/Cards/CreateExerciseCard/CreateExerciseCard";
import { RemovableExerciseListCard } from "@/components/Cards/ExerciseListCard/ExerciseListCard";

export default function ExercisePage() {
	return (
		<div className="flex flex-col gap-4">
			<CreateExerciseCard />
			<RemovableExerciseListCard />
		</div>
	);
}
