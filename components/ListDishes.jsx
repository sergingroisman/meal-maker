"use client"

import React from "react"
import { notFound } from "next/navigation"
import MobileAddItemSheet from "./MobileAddItemSheet"
import useSession from "./custom/useSession"

const ListDishes = ({ dishes = [], accompaniments = [] }) => {
  const { isLoggedIn, currentUserId } = useSession()
  if (dishes.length == 0) {
    notFound()
  }

  return (
    <div className="grid gap-4 sm:grid-cols-12 pb-[74px]">
      {dishes.map((dish, index) => {
        return (
          <div key={index} className="sm:col-span-6">
            <MobileAddItemSheet 
              index_parent={index}
              item={dish}
              accompaniments={accompaniments}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ListDishes