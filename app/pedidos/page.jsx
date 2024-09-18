"use server"

import Header from "@/components/Header"
import AlertRefresh from "@/components/AlertRefresh"
import OrderList from "@/components/OrderList"
import { fetchOrdersByUser } from "@/services/api"

const Pedidos = async () => {
  try {
    const orders = await fetchOrdersByUser()

    if (!orders.ok || !orders.data) {
      console.error("Erro ao carregar pedidos:", orders.error);
      return (
        <div>
          <h1>Erro ao carregar pedidos</h1>
        </div>
      )
    }

    return (
      <div>
        <Header />
        <AlertRefresh />
        <section className="flex items-center justify-center py-2 xl:py-0">
          <div className="container mx-auto px-4 py-4">
            <OrderList orders={orders.data} />
          </div>
        </section>
      </div>
    )
  } catch (error) {
    return (
      <div>
        <h1>Erro ao carregar pedidos</h1>
      </div>
    )
  }
}

export default Pedidos