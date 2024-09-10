"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FaPlus } from "react-icons/fa"
import { createAccompanimentsAction, createDeliveryAction, deleteAccompanimentAction, deleteDeliveryAction, deleteDishAction, updateAccompanimentsAction, updateDeliveryAction, updateDishAction } from "@/app/data/actions/auth-actions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Loader2 } from "lucide-react"
import MaskedInput from "react-text-mask"
import { formatIncompletePhoneNumber } from "libphonenumber-js"

const INITIAL_STATE = {
  data: null,
}

const AdminDeliveryForm = ({ deliveries, onSubmitSuccess }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenRemoveItem, setIsOpenModalRemoveItem] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)
  const [itemToEdit, setItemToEdit] = useState(null)
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleEditItemChange = (currentDelivery) => {
    if (!currentDelivery) {
      setItemToEdit(null)
      setName("")
      setPhoneNumber("")
    } else {
      setItemToEdit(currentDelivery)
      setName(currentDelivery.name)
      setPhoneNumber(formatIncompletePhoneNumber(currentDelivery.phone_number))
    }
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const deliveryData = {
      name,
      phoneNumber,
    }

    try {
      if (!!itemToEdit) {
        await updateDeliveryAction(itemToEdit._id, deliveryData)
      } else {
        await createDeliveryAction(deliveryData)
      }

      handleEditItemChange(null)
      handleClose()
      setIsLoading(false)
      onSubmitSuccess()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const handleRemoveItem = async () => {
    deleteDeliveryAction(itemToRemove._id)
    setIsOpenModalRemoveItem(false)
    onSubmitSuccess()
  }
  
  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Entregadores</h1>
          <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setIsOpenModal(true)
                handleEditItemChange(null)
              }} variant="outline" className="flex items-center">
                <FaPlus className="mr-2" />
                Adicionar um item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <form onSubmit={handleSubmit} className="text-primary">
                <DialogHeader>
                  <DialogTitle>Novo item</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 pb-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do entregador</Label>
                    <Input
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Telefone celular</Label>
                    <MaskedInput
                      mask={[
                        '(',
                        /[1-9]/,
                        /\d/,
                        ')',
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        '-',
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/
                      ]}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                      placeholder="(XX) XXXXX-XXXX"
                      guide={false}
                      id="phoneNumber"
                      name="phoneNumber"
                      type="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(formatIncompletePhoneNumber(e.target.value))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium" variant="outline">Cancelar</Button>
                  <Button type="submit" className="px-4 py-2 text-sm font-medium">
                    {isLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
                    Salvar
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone Celular</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              deliveries.map((delivery, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{delivery.name}</TableCell>
                    <TableCell>{formatIncompletePhoneNumber(delivery.phone_number)}</TableCell>
                    <TableCell key={index}>
                      <DropdownMenu key={index}>
                        <DropdownMenuTrigger asChild>
                          <Button type="button" variant="ghost" size="icon">
                            <BsThreeDotsVertical className="h-4 w-4" />
                            <span className="sr-only">Options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer" onClick={() => {
                            setIsOpenModal(true)
                            handleEditItemChange(delivery)
                          }}>
                            <div>
                              Editar
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onClick={() => {
                            setIsOpenModalRemoveItem(true)
                            setItemToRemove(delivery)
                          }}>
                            <div>
                              Excluir
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
      <Dialog open={isOpenRemoveItem} onOpenChange={setIsOpenModalRemoveItem}>
        <DialogContent aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <div>
            <p id="dialog-description">Você tem certeza que deseja excluir este item?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpenModalRemoveItem(false)}>Cancelar</Button>
            <Button onClick={() => handleRemoveItem()}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminDeliveryForm