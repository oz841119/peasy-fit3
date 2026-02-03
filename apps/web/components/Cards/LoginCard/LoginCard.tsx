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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ChangeEvent, FormEventHandler } from "react";
import { useImmer } from "use-immer";
import { loginWithGoogle } from "@/services/loginWithGoogle";

export const LoginCard = () => {
  const t = useTranslations();

  const [credential, updateCredential] = useImmer({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleCredentialInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    target: "email" | "password"
  ) => {
    updateCredential((draft) => {
      switch (target) {
        case "email": {
          draft.email = e.target.value;
          break;
        }
        case "password": {
          draft.password = e.target.value;
          break;
        }
      }
    });
  };

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const loginResult = await signIn("credentials", {
      redirect: false,
      ...credential,
    });
    if (
      loginResult &&
      loginResult.error === null &&
      loginResult.status === 200
    ) {
      router.push("/dashboard");
    } else {
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
        <CardTitle className="text-2xl">{t("card.login.title")}</CardTitle>
        <CardDescription>{t("card.login.description")}</CardDescription>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t("common.email")}</Label>
              <Input
                id="email"
                type="email"
                defaultValue={credential.email}
                onChange={(e) => handleCredentialInputChange(e, "email")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">{t("common.password")}</Label>
              <Input
                id="password"
                type="password"
                defaultValue={credential.password}
                onChange={(e) => handleCredentialInputChange(e, "password")}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col w-full gap-4">
            <Button className="mt-2 w-full" type="submit">
              {t("common.login")}
            </Button>
            <GoogleLoginButton onLogin={loginWithGoogle} />
            <div className="text-center text-sm">
              {t("card.login.noAccount")}{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                {t("card.login.registerHere")}
              </Link>
            </div>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};
