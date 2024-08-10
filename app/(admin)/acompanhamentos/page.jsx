"use server"

import AdminAccompanimentForm from '@/components/AdminAccompanimentForm'
import { fetchAccompaniments } from '@/services/api'
import React from 'react'

const AcompanhamentosPage = async () => {
  const accompaniments = await fetchAccompaniments()

  return (
    <div className="ml-64">
      <main className="flex-1 flex flex-col">
        <AdminAccompanimentForm accompaniments={accompaniments} />
      </main>
    </div>
  )
}

export default AcompanhamentosPage
