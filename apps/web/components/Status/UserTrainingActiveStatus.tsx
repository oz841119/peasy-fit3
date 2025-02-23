import { useUserTrainingSessionStatus } from "@/hooks/queries/useTrainingSession"
import { CircleX, Dumbbell, Loader2 } from "lucide-react"
import { Tooltip } from "@/components/ui/Tooltip";
import { useTranslations } from "next-intl";

interface UserTrainingActiveStatusProps {
  size?: string | number
  showName?: boolean
}
export const UserTrainingActiveStatus = (({ size, showName = false }: UserTrainingActiveStatusProps) => {
  const t = useTranslations()
  const {
    data: userTrainingSessionStatus,
    isError: userTrainingSessionStatusError,
    isLoading: userTrainingSessionStatusLoading
  } = useUserTrainingSessionStatus()
  return (
    userTrainingSessionStatusLoading
      ? (<Loader2 className="animate-spin inline-block" size={size}/>)
      : userTrainingSessionStatusError 
        ? (
          <Tooltip text={t('msg.errors.systemError')} >
            <div className="flex items-center gap-2">
              <span>{t('msg.errors.systemError')}</span>
              <CircleX color="red" size={size} className="inline-block"/>
            </div>
          </Tooltip>
        )
        :(
          <Tooltip text={userTrainingSessionStatus?.isActive ? t('common.inTraining') : t('common.notInTraining')}>
            <div className="flex items-center gap-2">
              {showName && <span>{userTrainingSessionStatus?.trainingSession?.name}</span>}
              <Dumbbell color={userTrainingSessionStatus?.isActive ? 'green' : 'red'} size={size} className="inline-block"/>
            </div>
          </Tooltip>
        )
  )
})