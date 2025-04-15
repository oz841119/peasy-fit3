"use client";
import { GoogleLoginButton } from "@/components/Buttons/GoogleLoginButton";
import { Button } from "@/components/shadcnUI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnUI/card";
import { Input } from "@/components/shadcnUI/input";
import { Label } from "@/components/shadcnUI/label";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginWithGoogle } from "@/services/loginWithGoogle";

const registerSchema = z.object({
  name: z.string().min(2, "msg.errors.usernameTooShort"),
  email: z.string().email("msg.errors.invalidEmail"),
  password: z.string().min(6, "msg.errors.passwordTooShort"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "msg.errors.passwordsNeedToMatch",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterCard = () => {
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      toast({
        title: t("msg.success.registrationComplete"),
        description: t("msg.success.accountCreated"),
      });
    } catch (error) {
      toast({
        title: t("msg.errors.systemError"),
        description: t("msg.errors.pleaseTryAgainLater"),
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-96 w-11/12">
      <CardHeader>
        <CardTitle className="text-2xl">{t("card.register.title")}</CardTitle>
        <CardDescription>
          {t("card.register.description")}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">{t("common.username")}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t("common.username")}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{t(errors.name.message as any)}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t("common.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{t(errors.email.message as any)}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">{t("common.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("common.password")}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{t(errors.password.message as any)}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">{t("common.confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t("common.confirmPassword")}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{t(errors.confirmPassword.message as any)}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full gap-4">
            <Button
              className="mt-2 w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {t("common.register")}
            </Button>
            <GoogleLoginButton onLogin={loginWithGoogle} />
            <div className="text-center text-sm">
              {t("card.register.alreadyHaveAccount")} <Link href="/login" className="text-blue-500 hover:underline">{t("card.register.loginHere")}</Link>
            </div>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}; 