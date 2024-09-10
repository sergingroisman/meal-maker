"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import parsePhoneNumber from "libphonenumber-js"

import { createAccompaniments, createDelivery, createDish, deleteAccompaniment, deleteDelivery, deleteDish, signIn, signUp, updateAccompaniments, updateDelivery, updateDish, updateImgDish, updateUserAddress } from "@/services/api"

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

  const onlyNumbers = validatedFields.data.phone_number.replace(/\D/g, '')
  const responseData = await signUp({ ...validatedFields.data, phone_number: onlyNumbers })

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
  redirect("/perfil")
}

const schemaUpdateUser = z.object({
  street: z.string().max(40, {
    message: "O nome deve conter entre 3 e 40 caracteres.",
  }),
  number: z.string().max(40, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  city: z.string().max(40, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  cep: z.string().max(40, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  state: z.string().max(40, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
  complement: z.string().max(40, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
})

export async function updateUserAddressAction(prevState, formData) {
  const validatedFields = schemaUpdateUser.safeParse({
    street: formData.get("street"),
    number: formData.get("number"),
    city: formData.get("city"),
    cep: formData.get("cep"),
    state: formData.get("state"),
    complement: formData.get("complement"),
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      ApiErrors: null,
      message: "Missing Fields. Failed to Register.",
    }
  }

  const responseData = await updateUserAddress({ ...validatedFields.data })

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

  const onlyNumbers = validatedFields.data.phone_number.replace(/\D/g, '')
  const responseData = await signIn({ ...validatedFields.data, phone_number: onlyNumbers })

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

const schemaCreateDish = z.object({
  title: z.string().min(3).max(40, {
    message: "O nome deve conter entre 3 e 40 caracteres.",
  }),
  price: z.number().positive({
    message: "O preço deve ser um número positivo.",
  }),
  description: z.string().max(200, {
    message: "A descrição deve ter no máximo 200 caracteres.",
  }),
  serves: z.number({
    message: "Por favor, selecione quantas pessoas o prato serve.",
  }),
})

export async function createDishAction(dishData, img_file) {
  const validatedFields = schemaCreateDish.safeParse({
    title: dishData.title,
    price: dishData.price,
    description: dishData.description,
    serves: dishData.serves,
    active: false,
  })

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      ApiErrors: null,
      message: "Missing Fields. Failed to Register.",
    }
  }

  const { data } = await updateImgDish(img_file)

  const responseData = await createDish({ ...validatedFields.data, img_url: data.image_url })

  if (!responseData) {
    return {
      ApiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    }
  }

  if (responseData.error) {
    return {
      ApiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    }
  }

  return {
    ApiErrors: null,
    zodErrors: null,
    message: "Dish created successfully!",
  }
}

export async function updateDishAction(dish_id, dishData, img_file) {
  const validatedFields = schemaCreateDish.safeParse({
    title: dishData.title,
    price: dishData.price,
    description: dishData.description,
    serves: dishData.serves,
  })

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      ApiErrors: null,
      message: "Missing Fields. Failed to Register.",
    }
  }
  let responseData
  if (!!img_file) {
    const { data } = await updateImgDish(img_file)
    responseData = await updateDish(dish_id, { 
      ...validatedFields.data, 
      img_url: data.image_url,
    })
  } else {
    responseData = await updateDish(dish_id, { ...validatedFields.data, active: dishData.active })
  }


  if (!responseData) {
    return {
      ApiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    }
  }

  if (responseData.error) {
    return {
      ApiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    }
  }

  // Retorne o novo estado ou qualquer outra coisa que você precise fazer após a criação do prato
  return {
    ApiErrors: null,
    zodErrors: null,
    message: "Dish created successfully!",
  }
}

export async function deleteDishAction(dish_id) {
  try {
    if (!dish_id) return
    await deleteDish(dish_id)
  } catch (error) {
    return {
      ApiErrors: error,
      zodErrors: null,
      message: "Failed to Delete.",
    }
  }
}

const schemaCreateAccompaniments = z.object({
  title: z.string().min(3).max(40, {
    message: "O nome deve conter entre 3 e 40 caracteres.",
  }),
  smallDescription: z.string().max(100, {
    message: "A descrição deve ter no máximo 100 caracteres.",
  }),
})

export async function createAccompanimentsAction(accData) {
  const validatedFields = schemaCreateAccompaniments.safeParse({
    title: accData.title,
    smallDescription: accData.smallDescription,
  })

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      ApiErrors: null,
      message: "Missing Fields. Failed to Register.",
    }
  }

  const responseData = await createAccompaniments({ ...validatedFields.data })

  if (!responseData) {
    return {
      ApiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    }
  }

  if (responseData.error) {
    return {
      ApiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    }
  }

  return {
    ApiErrors: null,
    zodErrors: null,
    message: "Dish created successfully!",
  }
}

