"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FaPlus } from "react-icons/fa"
import { createAccompanimentsAction, deleteAccompanimentAction, deleteDishAction, updateAccompanimentsAction, updateDishAction } from "@/app/data/actions/auth-actions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Switch } from "./ui/switch"
import { useEffect, useRef, useState } from "react"
import { formatPrice } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const INITIAL_STATE = {
  data: null,
}

const AdminAccompanimentForm = ({ accompaniments, onSubmitSuccess }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenRemoveItem, setIsOpenModalRemoveItem] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)
  const [itemToEdit, setItemToEdit] = useState(null)
  const [title, setTitle] = useState("")
  const [smallDescription, setSmallDescription] = useState("")
  const [activeStates, setActiveStates] = useState(() => {
    const initialStates = {}
    accompaniments.forEach(accompaniment => {
      initialStates[accompaniment._id] = accompaniment.active
    })
    return initialStates
  })
  const router = useRouter()

  const handleEditItemChange = (currentAcc) => {
    if (!currentAcc) {
      setItemToEdit(null)
      setTitle("")
      setSmallDescription("")
    } else {
      setItemToEdit(currentAcc)
      setTitle(currentAcc.title)
      setSmallDescription(currentAcc.small_description)
    }
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const accData = {
      title,
      smallDescription,
    }

    try {
      if (!!itemToEdit) {
        await updateAccompanimentsAction(itemToEdit._id, accData)
      } else {
        await createAccompanimentsAction(accData)
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

  const handleUpdateActive = async (dish, checked) => {
    console.log(activeStates)
    setActiveStates(prev => ({
      ...prev,
      [dish._id]: checked,
    }))

    const dishData = {
      title: dish.title,
      price: dish.price,
      description: dish.description,
      serves: dish.serves,
      active: checked,
      img_url: dish.img_url
    }

    await updateDishAction(dish._id, dishData)
  }

  const handleRemoveItem = async () => {
    deleteAccompanimentAction(itemToRemove._id)
    setIsOpenModalRemoveItem(false)
    onSubmitSuccess()
  }
  
  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Acompanhamentos</h1>
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
                    <Label htmlFor="title">Nome do acompanhamento</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Exemplo: Arroz a grega"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)} // Atualiza o estado
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smallDescription">Pequena Descrição</Label>
                    <Textarea
                      id="smallDescription"
                      name="smallDescription"
                      placeholder="Exemplo: Arroz refolgado ..."
                      className="min-h-[100px]"
                      value={smallDescription}
                      onChange={(e) => setSmallDescription(e.target.value)}
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
              <TableHead>Título</TableHead>
              <TableHead>Pequena Descrição</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              accompaniments.map((accompaniment, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{accompaniment.title}</TableCell>
                    <TableCell>{accompaniment.small_description}</TableCell>
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
                            handleEditItemChange(accompaniment)
                          }}>
                            <div>
                              Editar
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onClick={() => {
                            setIsOpenModalRemoveItem(true)
                            setItemToRemove(accompaniment)
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

export default AdminAccompanimentForm