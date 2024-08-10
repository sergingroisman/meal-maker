"use client"

import AdminDishForm from '@/components/AdminDishForm'
import { fetchDishes } from '@/services/api'
import { useEffect, useState } from "react"
import { fetchOrdersByPartner } from "@/services/api"
import { notFound } from "next/navigation"
import AdminOrderList from "@/components/AdminOrderList"
import React from 'react'

const CardapiosPage = () => {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const data = await fetchDishes()
      if (!data) {
        notFound()
      }
      setDishes(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData() // Chama a função imediatamente ao montar o componente

    const interval = setInterval(() => {
      fetchData() // Chama a função a cada 1 minuto
    }, 60000) // 60000 ms = 1 minuto

    return () => clearInterval(interval) // Limpa o intervalo ao desmontar
  }, [])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="ml-64">
      <main className="flex-1 flex flex-col">
        <AdminDishForm dishes={dishes} />
      </main>
    </div>
  )
}

export default CardapiosPage