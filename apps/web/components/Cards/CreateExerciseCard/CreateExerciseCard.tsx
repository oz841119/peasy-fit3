"use client";
import { Button } from "@/components/shadcnUI/button";
import { Input } from "@/components/shadcnUI/input";
import { useToast } from "@/hooks/use-toast";
import { addUserExercise } from "@/services/userExercise";
import type { PropsWithClassName } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { type FormEventHandler, useState } from "react";
import { z } from "zod";
import { BaseCard } from "../BaseCard";
export const CreateExerciseCard = ({ className }: PropsWithClassName) => {
	const t = useTranslations();
	const { toast } = useToast();
	const [exercise, setExercise] = useState("");
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: ({ exercise }: { exercise: string }) =>
			addUserExercise({ exerciseList: [exercise] }),
		onSuccess: (result) => {
			queryClient.invalidateQueries({ queryKey: ["exerciseList"] });
			if (result.createdCount !== 0) {
				toast({
					title: "Success",
					description: result.content.map(({ name }) => name).join(","),
				});
			} else {
				toast({
					title: "Error",
					description: "No exercise was created",
					variant: "destructive",
				});
			}
		},
		onError: (error) => {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});
	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		const exerciseSchema = z
			.string()
			.min(2, { message: "Must be 2 or more characters long" })
			.max(15, { message: "Must be 15 or fewer characters long" });
		const { data, error } = exerciseSchema.safeParse(exercise);
		if (error) {
			toast({
				title: "Error",
				description: error.issues.map((e) => e.message).join(" | "),
				variant: "destructive",
			});
		} else {
			mutation.mutate({ exercise: data });
		}
	};
	return (
		<BaseCard
			title={t("card.existingExercise.title")}
			description={t("card.existingExercise.description")}
			className={className}
		>
			<form className="flex gap-4" onSubmit={handleSubmit}>
				<Input
					placeholder={t("table.exercise")}
					value={exercise}
					onChange={(e) => setExercise(e.target.value)}
				/>
				<Button type="submit" disabled={!exercise || mutation.isPending}>
					{t("common.create")}
				</Button>
			</form>
		</BaseCard>
	);
};
