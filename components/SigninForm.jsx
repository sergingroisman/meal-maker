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
import MaskedInput from "react-text-mask"

const INITIAL_STATE = {
  data: null,
}

export function SigninForm() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE)
  const { isMobile } = useDimensions()

  return (  
    <div className={`w-full max-w-md ${!isMobile && "pt-[50px]"}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.4, duration: 0.2, ease: "easeIn" }
        }}
      >
        <form action={formAction} className="text-primary">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Fazer login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Telefone Celular
                </Label>
                <MaskedInput
                  mask={[
                    '(',
                    /[1-9]/,
                    /\d/,
                    ')',
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/
                  ]}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="(XX) XXXXX-XXXX"
                  guide={false}
                  id="phone_number"
                  name="phone_number"
                  type="phone_number"
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