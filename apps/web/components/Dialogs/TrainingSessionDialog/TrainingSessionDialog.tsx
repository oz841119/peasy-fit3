import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/shadcnUI/alert-dialog";

interface Props {
  open: boolean;
  trainingSession: {
    id: string;
    name: string;
    startAt: Date;
    endAt: Date;
    trainings: {
      id: string;
      name: string;
      sets: number;
      reps: number;
      weight: number;
      rest: number;
      comment: string;
    }[];
  } | null;
  isLoading?: boolean;
}
export const TrainingSessionDialog = (
  { open, trainingSession, isLoading }: Props) => {
  return <AlertDialog open={open}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>asd</AlertDialogTitle>
        <AlertDialogDescription>
          asd
        </AlertDialogDescription>
      </AlertDialogHeader>
      {/* <AlertDialogFooter>
      <Button variant="outline" onClick={() => onOpenChange("cancel")}>
        {t("common.cancel")}
      </Button>
      <Button onClick={() => onOpenChange("delete")}>
        {t("common.delete")}
      </Button>
    </AlertDialogFooter> */}
    </AlertDialogContent>
  </AlertDialog>;
};
