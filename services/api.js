import axios from "axios"
import { cookies } from "next/headers"

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
  header: {
    "ContentType": "application/json",
  },
})

export const fetchRestaurant = async (partner_id = 1, options = {}) => {
  try {
    const response = await api.get(`/get-restaurant/${partner_id}`, options)
    return response.data
  } catch (error) {
    console.error("Error retrieving data:", error)
    throw error
  }
}

export const signUp = async (userData) => {
  try {
    const response = await api.post(`/sign-up`, { ...userData })
    return response.data
  } catch (error) {
    console.error("Não foi possível realizar o login:", error)
    throw error
  }
}

export async function getAuthToken() {
  const auth_token = cookies().get("jwt")?.value
  return auth_token
}

export async function getAuthPhoneNumber() {
  const user_phone_number = cookies().get("user_phone_number")?.value
  return user_phone_number
}

export async function getUserLoader() {
  try {
    const auth_token = await getAuthToken()
    const user_phone_number = await getAuthPhoneNumber()
    if (!auth_token) return { ok: false, data: null, error: null }

    const response = await api.get(`/get-user/${user_phone_number}`, {
      headers: {
        Authorization: `${auth_token}`,
      },
      cache: "no-cache",
    })
    if (response.data.error) return { ok: false, data: null, error: response.data.error }
    return { ok: true, data: response.data, error: null }
  } catch (error) {
    console.error("Usuário não está logado:", error)
    return { ok: false, data: null, error: error }
  }
}