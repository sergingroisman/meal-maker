"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { signUp } from "@/services/api"

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 semana
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
}

const schemaRegister = z.object({
  name: z.string().min(3).max(20, {
    message: "O nome deve conter entre 3 e 20 caracteres.",
  }),
  password: z.string().min(6).max(100, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  phone_number: z.string().min(3).max(20, {
    message: "Insira um número válido",
  }),
})

export async function registerUserAction(prevState, formData) {
  console.log("Hello From Register User Action")

  const validatedFields = schemaRegister.safeParse({
    name: formData.get("name"),
    phone_number: formData.get("phone_number"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      ApiErrors: null,
      message: "Missing Fields. Failed to Register.",
    }
  }

  const responseData = await signUp(validatedFields.data)

  if (!responseData) {
    return {
      ...prevState,
      ApiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    }
  }

  if (responseData.error) {
    return {
      ...prevState,
      ApiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    }
  }

  cookies().set("jwt", responseData.accessToken, config)
  cookies().set("user_phone_number", responseData.user.phone_number, config)
  redirect("/")
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 })
  cookies().set("user_phone_number", "", { ...config, maxAge: 0 })
  redirect("/")
}