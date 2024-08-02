"use client"

import OrderCard from "./OrderCard"

const OrderList = ({ orders }) => {

  if (!orders || orders.length === 0) {
    return (
      <div className="p-6 font-primary">
        <h1 className="text-2xl font-semibold mb-4">Meus pedidos</h1>
        <h2 className="text-xl font-medium mb-4">Sem histórico</h2>
      </div>
    )
  }

  return (
    <div>
      <div className="p-6 font-primary">
        <h1 className="text-2xl font-semibold mb-4">Meus pedidos</h1>
        <h2 className="text-xl font-medium mb-4">Histórico</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order, index) => {
            return (
              <OrderCard index={index} order={order} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default OrderList