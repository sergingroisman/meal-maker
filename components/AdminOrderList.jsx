"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { LuRefreshCw } from "react-icons/lu"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { PiPrinterFill } from "react-icons/pi"
import { FaSquarePhoneFlip } from "react-icons/fa6"
import IF from "./custom/if"
import { Separator } from "./ui/separator"
import { formatPrice } from "@/lib/utils"
import { FaCaretDown, FaInbox } from "react-icons/fa"
import { useRouter } from 'next/navigation'
import { updateOrderStatus } from "@/services/api"
import backofficeStore from "@/store/backofficeStore"
import Countdown from "./Countdown"
import { MdOutlineDeliveryDining } from "react-icons/md"
import { BiDish } from "react-icons/bi"

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

const getStatusString = (status_id) => {
  switch (status_id) {
    case 1:
      return "Pedido Confirmado"
    case 2:
      return "Pedido Saiu para Entrega"
    case 3:
      return "Pedido Entregue"
  }
}

export async function generateMetadata({ params }) {

  return {
    title: `Pedidos`,
    description: `Dashboard dos pedidos`,
  }
}

const AdminOrderList = ({ orders, fetchData, deliveries }) => {
  const data = backofficeStore((state) => state.data)
  const addOrders = backofficeStore((state) => state.addOrders)
  const updateOrders = backofficeStore((state) => state.updateOrders)
  const [currentOrder, setCurrentOrder] = useState(orders[0])
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    addOrders(orders)
    setCurrentOrder(orders[0])
  }, [addOrders, orders])

  const printDiv = (idText) => {
    const printEle = document.getElementById(idText)

    if (!printEle) {
      console.error('Element not found')
      return
    }
    
    const iframe = document.createElement('iframe')
    iframe.style.display = "none"
    document.body.appendChild(iframe)

    const iframeDoc = iframe.contentWindow?.document

    if (iframeDoc) {
      iframeDoc.open()
      iframeDoc.write(`
        <html>
          <head>
            <title>Impressão Comanda</title>
            <style>
              @media print {
                @page {
                  size: 58mm auto; /* Largura fixa de 58mm, altura ajustável ao conteúdo */
                  margin: 0; /* Remover margens para que ocupe toda a área */
                }
                body {
                  top: 0;
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: left;
                  height: 100vh;
                }
                .print-area {
                  width: 58mm;
                  font-size: 8px;
                  font-family: Arial, sans-serif;
                  align-items: left;
                }
                table {
                  width: 100%;
                  font-size: 10px;
                }
                table, th, td {
                  border-collapse: collapse;
                  border: 1px solid black;
                }
                th, td {
                  padding: 4px;
                  text-align: center;
                }
              }
            </style
          </head>
          <body>
            <div class="print-area">
              ${printEle.innerHTML || ""}
            </div>
          </body>
        </html>
      `)
      iframeDoc.close()

      iframe.contentWindow?.focus()
      iframe.contentWindow?.print()
    } else {
      console.error('Cannot access iframe document')
    }
  }

  const handlerClickCard = async (order) => {
    setCurrentOrder(order)
    setIsVisible(false)
    setTimeout(() => {
      setIsVisible(true)
    }, 500)
  }

  const handlerUpdateOrderStatus = async (status_id, delivery_id) => {
    try {
      const statusStr = getStatusString(status_id)
      if (status_id === 2 & delivery_id) {
        await updateOrderStatus(currentOrder._id, status_id, delivery_id)
      } else {
        await updateOrderStatus(currentOrder._id, status_id)
      }
      updateOrders(currentOrder._id, { ...currentOrder, status: statusStr })
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  const btnChangeStatus = (status, order) => {
    switch (status) {
      case "Pedido Enviado":
        return (
          <Button className="border border-yellow-500 bg-transparent text-yellow-500 hover:bg-yellow-500 hover:text-white">
            <LuRefreshCw className="h-5 w-5" />
            <span className="pl-2" onClick={() => handlerUpdateOrderStatus(1)}>
              Alterar para &quot;Pedido Confirmado&quot;
            </span>
          </Button>
        )
      case "Pedido Confirmado":
        return (
          order.delivery_type === "entrega" || order.delivery_type === "" ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white">
                    Alterar para &quot;Pedido Saiu para Entrega&quot;
                    <FaCaretDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Escolha o Entregador</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {deliveries.map((delivery) => (
                      <DropdownMenuItem key={delivery._id} onClick={() => handlerUpdateOrderStatus(2, delivery._id)}>
                        <span
                          className=""
                        >
                          {delivery.name}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div>
              <Button className="border border-blue-500 bg-transparent text-blue-500 hover:bg-blue-500 hover:text-white">
                <LuRefreshCw className="h-5 w-5" />
                <span className="pl-2" onClick={() => handlerUpdateOrderStatus(2)}>
                    Alterar para &quot;Pedido Confirmado&quot;
                </span>
              </Button>
            </div>
          )
        )
      case "Pedido Saiu para Entrega":
        return (
          <Button className="border border-green-500 bg-transparent text-green-500 hover:bg-green-500 hover:text-white">
            <LuRefreshCw className="h-5 w-5" />
            <span className="pl-2" onClick={() => handlerUpdateOrderStatus(3)}>
              Alterar para &quot;Pedido Entregue&quot;
            </span>
          </Button>
        )
    }
  }

  const ComandaTemplate = ({ currentOrder }) => {
    if (!currentOrder) return null;
    return (
      <div className="p-5 max-w-[58mm] mx-auto text-xs leading-relaxed">
        {/* <hr className="my-4 border-gray-300" /> */}

        {/* Endereço do cliente */}
        <h2 className="text-sm font-semibold">Endereço do Cliente</h2>
        <p><strong>Rua:</strong> {currentOrder.user.address.street}</p>
        <p><strong>Número:</strong> {currentOrder.user.address.number}</p>
        <p><strong>Cidade:</strong> {currentOrder.user.address.city}</p>
        <p><strong>CEP:</strong> {currentOrder.user.address.cep}</p>
        <p><strong>Bairro:</strong> {currentOrder.user.address.state}</p>
        <p><strong>Complemento:</strong> {currentOrder.user.address.complement}</p>
        <hr className="my-4 border-gray-300" />

        <h2 className="text-sm font-semibold">Informações do Pedido</h2>
        <p><strong>Tipo do pagamento:</strong> {currentOrder.payment_type}</p>
        {currentOrder.dishes && currentOrder.dishes.map((dish, index) => (
          <div key={index} className="mt-4">
            <p className="font-semibold">{dish.quantity}x {dish.title} - {dish.payment_type} {formatPrice(dish.price)}</p>

            {/* Acompanhamentos */}
            {dish.accompaniments && dish.accompaniments.length > 0 && (
              <div className="mt-2">
                <p className="text-xs">Acompanhamentos:</p>
                <ul className="list-none pl-4">
                  {dish.accompaniments.map((accompaniment, index) => (
                    <li key={index} className="relative before:content-['•'] before:text-orange-500 before:absolute before:left-[-1rem] text-xs">
                      {accompaniment.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Observações */}
            {dish.observation && (
              <div className="mt-2">
                <p className="text-xs"><strong>Observação:</strong> {dish.observation}</p>
              </div>
            )}
          </div>
        ))}
        
        <hr className="my-4 border-gray-300" />

        <IF condition={currentOrder.delivery._id !== 0}>
          <div className="p-4 bg-gray-100 rounded-md gap-1">
            <div className="bg-muted rounded-md">
              <h2 className="text-sm font-semibold">Informações do entregador</h2>
              <p className="text-sm text-muted-foreground"><strong>Nome: </strong>{currentOrder.delivery.name}</p>
              <p className="text-sm text-muted-foreground"><strong>Número: </strong>{currentOrder.delivery.phone_number}</p>
            </div>
          </div>
        </IF>

        <hr className="my-4 border-gray-300" />
        
        <h2 className="text-sm font-semibold">Resumo do Pedido</h2>
        <table className="table-auto w-full text-left text-xs">
          <tbody>
            <tr>
              <td className="border px-2 py-1">Valor do Pedido:</td>
              <td className="border px-2 py-1 text-right">{formatPrice(currentOrder.total)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Taxa de Entrega:</td>
              <td className="border px-2 py-1 text-right">R$ 0,00</td>
            </tr>
            <tr className="font-semibold">
              <td className="border px-2 py-1">Valor Total:</td>
              <td className="border px-2 py-1 text-right">{formatPrice(currentOrder.total)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };



  return (
    <div className="flex-1 flex pt-4 gap-4 w-full">
      <section className="w-96 bg-white p-4 shadow-xl overflow-y-auto fixed h-full">
        <div className="space-y-4">
          <div className="flex items-center justify-center border-b ">
            <div className="flex items-center gap-3 pb-2">
              {true > 0 && (
                <div className="relative flex items-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </div>
              )}
              <h1 className="text-primary font-semibold text-lg">Pedidos agora</h1>
            </div>
          </div>
          {data.orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FaInbox className="w-16 h-16 text-muted-foreground" />
              <p className="mt-4 text-lg text-muted-foreground">Nenhum pedido no momento</p>
            </div>
          ) : (
            data.orders.map((order, i) => {
              return (
                <div key={i} onClick={() => handlerClickCard(order)}>
                  <Card className={`p-4 hover:bg-gray-200 cursor-pointer ${order._id === currentOrder._id && "bg-gray-200"}`}>
                    <div className="flex justify-between items-center">
                      <span>
                        {order.user.name} - {" "}
                        <span className="text-sm">{formatPhoneNumber(order.user.phone_number)}</span>
                        <div className="flex items-center pb-2">
                          {order.delivery_type === "entrega" || order.delivery_type === "" ? (
                            <MdOutlineDeliveryDining className="h-6 w-6" />
                          ) : (
                            <BiDish className="h-6 w-6" />
                          )}
                          <span>{order.delivery_type === "entrega" || order.delivery_type === "" ? "Entrega" : "De Mesa"}</span>
                        </div>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      {badges(order.status)}
                    </div>
                    {order.dishes && order.dishes.map((dish, index) => {
                      return (
                        <div key={index} className="mt-4 space-y-2 line-clamp-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{dish.quantity}x</Badge>
                            <p className="text-sm">{dish.title}</p>
                            <p className="text-sm">{dish.payment_type}</p>
                          </div>
                        </div>
                      )
                    })}
                    <div className="pt-2">
                      <Badge
                        variant="outline"
                        className={`border-muted bg-background px-3 py-1 text-sm font-medium text-muted-foreground ${order._id === currentOrder._id && " border-white"}`}>
                        <div className="flex items-center gap-2">
                          {order.payment_type}
                        </div>
                      </Badge>
                    </div>
                  </Card>
                </div>
              )
            })
          )}
        </div>
      </section>

      <div className="">
        <motion.div
          initial={{ opacity: 0 }} // Inicia invisível
          animate={{ opacity: isVisible ? 1 : 0 }} // Anima para visível ou invisível
          exit={{ opacity: 0 }} // Sai para invisível
          transition={{ duration: 0.3 }} // Duração da animação
          style={{ display: isVisible ? 'block' : 'none' }}
        >
          {currentOrder && (
            <section className="flex-1 overflow-y-auto w-full ml-[410px]">
              <Card className="w-full">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex space-x-2 mt-2 text-primary">
                        <h2 className="text-xl font-semibold">{currentOrder.user.name} - </h2>
                        <Button variant="destructive" size="sm">
                          <FaSquarePhoneFlip />
                          {formatPhoneNumber(currentOrder.user.phone_number)}
                        </Button>
                      </div>
                      <div className="flex items-center">
                        {currentOrder.delivery_type === "entrega" || currentOrder.delivery_type === "" ? (
                          <MdOutlineDeliveryDining className="h-6 w-6" />
                        ) : (
                          <BiDish className="h-6 w-6" />
                        )}
                        <span>{currentOrder.delivery_type === "entrega" || currentOrder.delivery_type === "" ? "Entrega" : "De Mesa"}</span>
                      </div>
                      <p className="text-muted-foreground">
                        {formatDate(currentOrder.created_at)}
                      </p>
                      <div className="flex space-x-2 mt-2">
                        {badges(currentOrder.status)}
                        <Badge variant="outline">Entrega prevista: {calculateDeliveryDate(currentOrder.created_at, 40)}</Badge>
                      </div>
                    </div>
                    <div>
                      {btnChangeStatus(currentOrder.status, currentOrder)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-100 rounded-md gap-1">
                    <div className="bg-muted rounded-md">
                      <h2 className="font-medium text-primary">Endereço:</h2>
                      <p className="text-sm text-muted-foreground"><strong>Rua: </strong>{currentOrder.user.address.street}</p>
                      <p className="text-sm text-muted-foreground"><strong>Número: </strong>{currentOrder.user.address.number}</p>
                      <p className="text-sm text-muted-foreground"><strong>Cidade: </strong>{currentOrder.user.address.city}</p>
                      <p className="text-sm text-muted-foreground"><strong>CEP: </strong>{currentOrder.user.address.cep}</p>
                      <p className="text-sm text-muted-foreground"><strong>Bairro: </strong>{currentOrder.user.address.state}</p>
                      <p className="text-sm text-muted-foreground"><strong>Complemento: </strong>{currentOrder.user.address.complement}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-md">
                    <p className="font-bold text-gray-700">Informações do pedido</p>
                    {currentOrder.dishes && currentOrder.dishes.map((dish, index) => {
                      return (
                        <div key={index} className="mt-4 space-y-2">
                          <Separator className="flex-1" />
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-white" variant="primary">{dish.quantity}x</Badge>
                            <p className="text-md text-gray-700">{dish.title}</p>
                            <p className="text-md text-gray-700">{dish.payment_type}</p>
                          </div>

                          <div>
                            <p className="text-sm font-medium text-gray-700 pb-1">Acompanhamentos:</p>
                            <ul className="list-none pl-[30px] space-y-2">
                              {dish.accompaniments && dish.accompaniments.map((accompaniment, index) => (
                                <li key={index} className="flex items-center space-x-2 text-sm text-gray-700 relative before:content-['•'] before:text-orange-500 before:absolute before:left-[-1.5rem] before:text-xl">
                                  {accompaniment.title}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <IF condition={dish.observation}>
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-700">Observação:</p>
                              <p className="text-sm text-gray-700">{dish.observation}</p>
                            </div>
                          </IF>

                        </div>
                      )
                    })}
                  </div>
                  <IF condition={currentOrder.delivery._id !== 0}>
                    <div className="p-4 bg-gray-100 rounded-md gap-1">
                      <div className="bg-muted rounded-md">
                        <p className="font-bold text-gray-700">Informações do entregador</p>
                        <p className="text-sm text-muted-foreground"><strong>Nome: </strong>{currentOrder.delivery.name}</p>
                        <p className="text-sm text-muted-foreground"><strong>Número: </strong>{currentOrder.delivery.phone_number}</p>
                      </div>
                    </div>
                  </IF>
                  <div className="space-y-2">
                    <div className="flex justify-between border-t border-gray-200">
                      <p>Valor do pedido</p>
                      <p>{formatPrice(currentOrder.total)}</p>
                    </div>
                    <div className="flex justify-between border-t border-gray-200">
                      <p>Taxa de entrega</p>
                      <p>R$ 0,00</p>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-gray-200">
                      <p>Valor total do pedido</p>
                      <p>{formatPrice(currentOrder.total)}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-start">
                  <div className="flex items-center mt-2">
                    <Button onClick={() => printDiv('print')} variant="outline" className="ml-auto gap-2">
                      <PiPrinterFill className="h-6 w-6" />
                      Imprimir
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </section>
          )}
        </motion.div>
      </div>

      <div id="print" className="hidden">
        <ComandaTemplate currentOrder={currentOrder} />
      </div>
    </div>
  )
}

export default AdminOrderList

function formatDate(inputDate) {
  // Cria um objeto Date a partir da string de data
  const date = new Date(inputDate)

  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    throw new Error("Data inválida")
  }

  // Extrai horas e minutos
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // Formata a string de saída
  return `Pedido realizado às ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function calculateDeliveryDate(inputDate, deliveryTimeInMinutes) {
  // Extrai a parte relevante da string de data
  const datePart = inputDate.split(" ")[0] + "T" + inputDate.split(" ")[1] // "2024-08-02T13:58:00.346461603"

  // Cria um objeto Date
  const date = new Date(datePart)

  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    throw new Error("Data inválida")
  }

  // Adiciona os minutos de entrega
  date.setMinutes(date.getMinutes() + deliveryTimeInMinutes)

  // Formata a nova data para o formato desejado
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }
  const formattedDeliveryDate = date.toLocaleString('pt-BR', options)

  return formattedDeliveryDate
}

function formatPhoneNumber(input) {
  // Remove todos os caracteres que não são dígitos
  const cleaned = input.replace(/\D/g, '')

  // Remove o prefixo "55" se estiver presente
  const withoutPrefix = cleaned.startsWith('55') ? cleaned.slice(2) : cleaned

  // Verifica se a string tem o tamanho correto
  if (withoutPrefix.length < 10) {
    throw new Error('Número de telefone inválido')
  }

  // Extrai partes do número
  const ddd = withoutPrefix.slice(0, 2) // DDD
  const firstDigit = withoutPrefix.charAt(2) // Primeiro dígito do número
  const mainNumber = withoutPrefix.slice(3) // Resto do número

  // Formata a string de saída
  const formatted = `(${ddd})${firstDigit} ${mainNumber}`
  return formatted
}