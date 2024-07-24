"use client"

import Link from "next/link"
import { useFormState } from "react-dom"
import { registerUserAction } from "@/app/data/actions/auth-actions"

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card"

import { motion } from "framer-motion"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ZodErrors } from "@/components/custom/ZodErrors"
import { ApiErrors } from "./custom/ApiErrors"
import { SubmitButton } from "./custom/SubmitButton"

const INITIAL_STATE = {
  data: null,
}

export function SignupForm() {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  )
  console.log(formState)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1, duration: 0.4, ease: "easeInOut" }
      }}
    >
      <div className="w-full max-w-md">
        <form action={formAction}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
              <CardDescription>
                Enter your details to create a new account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                />
                <ZodErrors error={formState?.zodErrors?.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_number">Telefone</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="phone_number"
                  placeholder="(xx)xxxxx-xxxx"
                />
                <ZodErrors error={formState?.zodErrors?.phone_number} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                />
                <ZodErrors error={formState?.zodErrors?.password} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <SubmitButton className="w-full" text="Sign Up" loadingText="Loading" />
              <ApiErrors error={formState?.ApiErrors} />
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            Have an account?
            <Link className="underline ml-2" href="signin">
              Sing In
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  )
}