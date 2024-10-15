'use client'
import { Button } from "@/components/shadcnUI/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcnUI/card";
import { Input } from "@/components/shadcnUI/input";
import { Label } from "@/components/shadcnUI/label";
import { loginWithCredential } from "@/services/auth";
import { ChangeEvent, FormEventHandler } from "react";
import { useImmer } from "use-immer";
import { SessionProvider, signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const [credential, updateCredential] = useImmer({ email: '', password: ''})
  const handleCredentialInputChange = (e: ChangeEvent<HTMLInputElement>, target: 'email' | 'password') => {
    updateCredential(draft =>{
      switch (target) {
        case 'email': { draft.email = e.target.value; break }
        case 'password': { draft.password = e.target.value; break }
      }
    })
  }
  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const a = await signIn('credentials', { redirect: false, ...credential })
    console.log(a);
  }
  const v = useSession()
  console.log(v);
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-96 w-11/12">
        <CardHeader>
          <CardTitle className="text-2xl">LOGIN</CardTitle>
          <CardDescription>Enter your email below to login to your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" onChange={(e) => handleCredentialInputChange(e, 'email')}/>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" onChange={(e) => handleCredentialInputChange(e, 'password')}/>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="mt-2 w-full" type="submit">LOGIN</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}