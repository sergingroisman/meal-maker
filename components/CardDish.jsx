"use client"

import Image from "next/image";
import { Card } from "./ui/card"
import { formatPrice } from "@/lib/utils"
import React, { forwardRef } from "react";
import { FaUser } from "react-icons/fa"
import { FaUserFriends } from "react-icons/fa"

const CardDish = forwardRef(({ dish }, ref) => {
  // dish.day_of_week
  return (
    <Card ref={ref} className="h-[165px] p-4 flex justify-between items-center border hover:border-1 hover:border-[#dbdad9] cursor-pointer">
      <div className="space-y-2 max-w-[200px]">
        <h2 className="text-md sm:text-lg font-medium text-[#3f3e3e] mb-1">{dish.title}</h2>
        <p className="text-muted-foreground text-sm sm:text-md text-[#3f3e3e] mb-1">
          {dish.description}
        </p>
        <p className="text-muted-foreground flex items-center text-sm sm:text-md text-[#3f3e3e] mb-1">
          <span>
            {dish.serves > 1 ? (<FaUserFriends className="h-3 w-3" />) : (<FaUser className="h-3 w-3" />)}
          </span>
          <span className="ml-1">
            {`Serve ${dish.serves} pessoa${dish.serves > 1 ? "s" : ""}`}
          </span>
        </p>
        <p className="text-md sm:text-lg font-semibold text-[#3f3e3e]">{formatPrice(dish.price)}</p>
      </div>
      {/* <div className="space-y-2">
      </div> */}
      <Image
        src={dish.img_url}
        alt={dish.title}
        width={100}
        height={100}
        className="w-[100px] h-[100px] object-cover"
      />
    </Card>
  )
})

CardDish.displayName = "CardDish"

export default CardDish