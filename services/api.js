"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const BASE_URL = "http://localhost:8080/api"

export const fetchBff = async (partner_id = 1, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/get-bff/${partner_id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const fetchOrdersByUser = async (options = {}) => {
  try {
    const user_id = await getAuthUserId()
    const response = await fetch(`${BASE_URL}/get-orders-by-user/${user_id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      cache: 'no-store',
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error.message)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const createOrdersByUser = async (body) => {
  try {
    const auth_token = await getAuthToken()
    const user_id = await getAuthUserId()

    const response = await fetch(`${BASE_URL}/create-order/${user_id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token,
      },
      body: JSON.stringify({
        quantity_total: body.quantity_total,
        total: body.total,
        dishes: body.items,
        payment_type: body.payment_type,
        delivery_type: body.delivery_type,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const createDish = async (body) => {
  try {
    const auth_token = await getAuthToken()

    const response = await fetch(`${BASE_URL}/create-dish`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token,
      },
      body: JSON.stringify({
        title: body.title,
        price: body.price,
        description: body.description,
        serves: body.serves,
        img_url: body.img_url,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const updateImgDish = async (file) => {
  try {
    const auth_token = await getAuthToken()

    const response = await fetch(`${BASE_URL}/upload-image`, {
      method: 'POST',
      headers: {
        "Authorization": auth_token,
      },
      body: file,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const updateDish = async (dish_id, body) => {
  try {
    const auth_token = await getAuthToken()

    const response = await fetch(`${BASE_URL}/update-dish/${dish_id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token,
      },
      body: JSON.stringify({
        title: body.title,
        price: body.price,
        description: body.description,
        serves: body.serves,
        img_url: body.img_url,
        active: body.active,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const deleteDish = async (dish_id) => {
  try {
    const auth_token = await getAuthToken()

    const response = await fetch(`${BASE_URL}/delete-dish/${dish_id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const updateUserAddress = async (body) => {
  try {
    const auth_token = await getAuthToken()
    const user_id = await getAuthUserId()

    const response = await fetch(`${BASE_URL}/update-user-address/${user_id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token,
      },
      body: JSON.stringify({
        street: body.street,
        number: body.number,
        city: body.city,
        cep: body.cep,
        state: body.state,
        complement: body.complement,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const fetchOrdersByPartner = async (options = {}) => {
  try {
    const partner_id = 1
    const response = await fetch(`${BASE_URL}/get-orders-by-partner/${partner_id}${options.feed ? "/?feed=true" : ""}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const updateOrderStatus = async (order_id, status_id, delivery_id = null) => {
  try {
    const response = await fetch(`${BASE_URL}/update-order/${order_id}${delivery_id ? `/?delivery_id=${delivery_id}` : ""}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status_id,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const fetchDishes = async (options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/get-dishes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      cache: 'no-store',
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const fetchAccompaniments = async (options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/get-accompaniments`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      cache: 'no-store',
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const createAccompaniments = async (body) => {
  try {
    const auth_token = await getAuthToken()

    const response = await fetch(`${BASE_URL}/create-accompaniments`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token,
      },
      body: JSON.stringify({
        accompaniments: [
          {
            title: body.title,
            small_description: body.smallDescription,
          }
        ]
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const updateAccompaniments = async (acc_id, body) => {
  try {
    const auth_token = await getAuthToken()

    const response = await fetch(`${BASE_URL}/update-accompaniments`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token,
      },
      body: JSON.stringify({
        accompaniments: [
          {
            "_id": acc_id,
            title: body.title,
            small_description: body.smallDescription,
          }
        ]
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const deleteAccompaniment = async (acc_id) => {
  try {
    const auth_token = await getAuthToken()

    const response = await fetch(`${BASE_URL}/delete-accompaniment/${acc_id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const fetchDeliveries = async (options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/get-deliveries`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      cache: 'no-store',
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const createDelivery = async (body) => {
  try {
    const auth_token = await getAuthToken()

    const response = await fetch(`${BASE_URL}/create-delivery`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token,
      },
      body: JSON.stringify({
        name: body.name,
        phone_number: body.phoneNumber,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return { data }
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const updateDelivery = async (delivery_id, body) => {
  try {
    const auth_token = await getAuthToken()

    const response = await fetch(`${BASE_URL}/update-delivery/${delivery_id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token,
      },
      body: JSON.stringify({
        name: body.name,
        phone_number: body.phoneNumber,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const deleteDelivery = async (delivery_id) => {
  try {
    const auth_token = await getAuthToken()

    const response = await fetch(`${BASE_URL}/delete-delivery/${delivery_id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth_token,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const signUp = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
      },
    }
  }
}

export const signIn = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Permite o envio de cookies
      body: JSON.stringify(userData), // Convertendo userData para JSON
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error retrieving data:", error)
    const errorData = JSON.parse(error.message)
    return {
      error: {
        status: errorData?.status,
        message: errorData?.message,
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

    const response = await fetch(`${BASE_URL}/get-user/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth_token,
      },
      credentials: 'include',
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { ok: false, data: null, error: errorData }
    }

    const data = await response.json()
    if (data.error) return { ok: false, data: null, error: data.error }
    return { ok: true, data: data, error: null }
  } catch (error) {
    console.error("Usuário não está logado:", error)
    return { ok: false, data: null, error: error }
  }
}