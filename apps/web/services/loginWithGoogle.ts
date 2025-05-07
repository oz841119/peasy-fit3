import { signIn } from "next-auth/react";

export const loginWithGoogle = async () => {
  await signIn("google", {
    callbackUrl: "/",
    popup: true,
  });
};