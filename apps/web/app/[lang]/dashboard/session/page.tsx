"use client";
import { BaseCard } from "@/components/Cards/BaseCard";
import { UserTrainingActiveStatus } from "@/components/Status/UserTrainingActiveStatus";
import { Button } from "@/components/shadcnUI/button";
import { Input } from "@/components/shadcnUI/input";
import { Label } from "@/components/shadcnUI/label";
import {
	useUserTrainingSessionIsActiveMutation,
	useUserTrainingSessionStatus,
} from "@/hooks/queries/useTrainingSession";
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";

const sessionNameSchema = z.string().min(0).max(255);

export default function SessionPage() {
	const t = useTranslations();
	const [defaultSessionName] = useState<string>(dayjs().format("YYYY-MM-DD"));
	const { toast } = useToast();
	const {
		mutate: patchUserTrainingSessionStatusActiveMutate,
		error: patchUserTrainingSessionStatusActiveMutateError,
	} = useUserTrainingSessionIsActiveMutation();
	const {
		data: userTrainingSessionStatus,
		isLoading: userTrainingSessionStatusLoading,
		error: userTrainingSessionStatusError,
	} = useUserTrainingSessionStatus();
	const startSession = () => {
		if (!sessionInputRef.current) return;
		const { value } = sessionInputRef.current;
		const sessionNameParseResult = sessionNameSchema.safeParse(value);
		if (sessionNameParseResult.error) {
			const errorsMsg = sessionNameParseResult.error?.issues
				.map(({ message }) => message)
				.join(", ");
			toast({
				title: "Error",
				description: errorsMsg,
				variant: "destructive",
			});
			return;
		}
		patchUserTrainingSessionStatusActiveMutate({
			isActive: true,
			name: value === "" ? defaultSessionName : value,
		});
	};
	const finishSession = () => {
		patchUserTrainingSessionStatusActiveMutate({ isActive: false });
	};

	useEffect(() => {
		(function handlePatchUserTrainingSessionStatusActiveMutateError() {
			if (patchUserTrainingSessionStatusActiveMutateError) {
				toast({
					title: "Error",
					description: patchUserTrainingSessionStatusActiveMutateError.message,
					variant: "destructive",
				});
			}
		})();
	}, [patchUserTrainingSessionStatusActiveMutateError, toast]);
	const sessionInputRef = useRef<HTMLInputElement>(null);
	return (
		<div>
			<BaseCard
				title={t("card.currentSession.title")}
				description={t("card.currentSession.description")}
			>
				<div className="mb-4 flex items-center gap-2">
					<span className="font-bold">訓練狀態</span>
					{userTrainingSessionStatusError ? (
						<span className=" text-red-500"> 系統錯誤 </span>
					) : userTrainingSessionStatus?.isActive ? (
						<span className=" text-green-500"> 訓練中 </span>
					) : (
						<span className=" text-red-500"> 休息中 </span>
					)}
					<UserTrainingActiveStatus size="16" />
				</div>
				{userTrainingSessionStatus?.isActive ? (
					<div>
						<Button className="w-full" onClick={finishSession}>
							結束訓練
						</Button>
					</div>
				) : (
					<div className="w-80">
						<div className="mb-4">
							<Label>Session Name</Label>
							<Input
								className="w-full"
								placeholder={dayjs().format("YYYY-MM-DD")}
								ref={sessionInputRef}
							/>
						</div>
						<div>
							<Button className="w-full" onClick={startSession}>
								開始訓練
							</Button>
						</div>
					</div>
				)}
			</BaseCard>
		</div>
	);
}
