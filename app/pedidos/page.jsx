"use server"

import Header from "@/components/Header"
import AlertRefresh from "@/components/AlertRefresh"
import OrderList from "@/components/OrderList"
import { fetchOrdersByUser } from "@/services/api"

const Pedidos = async () => {
  const orders = await fetchOrdersByUser()
  return (
    <div>
      <Header />
      <AlertRefresh />
      <section className="flex items-center justify-center py-2 xl:py-0">
        <div className="container mx-auto px-4 py-4">
          <OrderList orders={orders} />
        </div>
      </section >
    </div>
  )
}

export default Pedidos


