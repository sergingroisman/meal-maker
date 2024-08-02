"use client"

import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "./ui/checkbox"
import { useState } from "react"
import { RiArrowLeftSLine } from "react-icons/ri"
import VisuallyHidden from "./custom/VisuallyHidden"
import CardDish from "./CardDish"
import useStore from "@/store/useStore"
import { formatPrice } from "@/lib/utils"
import useDimensions from "./custom/useDimensions"
import { FaMinus, FaPlus } from "react-icons/fa"

const MobileAddItemSheet = ({ index_parent, item, accompaniments }) => {
  if (!item) {
    return (
      <h1>Sem CARD</h1>
    )
  }

  const addItem = useStore((state) => state.addItem)
  const updateItem = useStore((state) => state.updateItem)
  const { isMobile } = useDimensions()
  const pathname = usePathname()
  const [isOpenAddItem, setIsOpenAddItem] = useState(false)
  const [observation, setObservation] = useState("")
  const [selectedAccompaniments, setSelectedAccompaniments] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleCheckboxChange = (id) => {
    setSelectedAccompaniments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleObservationChange = (event) => {
    setObservation(event.target.value);
  };

  const handleIncrement = () => {
    setSelectedQuantity(selectedQuantity + 1)
  }
  const handleDecrement = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1)
    }
  }

  const handleClose = () => {
    setIsOpenAddItem(false)
    setSelectedAccompaniments({})
  }

  const handleAddItem = () => {
    const selectedAccompanimentIds = Object.keys(selectedAccompaniments).filter(
      (id) => selectedAccompaniments[id]
    )

    addItem({
      _id: item._id,
      title: item.title,
      price: item.price,
      observation: observation,
      quantity: selectedQuantity,
      accompaniments: selectedAccompanimentIds.map((id) => ({
        _id: id,
        title: accompaniments.find((a) => a._id === id).title,
      })),
    })
    handleClose()
  }

  const handleUpdateItem = (id, newItem) => {
    updateItem(id, newItem);
  };

  return (
    <div key={index_parent} className="">
      <Sheet className={`${isMobile && "w-[85%]"}`} key={index_parent} open={isOpenAddItem} onOpenChange={setIsOpenAddItem}>
        <SheetTrigger asChild>
          <div onClick={() => setIsOpenAddItem(true)}>
            <CardDish dish={item} />
          </div>
        </SheetTrigger>
        <SheetContent className="w-full overflow-auto" showCloseButton={false}>
          <div className="">
            <VisuallyHidden>
              <SheetTitle>Conteúdo de Item</SheetTitle>
            </VisuallyHidden>
            <header className="flex items-center justify-between p-4 border-b border-t">
              <div className="p-0" onClick={() => handleClose()}>
                <RiArrowLeftSLine className="w-6 h-6 text-accent" />
              </div>
              <h1 className="text-center text-lg font-semibold">{item.title}</h1>
              <div className="w-6" />
            </header>
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md pb-[74px]">
              <div className="p-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-700">Acompanhamentos</h3>
                    <Badge variant="secondary">OBRIGATÓRIO</Badge>
                  </div>
                  <p className="text-xs text-gray-500">Escolha suas opções</p>
                </div>
                <div className="py-4 border-b">
                  {accompaniments.map((accompaniment) => {
                    const id = accompaniment._id
                    return (
                      <div key={id} className="flex justify-between items-center py-2">
                        <div>
                          <h4 className="text-sm font-bold text-gray-700">{accompaniment.title}</h4>
                          <p className="text-xs text-gray-500">{accompaniment.small_description}</p>
                        </div>
                        <Checkbox 
                          id={id}
                          className="ml-auto h-8 w-8"
                          checked={selectedAccompaniments[id]}
                          onCheckedChange={(checked) => handleCheckboxChange(id, checked)}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-2 p-4">
                <label htmlFor="comment" className="text-sm text-gray-700">
                  Algum comentário?
                </label>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{observation.length} / 140</span>
                </div>
                <textarea
                  id="comment"
                  placeholder="Ex: tirar a cebola, maionese à parte etc."
                  className="w-full p-2 border rounded-md"
                  maxLength="140"
                  value={observation}
                  onChange={handleObservationChange}
                />
              </div>
              {
                isMobile ? (
                  <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between p-6 gap-2 border-t bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" className="w-8 h-8" onClick={handleDecrement}>
                        {selectedQuantity > 1 ? "-" : (<span className="bg-opacity-25">-</span>)}
                      </Button>
                      <span className="text-sm font-bold">{selectedQuantity === 0 ? 1 : selectedQuantity}</span>
                      <Button variant="outline" className="w-8 h-8" onClick={handleIncrement}>
                        +
                      </Button>
                    </div>
                    <Button onClick={() => handleAddItem()} className="bg-accent w-full text-white">Adicionar</Button>
                    <span className="text-sm font-bold text-gray-700">{formatPrice(item.price * selectedQuantity)}</span>
                  </div>
                ) : (
                    <div className="fixed bottom-0 flex items-center justify-between p-4 border-t bg-gray-50">
                      <div className="flex items-center justify-between p-4 border-t gap-2">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" className="px-4" onClick={handleDecrement}>
                            {selectedQuantity > 1 ? <FaMinus className="w-4 h-4" /> : (
                              <span className="bg-opacity-25">
                                <FaMinus className="w-4 h-4" />
                              </span>
                            )}
                          </Button>
                          <span className="text-lg font-medium">{selectedQuantity === 0 ? 1 : selectedQuantity}</span>
                          <Button variant="outline" className="px-4" onClick={handleIncrement}>
                            <FaPlus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button onClick={() => handleAddItem()} className="bg-accent text-white px-6 py-2 flex items-center space-x-2">
                          <span>Adicionar</span>
                          <span>{formatPrice(item.price * selectedQuantity)}</span>
                        </Button>
                      </div>
                    </div>
                )
              }
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileAddItemSheet