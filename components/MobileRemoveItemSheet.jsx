"use client"

import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { useState } from "react"
import { SlOptionsVertical } from "react-icons/sl"
import useStore from "@/store/useStore"

const MobileRemoveItemSheet = ({ id, title }) => {
  const [isOpenRemoveItem, setIsOpenRemoveItem] = useState(false)
  const removeItem = useStore((state) => state.removeItem)

  const handleRemoveItem = () => {
    removeItem(id);
  }

  return (
    <div className="">
      <Sheet open={isOpenRemoveItem} onOpenChange={setIsOpenRemoveItem}>
        <SheetTrigger asChild>
          <Button onClick={() => setIsOpenRemoveItem(false)} variant="ghost" size="icon">
            <SlOptionsVertical className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="flex flex-col items-center justify-center" showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-4 items-center">
            <Button onClick={() => handleRemoveItem()} variant="ghost" className="text-red-500">
              Remover item
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileRemoveItemSheet