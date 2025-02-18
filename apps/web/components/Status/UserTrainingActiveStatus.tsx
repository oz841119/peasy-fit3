import { useUserTrainingSessionIsActiveQuery } from "@/hooks/queries/useTrainingSession"
import { CircleX, Dumbbell, Loader2 } from "lucide-react"
import { Tooltip } from "@/components/ui/Tooltip";
import { useTranslations } from "next-intl";

export const UserTrainingActiveStatus = (({ size }: { size?: string | number }) => {
  const t = useTranslations()
  const {
    data: isUserTrainingSessionIsActive,
    isError: isUserTrainingSessionIsActiveError,
    isLoading: isUserTrainingSessionIsActiveLoading
  } = useUserTrainingSessionIsActiveQuery()
  return (
    isUserTrainingSessionIsActiveLoading
      ? (<Loader2 className="animate-spin inline-block" size={size}/>)
      : isUserTrainingSessionIsActiveError 
        ? (
          <Tooltip text={t('msg.errors.systemError')} >
            <CircleX color="red" size={size} className="inline-block"/>
          </Tooltip>
        )
        :(
          <Tooltip text={isUserTrainingSessionIsActive ? t('common.inTraining') : t('common.notInTraining')}>
            <Dumbbell color={isUserTrainingSessionIsActive ? 'green' : 'red'} size={size} className="inline-block"/>
          </Tooltip>
        )
  )
})