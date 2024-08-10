"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "./ui/badge"

const badges = (status) => {
  switch (status) {
    case "Pedido Enviado":
      return (
        <Badge variant="default" className="bg-red-500 text-white">
          {status}
        </Badge>
      )
    case "Pedido Confirmado":
      return (
        <Badge variant="default" className="bg-yellow-500 text-white">
          {status}
        </Badge>
      )
    case "Pedido Saiu para Entrega":
      return (
        <Badge variant="default" className="bg-blue-500 text-white">
          {status}
        </Badge>
      )
    case "Pedido Entregue":
      return (
        <Badge variant="default" className="bg-green-500 text-white">
          {status}
        </Badge>
      )
  }
}

const OrderCard = ({ index, order }) => {
  return (
    <div key={index}>
      <Card className="p-4">
        <div className="flex justify-between items-center">
          {badges(order.status)}
          <p className="text-sm">Nº {`#${order._id.slice(0, 6)}`}</p>
        </div>
        {order.dishes && order.dishes.map((dish, index) => {
          return (
            <div key={index} className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{dish.quantity}x</Badge>
                <p className="text-sm">{dish.title}</p>
                <p className="text-sm">{dish.payment_type}</p>
              </div>
            </div>
          )
        })}
      </Card>
    </div>
  )
}

export default OrderCard