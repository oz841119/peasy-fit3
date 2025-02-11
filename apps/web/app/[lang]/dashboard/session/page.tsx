'use client'
import { BaseCard } from "@/components/Cards/BaseCard";
import { Button } from "@/components/shadcnUI/button";
import { UserTrainingActiveStatus } from "@/components/Status/UserTrainingActiveStatus";
import { useUserTrainingSessionIsActiveMutation, useUserTrainingSessionIsActiveQuery } from "@/hooks/queries/useTrainingSession";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function SessionPage() {
  const t = useTranslations()
  const {toast} = useToast()
  const {
    mutate: patchUserTrainingSessionStatusActiveMutate,
    error: patchUserTrainingSessionStatusActiveMutateError
  } = useUserTrainingSessionIsActiveMutation()
  const {
    data: userTrainingSessionIsActive,
    isLoading: userTrainingSessionIsActiveLoading
  } = useUserTrainingSessionIsActiveQuery()
  const click = async () => {
    if(!userTrainingSessionIsActiveLoading) {
      patchUserTrainingSessionStatusActiveMutate(!userTrainingSessionIsActive)
    } else {
      toast({
        title: "Error",
        description: t('msg.errors.pleaseTryAgainLater'),
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    (function handlePatchUserTrainingSessionStatusActiveMutateError () {
      if (patchUserTrainingSessionStatusActiveMutateError) {
        toast({
          title: "Error",
          description: patchUserTrainingSessionStatusActiveMutateError.message,
          variant: "destructive"
        })
      }
    })()
  }, [patchUserTrainingSessionStatusActiveMutateError])
  return (
    <div>
      <BaseCard title={t('card.currentSession.title')} description={t('card.currentSession.description')}>
        <div>
          <span className="font-bold">訓練狀態:</span>
          {
            userTrainingSessionIsActive 
              ? <span className=" text-green-500"> 訓練中 </span> 
              : <span className=" text-red-500"> 休息中 </span> 
          }
          <UserTrainingActiveStatus size="16"/>
        </div>
        <Button onClick={click}>Click</Button>
      </BaseCard>
    </div>
  );
}