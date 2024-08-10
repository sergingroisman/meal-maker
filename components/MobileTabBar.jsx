"use client"

import { useState } from "react"
import Link from "next/link"
import { IoHomeOutline, IoHome } from "react-icons/io5"
import { PiNotepad, PiNotepadDuotone } from "react-icons/pi"
import { TbUser, TbUserFilled } from "react-icons/tb"
import { usePathname, useRouter } from 'next/navigation'
import IF from './custom/if'
import { BsHandbag } from 'react-icons/bs'
import { Button } from './ui/button'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { IoIosArrowDown } from "react-icons/io"
import useSession from "./custom/useSession"
import MobilePaymentSheet from "./MobilePaymentSheet"
import useStore from "@/store/useStore"
import { formatPrice } from "@/lib/utils"
import MobileRemoveItemSheet from "./MobileRemoveItemSheet"
import { createOrdersByUser } from "@/services/api"
import { Loader2 } from "lucide-react"

function Loader({ text }) {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>{text}</p>
    </div>
  )
}

const links = [
  {
    name: "Inicio",
    path: "/",
    icon: <IoHomeOutline className="h-6 w-6" />,
    icon_hover: <IoHome className="h-6 w-6" />,
  },
  {
    name: "Pedidos",
    path: "/pedidos",
    icon: <PiNotepad className="h-6 w-6" />,
    icon_hover: <PiNotepadDuotone className="h-6 w-6" />,
  },
  {
    name: "Perfil",
    path: "/perfil",
    icon: <TbUser className="h-6 w-6" />,
    icon_hover: <TbUserFilled className="h-6 w-6" />
  },
]

const MobileTabBar = () => {
  const [pending, setPending] = useState(false)
  const data = useStore((state) => state.data)
  const resetState = useStore((state) => state.resetState)
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { isLoggedIn } = useSession()
  const router = useRouter()

  const handleSendOrder = async () => {
    try {
      if (isDisbledButton() === false) {
        await createOrdersByUser(data)
        setIsOpen(false)
        resetState()
        router.push("/pedidos")
      }
    } catch (error) {
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
            <Button onClick={() => setIsOpen(false)} variant="outline" className="w-full mt-4">
              Fazer login com Celular
            </Button>
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
          className={`w-full text-white ${isDisbledButton() ? "bg-[#f37a83] bg-opacity-50 cursor-not-allowed hover:bg-[#f37a83]" : "bg-accent"}`}
        >
          {pending ? <Loader text={"Loading"} /> : "Fazer pedido"}
        </Button>
      </div>
    )
  }
  
  return (
    <IF condition={!pathname.includes("/pedidos/") && !pathname.includes("/signin") && !pathname.includes("/signup") && !pathname.includes("/perfil")}>
      <div>
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <IF condition={data.quantityTotal > 0}>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <div onClick={() => setIsOpen(true)} className="flex items-center justify-between px-4 py-2 bg-accent hover:bg-accent-hover transition-colors">
                  <div className="flex items-center space-x-2 text-white">
                    <div className="relative flex items-center gap-2">
                      <BsHandbag className="h-6 w-6" />
                      {data.quantityTotal > 0 && (
                        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm">{data.quantityTotal}</span>
                  </div>
                  <Button className="text-white bg-accent hover:bg-accent-hover transition-colors">Ver sacola</Button>
                  <div className="text-white">{formatPrice(data.total)}</div>
                </div>
              </SheetTrigger>
              <SheetContent side="bottom" className="bg-white rounded-t-lg" showCloseButton={false}>
                <SheetHeader>
                  <div onClick={() => setIsOpen(false)} className="flex justify-between items-center">
                    <Button variant="ghost" className="p-0">
                      <IoIosArrowDown className="w-6 h-6 text-accent" />
                    </Button>
                    <SheetTitle className="text-center text-primary w-full -ml-6">
                      Sacola
                    </SheetTitle>
                  </div>
                </SheetHeader>
                <div className="pl-4 pr-4">
                  <div className="border-b">
                    <h2 className="text-md font-semibold">Items na sacola</h2>
                    {data.items.map((el, index) => {
                      return (
                        <div key={index} className="flex justify-between items-center mt-2 mb-2">
                          <p>{`${el.quantity}x ${el.title}`}</p>
                          <span className="font-semibold">{formatPrice(el.price)}</span>
                          <MobileRemoveItemSheet id={el._id} title={`${el.quantity}x ${el.title}`} />
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex items-center justify-center border-b">
                    <Button onClick={() => setIsOpen(false)} variant="link" className="text-accent">
                      Adicionar mais itens
                    </Button>
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
                </div>
                <MobilePaymentSheet />
                <div className="p-4">
                  {sheetFooterButtons()}
                </div>
              </SheetContent>
            </Sheet>
          </IF>

          <div className="flex justify-between px-4 py-2">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className="flex flex-col items-center justify-center text-muted-foreground transition-colors hover:text-foreground text-primary"
              >
                {link.path === pathname ? link.icon_hover : link.icon}
                <span className="text-xs">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </IF>
  )
}

export default MobileTabBar