'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/shadcnUI/alert-dialog"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"

export const DeleteDialog = () => {
  const t = useTranslations()
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className="cursor-pointer text-muted-foreground hover:text-foreground"/>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{ t('msg.dialog.confirmIfdelete') }</AlertDialogTitle>
          <AlertDialogDescription>{ t('msg.dialog.deletionCannotBeUndone') }</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{ t('common.cancel') }</AlertDialogCancel>
          <AlertDialogAction>{ t('common.continue') }</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}