export async function updateAccompanimentsAction(acc_id, accData) {
  const validatedFields = schemaCreateAccompaniments.safeParse({
    title: accData.title,
    smallDescription: accData.smallDescription,
  })

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      ApiErrors: null,
      message: "Missing Fields. Failed to Register.",
    }
  }
  
  const responseData = await updateAccompaniments(acc_id, { ...validatedFields.data })
  // const responseData = await updateAccompaniments(acc_id, { ...validatedFields.data, active: dishData.active })

  if (!responseData) {
    return {
      ApiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    }
  }

  if (responseData.error) {
    return {
      ApiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    }
  }

  return {
    ApiErrors: null,
    zodErrors: null,
    message: "Acompanhamento criado com sucesso",
  }
}

export async function deleteAccompanimentAction(acc_id) {
  try {
    if (!acc_id) return
    await deleteAccompaniment(acc_id)
  } catch (error) {
    return {
      ApiErrors: error,
      zodErrors: null,
      message: "Failed to Delete.",
    }
  }
}

const schemaCreateDelivery = z.object({
  name: z.string().min(3).max(40, {
    message: "O nome deve conter entre 3 e 40 caracteres.",
  }),
  phoneNumber: z.string().min(11).max(13, {
    message: "O telefone celular deve conter entre 11 e 13 caracteres.",
  })
})

export async function createDeliveryAction(deliveryData) {
  const validatedFields = schemaCreateDelivery.safeParse({
    name: deliveryData.name,
    phoneNumber: deliveryData.phoneNumber,
  })

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      ApiErrors: null,
      message: "Missing Fields. Failed to Register.",
    }
  }

  const responseData = await createDelivery({ ...validatedFields.data })

  if (!responseData) {
    return {
      ApiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    }
  }

  if (responseData.error) {
    return {
      ApiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    }
  }

  return {
    ApiErrors: null,
    zodErrors: null,
    message: "Dish created successfully!",
  }
}

export async function updateDeliveryAction(delivery_id, deliveryData) {
  const validatedFields = schemaCreateDelivery.safeParse({
    name: deliveryData.name,
    phoneNumber: deliveryData.phoneNumber,
  })

  if (!validatedFields.success) {
    return {
      zodErrors: validatedFields.error.flatten().fieldErrors,
      ApiErrors: null,
      message: "Missing Fields. Failed to Register.",
    }
  }

  const responseData = await updateDelivery(delivery_id, { ...validatedFields.data })

  if (!responseData) {
    return {
      ApiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    }
  }

  if (responseData.error) {
    return {
      ApiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    }
  }

  return {
    ApiErrors: null,
    zodErrors: null,
    message: "Entregador criado com sucesso",
  }
}

export async function deleteDeliveryAction(delivery_id) {
  try {
    if (!delivery_id) return
    await deleteDelivery(delivery_id)
  } catch (error) {
    return {
      ApiErrors: error,
      zodErrors: null,
      message: "Failed to Delete.",
    }
  }
}

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 })
  cookies().set("user_id", "", { ...config, maxAge: 0 })
  redirect("/")
}