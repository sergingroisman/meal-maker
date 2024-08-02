"use server"

import axios from "axios"
import { cookies } from "next/headers"

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 5000,
  header: {
    "ContentType": "application/json",
  },
})

export const fetchBff = async (partner_id = 1, options = {}) => {
  try {
    const response = await api.get(`/get-bff/${partner_id}`, options)
    return response.data
  } catch (error) {
    console.error("Error retrieving data:", error)
    throw error
  }
}

export const fetchOrdersByUser = async (options = {}) => {
  try {
    const user_id = await getAuthUserId()
    const response = await api.get(`get-orders-by-user/${user_id}`, options)
    return response.data
  } catch (error) {
    console.error("Error retrieving data:", error)
    throw error
  }
}

export const createOrdersByUser = async (body) => {
  try {
    const auth_token = await getAuthToken()
    const user_id = await getAuthUserId()
    const response = await api.post(`create-order/${user_id}`, {
      quantity_total: body.quantity_total,
      total: body.total,
      dishes: body.items,
      payment_type: body.payment_type
    },
    {
      headers: {
        Authorization: `${auth_token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error("Error retrieving data:", error)
    throw error
  }
}

export const updateUserAddress = async (body) => {
  try {
    const auth_token = await getAuthToken()
    const user_id = await getAuthUserId()
    const response = await api.patch(`update-user-address/${user_id}`, {
      street: body.street,
      number: body.number,
      city: body.city,
      cep: body.cep,
      state: body.state,
      complement: body.complement
    },
    {
      headers: {
        Authorization: `${auth_token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error("Error retrieving data:", error)
    throw error
  }
}

export const fetchDishes = async (options = {}) => {
  try {
    const response = await api.get(`/get-dishes`, options)
    return response.data
  } catch (error) {
    console.error("Error retrieving data:", error)
    throw error
  }
}

export const fetchDishById = async (dish_id, options = {}) => {
  try {
    const response = await api.get(`/get-dish/${dish_id}`, options)
    return response.data
  } catch (error) {
    console.error("Error retrieving data:", error)
    throw error
  }
}

export const fetchAccompaniments = async (options = {}) => {
  try {
    const response = await api.get(`/get-accompaniments`, options)
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
    return {
      error: {
        status: error?.response?.data.status,
        message: error?.response?.data.message,
      },
    }
  }
}

export const signIn = async (userData) => {
  try {
    const response = await api.post(`/sign-in`, { ...userData })
    return response.data
  } catch (error) {
    return {
      error: {
        status: error?.response?.data.status,
        message: error?.response?.data.message,
      },
    }
  }
}

export async function getAuthToken() {
  const auth_token = cookies().get("jwt")?.value
  return auth_token
}

export async function getAuthUserId() {
  const user_id = cookies().get("user_id")?.value
  return user_id
}

export async function getUserLoader() {
  try {
    const auth_token = await getAuthToken()
    const user_id = await getAuthUserId()
    if (!auth_token) return { ok: false, data: null, error: null }

    const response = await api.get(`/get-user/${user_id}`, {
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