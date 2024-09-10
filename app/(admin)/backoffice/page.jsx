"use client"

import { useEffect, useState } from "react"
import { fetchDeliveries, fetchOrdersByPartner, updateOrderStatus } from "@/services/api"
import { notFound } from "next/navigation"
import AdminOrderList from "@/components/AdminOrderList"
import backofficeStore from "@/store/backofficeStore"

const BackofficePage = () => {
  const [orders, setOrders] = useState([])
  const [deliveries, setDeliveries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const updateOrders = backofficeStore((state) => state.updateOrders)

  const fetchData = async () => {
    try {
      const data = await fetchOrdersByPartner({ feed: true })
      if (!data) {
        notFound()
      }

      setOrders(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadDeliveries = async () => {
    try {
      const data = await fetchDeliveries()
      setDeliveries(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateDeliveryData = async () => {
    try {
      const data = await fetchOrdersByPartner({ feed: true })
      if (!data) {
        notFound()
      }

      const now = new Date();
      const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000)

      const ordersToUpdate = data
      .filter(order => {
        return order.status === "Pedido Saiu para Entrega"
      })
      .filter(order => {
        const updatedAt = new Date(order.updated_at)
        return updatedAt < tenMinutesAgo
      })

      if (ordersToUpdate.length > 0) {
        console.log(ordersToUpdate[0]._id)
        await updateOrderStatus(ordersToUpdate[0]._id, 3)
        updateOrders(currentOrder._id, { ...ordersToUpdate[0], status: "Pedido Entregue" })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    loadDeliveries()

    const interval = setInterval(() => {
      fetchData()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    updateDeliveryData()
    const interval = setInterval(() => {
      updateDeliveryData()
    }, 10 * 60 * 1000)

    return () => clearInterval(interval)
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
        <AdminOrderList orders={orders} fetchData={fetchData} deliveries={deliveries} />
      </main>
    </div>
  )
}

export default BackofficePage
