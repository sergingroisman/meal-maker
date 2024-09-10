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
import { useState } from 'react'
import { Badge } from './ui/badge'
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { MdOutlineDeliveryDining } from "react-icons/md"
import { BiDish } from "react-icons/bi"
import IF from "./custom/if"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"

function Loader({ text }) {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>{text}</p>
    </div>
  )
}

const DesktopBagSheet = ({ isAdmin = false }) => {
  const [pending, setPending] = useState(false)
  const data = useStore((state) => state.data)
  const resetState = useStore((state) => state.resetState)
  const [isOpen, setIsOpen] = useState(false)
  const { isLoggedIn } = useSession()
  const router = useRouter()
  const [radioValue, setRadioValue] = useState(isAdmin ? "mesa" : "entrega")
  const [isOpenPayment, setIsOpenPayment] = useState(false)

  const handleSendOrder = async () => {
    setPending(true)
    try {
      if (isDisbledButton() === false) {
        await createOrdersByUser({ ...data, delivery_type: radioValue })
        if (isAdmin === false) {
          router.push("/pedidos")
        }
        setPending(false)
        setIsOpen(false)
        resetState()
      } else {
        setPending(false)
        setIsOpen(false)
        resetState()
        setIsOpenPayment(true)
      }
    } catch (error) {
      setPending(false)
      console.log(error)
    }
  }

  const isDisbledButton = () => {
    return data.payment_type === "" || data.hasAddress === false
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
          aria-disabled={pending}
          disabled={pending}
          onClick={() => handleSendOrder()}
          className={`w-full text-white ${isDisbledButton() ? "bg-[#f37a83] bg-opacity-50 cursor-not-allowed" : "bg-accent"}`}
        >
          {pending ? <Loader text={"Loading"} /> : "Fazer pedido"}
        </Button>
      </div>
    )
  }

  const handleRadioValueChange = (newValue) => {
    setRadioValue(newValue)
  }

  const handleClose = (id, newItem) => {
    setIsOpenPayment(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center" asChild>
        <Button
          variant="outline"
          size="md"
          className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center gap-2">
              <BsHandbag className="h-6 w-6" />
              {data.quantityTotal > 0 && (
                <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </div>
              )}
            </div>
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
            <IF condition={isAdmin === false}>
              <div>
                <p className="text-sm text-muted-foreground">Seu pedido em</p>
                <h2 className="text-lg font-bold">Vieiras Refeições</h2>
              </div>
            </IF>
            <IF condition={isAdmin === true}>
              <div>
                <p className="text-sm text-muted-foreground">Seu atual pedido na <span className="text-lg font-bold">Cozinha</span></p>
              </div>
            </IF>
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
            <IF condition={isAdmin && data.quantityTotal > 0}>
              <div className="space-y-2 p-4">
                <label htmlFor="comment" className="text-sm text-gray-700">
                  Pedido é para...
                </label>
                <RadioGroup value={radioValue} onValueChange={handleRadioValueChange}>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <RadioGroupItem value="mesa" id="mesa" />
                      <Label htmlFor="mesa" className="flex items-center space-x-2">
                        <BiDish className="h-5 w-5" /> {/* Ajuste o tamanho do ícone conforme necessário */}
                        <span> Mesa</span>
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <RadioGroupItem value="entrega" id="entrega" />
                      <Label htmlFor="entrega" className="flex items-center space-x-2">
                        <MdOutlineDeliveryDining className="h-5 w-5" />
                        <span> Entrega</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </IF>
            <IF condition={data.quantityTotal > 0}>
              <MobilePaymentSheet isOpenPayment={isOpenPayment} setIsOpenPayment={setIsOpenPayment} />
            </IF>
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
