"use client"

import DesktopBagSheet from '@/components/DesktopBagSheet'
import MobileAddItemSheet from '@/components/MobileAddItemSheet'
import { fetchBff, getUserLoader } from '@/services/api'
import useStore from '@/store/useStore'
import React, { useEffect, useState } from 'react'

const CozinhaPage = () => {
  const [dishes, setDishes] = useState([])
  const [accompaniments, setAccompaniments] = useState([])
  const [user, setUser] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const setHasAddress = useStore((state) => state.setHasAddress)
  const addItem = useStore((state) => state.addItem)

  const loadBff = async () => {
    try {
      const { dishes, accompaniments } = await fetchBff()
      const { ok, data, error } = await getUserLoader()
      if (!data) {
        notFound()
      }

      setDishes(dishes)
      setAccompaniments(accompaniments)
      setUser(data)
      setIsLoading(false)
      setHasAddress(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
      setHasAddress(true)
    }
  }

  useEffect(() => {
    loadBff()
  }, [])

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (error) {
    return <div className="text-red-500">{error.message || "Ocorreu um erro."}</div>
  }

  return (
    <div className="ml-64">
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto p-4">
          <div className="flex items-center gap-8 mb-4">
            <h1 className="text-2xl font-bold">Cozinha</h1>
            <DesktopBagSheet isAdmin={true} />
          </div>
          <div className="grid gap-4 sm:grid-cols-12 pb-[74px]">
            {dishes.map((dish, index) => {
              return (
                <div key={index} className="sm:col-span-6">
                  <MobileAddItemSheet
                    index_parent={index}
                    item={dish}
                    accompaniments={accompaniments}
                    addItem={addItem}
                    user={user}
                    isAdmin={true}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CozinhaPage