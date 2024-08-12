"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FaPlus, FaUpload, FaUser, FaUserFriends } from "react-icons/fa"
import { createDishAction, deleteDishAction, updateDishAction } from "@/app/data/actions/auth-actions"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Switch } from "./ui/switch"
import { useEffect, useRef, useState } from "react"
import { formatPrice } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { BsThreeDotsVertical } from "react-icons/bs"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const AdminDishForm = ({ dishes, onSubmitSuccess }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenRemoveItem, setIsOpenModalRemoveItem] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)
  const [itemToEdit, setItemToEdit] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImageFile, setSelectedImageFile] = useState(null)
  const fileInputRef = useRef(null)
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [serves, setServes] = useState("nao_se_aplica")
  const [activeStates, setActiveStates] = useState(() => {
    const initialStates = {}
    dishes.forEach(dish => {
      initialStates[dish._id] = dish.active
    })
    return initialStates
  })
  const router = useRouter()

  const handleImageChange = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(imageUrl)

    const formData = new FormData()
    formData.append("image", file)
    setSelectedImageFile(formData)
  }

  const handleEditItemChange = (currentDish) => {
    if (!currentDish) {
      setTitle("")
      setPrice("")
      setDescription("")
      setServes("nao_se_aplica")
      setItemToEdit(null)
    } else {
      setItemToEdit(currentDish)
      setTitle(currentDish.title)
      setPrice(String(currentDish.price).replace('.', ','))
      setDescription(currentDish.description)
      setServes(currentDish.serves)
    }
  }

  const handleClose = () => {
    setIsOpenModal(false)
    setSelectedImage(null)
  }

  const convertServesToNumber = (serves) => {
    switch (serves) {
      case "1_pessoa":
        return 1
      case "2_pessoas":
        return 2
      case "3_pessoas":
        return 3
      case "4_pessoas":
        return 4
      default:
        return 0 // Ou outro valor padrão que você queira usar
    }
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const numericValue = parseFloat(price.replace(',', '.'))
    const dishData = {
      title,
      price: numericValue,
      description,
      serves: serves,
    }

    try {
      if (!!itemToEdit) {
        await updateDishAction(itemToEdit._id, dishData, selectedImageFile)
      } else {
        await createDishAction(dishData, selectedImageFile)
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
    deleteDishAction(itemToRemove._id)
    setIsOpenModalRemoveItem(false)
    onSubmitSuccess()
  }

  const handlePriceChange = (event) => {
    const inputValue = event.target.value
    setPrice(inputValue)
  }

  const formatServes = (number) => {
    switch (number) {
      case 1:
        return "1_pessoa"
      case 2:
        return "2_pessoas"
      case 3:
        return "3_pessoas"
      case 4:
        return "4_pessoas"
      default:
        return "nao_se_aplica" // Para outros casos
    }
  }

  const handleServesChange = (value) => {
    setServes(convertServesToNumber(value))
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Cardápios</h1>
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
                    <Label htmlFor="title">Nome do prato</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Exemplo: Marmita de frango"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)} // Atualiza o estado
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço</Label>
                    <Input
                      type="text"
                      id="price"
                      name="price"
                      placeholder="R$ 0,00"
                      value={price}
                      onChange={handlePriceChange} // Atualiza o estado
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Exemplo: Filé de frango grelhado acompanhado de arroz branco, purê de batatas e farofa"
                      className="min-h-[100px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Foto do item</Label>
                    <div className="border-2 border-dashed border-gray-300 p-4 rounded-md">
                      <div className="flex flex-col items-center space-y-2">
                        {selectedImage ? (
                          <img src={selectedImage} alt="Imagem selecionada" className="h-32 w-32 object-cover rounded-md" />
                        ) : (
                          <FaUpload className="h-12 w-12 text-gray-400" />
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg, image/png, image/jpg, image/heic"
                          onChange={handleImageChange}
                          className="hidden"
                          id="img_url"
                        />
                        <label htmlFor="img_url">
                          <Button type="button" variant="outline" onClick={() => fileInputRef.current.click()}>Escolher Imagem</Button>
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Formatos: JPEG, JPG, PNG e HEIC. Peso máximo: 20 MB. Resolução mínima: 300x275
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Este item serve quantas pessoas?</Label>
                    <RadioGroup value={formatServes(serves)} onValueChange={handleServesChange}>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nao_se_aplica" id="nao_se_aplica" />
                          <Label htmlFor="nao_se_aplica">Não se aplica</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1_pessoa" id="1_pessoa" />
                          <Label htmlFor="1_pessoa">1 pessoa</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2_pessoas" id="2_pessoas" />
                          <Label htmlFor="2_pessoas">2 pessoas</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3_pessoas" id="3_pessoas" />
                          <Label htmlFor="3_pessoas">3 pessoas</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4_pessoas" id="4_pessoas" />
                          <Label htmlFor="4_pessoas">4 pessoas</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium" variant="outline">Cancelar</Button>
                  <Button type="submit" className="px-4 py-2 text-sm font-medium">
                    {isLoading &&(<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
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
              <TableHead>Item</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Serve</TableHead>
              <TableHead>Ativo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              dishes.map((dish, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={dish.img_url}
                        alt={dish.description}
                        className="w-12 h-12 rounded"
                        width="50"
                        height="50"
                        style={{ aspectRatio: "50/50", objectFit: "cover" }}
                      />
                    </TableCell>
                    <TableCell>{dish.title}</TableCell>
                    <TableCell>{formatPrice(dish.price)}</TableCell>
                    <TableCell>{dish.description}</TableCell>
                    <TableCell>
                      {dish.serves > 1 ? (
                        <div className="flex items-center gap-2">
                          <FaUserFriends className="h-3 w-3" />
                          {dish.serves}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <FaUser className="h-3 w-3" />
                          {dish.serves}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div key={dish._id} className="">
                        <Switch
                          key={dish._id}
                          id={`active-${index}`}
                          checked={activeStates[dish._id]}
                          onCheckedChange={(checked) => handleUpdateActive(dish, checked)} />
                      </div>
                    </TableCell>
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
                            handleEditItemChange(dish)
                          }}>
                            <div>
                              Editar
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onClick={() => {
                            setIsOpenModalRemoveItem(true)
                            setItemToRemove(dish)
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

export default AdminDishForm