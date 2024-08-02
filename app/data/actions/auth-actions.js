"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import parsePhoneNumber from "libphonenumber-js"

import { signIn, signUp } from "@/services/api"

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 semana
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
}

const zPhoneNumber = z.string().transform((value, ctx) => {
  const phoneNumber = parsePhoneNumber(value, {
    defaultCountry: "BR",
  })

  if (!phoneNumber?.isValid()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Insira um número válido",
    })
    return z.NEVER
  }

  return phoneNumber.formatInternational()
})

const schemaRegister = z.object({
  name: z.string().min(3).max(60, {
    message: "O nome deve conter entre 3 e 60 caracteres.",
  }),
  password: z.string().min(6).max(100, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  phone_number: zPhoneNumber,
})

export async function registerUserAction(prevState, formData) {
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
  cookies().set("user_id", responseData.user._id, config)
  redirect("/")
}

const schemaLogin = z.object({
  phone_number: zPhoneNumber,
  password: z
    .string()
    .min(6, {
      message: "A senha deve ter pelo menos 6 caracteres.",
    })
    .max(30, {
      message: "A senha deve ter menos que 30 caracteres.",
    }),
})

export async function loginUserAction(prevState, formData) {
  const validatedFields = schemaLogin.safeParse({
    phone_number: formData.get("phone_number"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Campos faltando. Falha ao fazer login.",
    }
  }

  const responseData = await signIn(validatedFields.data)

  if (!responseData) {
    return {
      ...prevState,
      ApiErrors: null,
      zodErrors: null,
      message: "Alguma coisa está errada, tente novamente mais tarde",
    }
  }

  if (responseData.error) {
    return {
      ...prevState,
      ApiErrors: responseData.error,
      zodErrors: null,
      message: "Falha ao realizar login.",
    }
  }

  cookies().set("jwt", responseData.loggedIn.access_token, config)
  cookies().set("user_id", responseData.loggedIn._id, config)
  redirect("/")
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 })
  cookies().set("user_id", "", { ...config, maxAge: 0 })
  redirect("/")
}