"use client"

import { Sheet, SheetContent, SheetFooter, SheetTrigger } from '@/components/ui/sheet'
import Link from "next/link"
import { BsHandbag } from "react-icons/bs"
import { Button } from './ui/button'
import { Card, CardHeader, CardContent, CardFooter } from './ui/card'
import { formatPrice } from '@/lib/utils'
import useStore from '@/store/useStore'
import MobilePaymentSheet from './MobilePaymentSheet'
import useSession from './custom/useSession'
import MobileRemoveItemSheet from './MobileRemoveItemSheet'
import { createOrdersByUser } from '@/services/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DesktopBagSheet = () => {
  const data = useStore((state) => state.data)
  const resetState = useStore((state) => state.resetState)
  const [isOpen, setIsOpen] = useState(false)
  const { isLoggedIn } = useSession()
  const router = useRouter()

  const handleSendOrder = async () => {
    try {
      await createOrdersByUser(data)
      setIsOpen(false)
      resetState()
      router.push("/pedidos")
    } catch (error) {
      console.log(error)
    }
  }


  const isDisbledButton = () => {
    return data.payment_type === ""
  }

  const sheetFooterButtons = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Link href="/signin">
            <Button onClick={() => setIsOpen(false)} variant="outline" className="w-full mt-4">Fazer login com Celular</Button>
          </Link>
        </>
      )
    }

    return (
      <div className="pt-[16px]">
        <Button 
          onClick={() => handleSendOrder()} 
          className={`w-full text-white ${isDisbledButton() ? "bg-[#f37a83] bg-opacity-50 cursor-not-allowed" : "bg-accent"}`}
        >
          Fazer pedido
        </Button>
      </div>
    )
  }

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center" asChild>
        <Button
          variant="outline"
          size="md"
          className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <BsHandbag className="h-6 w-6" />
            <div className="flex flex-col items-start">
              <span className="text-md font-semibold">{formatPrice(data.total)}</span>
              <span className="text-sm text-muted-foreground">{`${data.quantityTotal} items`}</span>
            </div>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <Card className="w-full max-w-md p-4">
          <CardHeader className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Seu pedido em</p>
              <h2 className="text-lg font-bold">Vieiras Refeições</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">Items</h3>
              {data.items.map((el, index) => {
                return (
                  <div key={index} className="flex justify-between items-center">
                    <p>{`${el.quantity}x ${el.title}`}</p>
                    <span className="font-semibold">{formatPrice(el.price)}</span>
                    <MobileRemoveItemSheet id={el._id} title={`${el.quantity}x ${el.title}`} />
                  </div>
                )
              })}
            </div>
            <div className="space-y-1 pt-4 pb-2 border-b">
              <div className="flex justify-between text-[#a6a5a5] text-sm font-normal">
                <span className="text-muted-foreground font-normal">Subtotal</span>
                <span className="">{formatPrice(data.total)}</span>
              </div>
              <div className="flex justify-between text-[#a6a5a5] text-sm">
                <span className="text-muted-foreground">Taxa de entrega</span>
                <span className="">Grátis</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(data.total)}</span>
              </div>
            </div>

            <MobilePaymentSheet />
            {sheetFooterButtons()}
          </CardContent>
        </Card>
        <SheetFooter>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default DesktopBagSheet
