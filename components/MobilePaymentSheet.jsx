"use client"

import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'
import Link from "next/link"
import { FaMoneyBill } from "react-icons/fa"
import { FaCcMastercard } from "react-icons/fa"
import { FaCcVisa } from "react-icons/fa"
import { CiCreditCard1 } from "react-icons/ci"
import { FaPix } from "react-icons/fa6"
import { Button } from "./ui/button"
import { useState } from "react"
import { RiArrowLeftSLine } from "react-icons/ri"
import VisuallyHidden from "./custom/VisuallyHidden"
import useStore from "@/store/useStore"
// import IF from './custom/if'

const MobilePaymentSheet = () => {
  const data = useStore((state) => state.data)
  const setPaymentType = useStore((state) => state.setPaymentType)
  const pathname = usePathname()
  const [isOpenPayment, setIsOpenPayment] = useState(false)

  const handleClose = (id, newItem) => {
    setIsOpenPayment(false)
  }

  const handleSetPaymentType = (value) => {
    setPaymentType(value)
    handleClose()
  }

  return (
    <div className="">
      <Sheet open={isOpenPayment} onOpenChange={setIsOpenPayment}>
        <SheetTrigger asChild>
          <div className="flex justify-between text-sm py-6 border-b pl-4 pr-4">
            {data.payment_type === "" ? (<p>Pagamento</p>) : (<p>{data.payment_type}</p>)}
            
            <p className="text-accent cursor-pointer">Trocar</p>
          </div>
        </SheetTrigger>
        <SheetContent className="w-full overflow-auto" showCloseButton={false}>
          <div className="">
            <VisuallyHidden>
              <SheetTitle>Conteúdo de Pagamento</SheetTitle>
            </VisuallyHidden>
            <header className="flex items-center justify-between p-4 border-b">
              <div className="p-0" onClick={() => setIsOpenPayment(false)}>
                <RiArrowLeftSLine className="w-6 h-6 text-accent" />
              </div>
              <h1 className="text-center text-lg font-semibold">PAGUE NA ENTREGA</h1>
              <div className="w-6" />
            </header>
            <div className="p-4">
              <p className="text-center text-gray-500 mb-4">
                Para pagamento na entrega, a loja aceita as seguintes opções:
              </p>
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Dinheiro</h2>
                  <div className="space-y-2">
                    <Link href="#" onClick={() => handleSetPaymentType("PIX")} className="flex items-center p-4 border rounded-lg" prefetch={false}>
                      <FaPix className="h-6 w-6 text-[#2DBDAF]" />
                      <span className="ml-4">PIX</span>
                    </Link>
                    <Link 
                      href="#"
                      onClick={() => handleSetPaymentType("Dinheiro")}
                      className="flex items-center p-4 border rounded-lg" 
                      prefetch={false}
                    >
                      <FaMoneyBill className="h-6 w-6 text-green-500" />
                      <span className="ml-4">Dinheiro</span>
                    </Link>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Débito</h2>
                  <div className="space-y-2">
                    <Link 
                      href="#"
                      onClick={() => handleSetPaymentType("Mastercard - Débito")}
                      className="flex items-center p-4 border rounded-lg"
                      prefetch={false}
                    >
                      <FaCcMastercard className="h-6 w-6" />
                      <span className="ml-4">Mastercard - Débito</span>
                    </Link>
                    <Link
                      href="#"
                      onClick={() => handleSetPaymentType("Visa - Débito")}
                      className="flex items-center p-4 border rounded-lg"
                      prefetch={false}
                    >
                      <FaCcVisa className="h-6 w-6" />
                      <span className="ml-4">Visa - Débito</span>
                    </Link>
                    <Link
                      href="#"
                      onClick={() => handleSetPaymentType("Outro - Débito")}
                      className="flex items-center p-4 border rounded-lg"
                      prefetch={false}
                    >
                      <CiCreditCard1 className="h-6 w-6" />
                      <span className="ml-4">Outro - Débito</span>
                    </Link>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Crédito</h2>
                  <div className="space-y-2">
                    <Link
                      href="#"
                      onClick={() => handleSetPaymentType("Mastercard - Crédito")}
                      className="flex items-center p-4 border rounded-lg"
                      prefetch={false}
                    >
                      <FaCcMastercard className="h-6 w-6" />
                      <span className="ml-4">Mastercard - Crédito</span>
                    </Link>
                    <Link
                      href="#"
                      onClick={() => handleSetPaymentType("Visa - Crédito")}
                      className="flex items-center p-4 border rounded-lg"
                      prefetch={false}
                    >
                      <FaCcVisa className="h-6 w-6" />
                      <span className="ml-4">Visa - Crédito</span>
                    </Link>
                    <Link
                      href="#"
                      onClick={() => handleSetPaymentType("Outro - Crédito")}
                      className="flex items-center p-4 border rounded-lg"
                      prefetch={false}
                    >
                      <CiCreditCard1 className="h-6 w-6" />
                      <span className="ml-4">Outro - Crédito</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobilePaymentSheet