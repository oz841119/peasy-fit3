'use client'
import { BaseCard } from "@/components/Cards/BaseCard";
import { Button } from "@/components/shadcnUI/button";
import { Input } from "@/components/shadcnUI/input";
import { Label } from "@/components/shadcnUI/label";
import { UserTrainingActiveStatus } from "@/components/Status/UserTrainingActiveStatus";
import { useUserTrainingSessionIsActiveMutation, useUserTrainingSessionIsActiveQuery } from "@/hooks/queries/useTrainingSession";
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { z } from "zod";

const sessionNameSchema = z.string().min(1).max(255)

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
  const startSession = () => {
    if(!sessionInputRef.current) return
    const { value } = sessionInputRef.current
    const sessionNameParseResult = sessionNameSchema.safeParse(value)
    if(sessionNameParseResult.error) {
      const errorsMsg = sessionNameParseResult.error?.issues.map(({ message }) => message).join(', ')
      toast({
        title: "Error",
        description: errorsMsg,
        variant: "destructive"
      })
      return
    }
    patchUserTrainingSessionStatusActiveMutate(true)
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
  const sessionInputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <BaseCard title={t('card.currentSession.title')} description={t('card.currentSession.description')}>
        <div className="mb-4">
          <span className="font-bold">訓練狀態</span>
          {
            userTrainingSessionIsActive 
              ? <span className=" text-green-500"> 訓練中 </span> 
              : <span className=" text-red-500"> 休息中 </span> 
          }
          <UserTrainingActiveStatus size="16"/>
        </div>
        {
          userTrainingSessionIsActive
            ? <div>123</div>
            : (
              <div className="w-80">
                <div className="mb-4">
                  <Label>Session Name</Label>
                  <Input className="w-full" placeholder={dayjs().format('YYYY-MM-DD')} ref={sessionInputRef}/>
                </div>
                <div>
                <Button className="w-full" onClick={startSession}>開始訓練</Button>
                </div>
              </div>
            )
        }
      </BaseCard>
    </div>
  );
}