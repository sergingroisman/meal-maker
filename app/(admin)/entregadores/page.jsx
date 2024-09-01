"use client"

import AdminDeliveryForm from '@/components/AdminDeliveryForm'
import { fetchDeliveries } from '@/services/api'
import React, { useEffect, useState } from 'react'

const EntregadoresPage = () => {
  const [deliveries, setDeliveries] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const loadDeliveries = async () => {
    const data = await fetchDeliveries()
    setDeliveries(data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadDeliveries()
  }, [])

  return (
    <div className="ml-64">
      <main className="flex-1 flex flex-col">
        <AdminDeliveryForm
          deliveries={deliveries}
          onSubmitSuccess={loadDeliveries}
        />
      </main>
    </div>
  )
}

export default EntregadoresPage
