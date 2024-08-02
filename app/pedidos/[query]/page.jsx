"use server"

import OrderDetail from "@/components/OrderDetail"
import { fetchAccompaniments, fetchDishById } from "@/services/api"
import { notFound } from "next/navigation"

const Detail = async ({ params, searchParams }) => {
  const dish_id = params.query
  if (!dish_id) notFound()
  const dish = await fetchDishById(dish_id)
  const accompaniments = await fetchAccompaniments()
  
  return (
    <OrderDetail dish={dish} accompaniments={accompaniments} />
  )
}

export default Detail