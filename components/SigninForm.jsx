"use client"

import { useFormState } from "react-dom"
import Link from "next/link"
import { motion } from "framer-motion"

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { loginUserAction } from "@/app/data/actions/auth-actions"
import { ZodErrors } from "./custom/ZodErrors"
import { SubmitButton } from "./custom/SubmitButton"
import { ApiErrors } from "./custom/ApiErrors"
import useDimensions from "./custom/useDimensions"

const INITIAL_STATE = {
  data: null,
}

export function SigninForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE)
  const { isMobile } = useDimensions()

  return (
    <div className={`w-full max-w-md ${isMobile && "pt-[50px]"}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.4, duration: 0.2, ease: "easeIn" }
        }}
      >
        <form action={formAction}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Fazer login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Seu celular</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="phone_number"
                  placeholder="(xx)xxxxx-xxxx"
                />
                <ZodErrors error={formState?.zodErrors?.phone_number} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Sua senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="senha"
                />
                <ZodErrors error={formState?.zodErrors?.password} />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <SubmitButton className="w-full" text="Fazer login" loadingText="Loading" />
              <ApiErrors error={formState?.ApiErrors} />
              <div className="mt-4 text-center text-sm">
                Não tem conta?
                <Link className="underline ml-2" href="/signup">
                  Criar conta
                </Link>
              </div>
            </CardFooter>
          </Card>
        </form>
      </motion.div>
    </div>
  )
}