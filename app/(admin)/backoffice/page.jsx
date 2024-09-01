"use client"

import { useEffect, useState } from "react"
import { fetchOrdersByPartner } from "@/services/api"
import { notFound } from "next/navigation"
import AdminOrderList from "@/components/AdminOrderList"

const BackofficePage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  useEffect(() => {
    fetchData()

    const interval = setInterval(() => {
      fetchData()
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('Entregue');
    }, 600000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="ml-64">
      <main className="flex-1 flex flex-col">
        <AdminOrderList orders={orders} fetchData={fetchData} />
      </main>
    </div>
  )
}

export default BackofficePage
