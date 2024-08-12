"use client"

import AdminAccompanimentForm from '@/components/AdminAccompanimentForm'
import { fetchAccompaniments } from '@/services/api'
import React, { useEffect, useState } from 'react'

const AcompanhamentosPage = () => {
  const [accompaniments, setAccompaniments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const loadAccompaniments = async () => {
    const data = await fetchAccompaniments()
    setAccompaniments(data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadAccompaniments()
  }, [])

  return (
    <div className="ml-64">
      <main className="flex-1 flex flex-col">
        <AdminAccompanimentForm
          accompaniments={accompaniments}
          onSubmitSuccess={loadAccompaniments}
        />
      </main>
    </div>
  )
}

export default AcompanhamentosPage
