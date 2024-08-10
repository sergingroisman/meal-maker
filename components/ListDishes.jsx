"use client"

import React, { useEffect } from "react"
import { notFound } from "next/navigation"
import MobileAddItemSheet from "./MobileAddItemSheet"
import useStore from "@/store/useStore"
import useDimensions from "./custom/useDimensions"

const ListDishes = ({ dishes = [], accompaniments = [], user }) => {
  const setHasAddress = useStore((state) => state.setHasAddress)
  const addItem = useStore((state) => state.addItem)
  const { isMobile } = useDimensions()

  if (dishes.length == 0) {
    notFound()
  }

  useEffect(() => {
    if(user) {
      const hasAddress = user.data?.address?.street !== "" || user.data?.address?.number !== "" ? true : false
      setHasAddress(hasAddress)
    }
  }, [])

  return (
    <div className="grid gap-4 sm:grid-cols-12 pb-[74px]">
      {dishes.map((dish, index) => {
        return (
          <div key={index} className="sm:col-span-6">
            <MobileAddItemSheet 
              index_parent={index}
              item={dish}
              accompaniments={accompaniments}
              addItem={addItem}
              isMobile={isMobile}
              user={user}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ListDishes