"use client";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/shadcnUI/alert-dialog";
import { Button } from "@/components/shadcnUI/button";
import { useTranslations } from "next-intl";

interface Props {
	open: boolean;
	onOpenChange: (source: "cancel" | "delete") => void;
}
export const DeleteDialog = ({ open, onOpenChange }: Props) => {
	const t = useTranslations();
	return (
		<AlertDialog open={open}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{t("msg.dialog.confirmIfDelete")}</AlertDialogTitle>
					<AlertDialogDescription>
						{t("msg.dialog.deletionCannotBeUndone")}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button variant="outline" onClick={() => onOpenChange("cancel")}>
						{t("common.cancel")}
					</Button>
					<Button onClick={() => onOpenChange("delete")}>
						{t("common.delete")}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
