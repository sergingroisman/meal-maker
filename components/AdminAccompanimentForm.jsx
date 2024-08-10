"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FaPlus, FaUpload } from "react-icons/fa"
import { createDishAction } from "@/app/data/actions/auth-actions"
import { useFormState } from "react-dom"
import { SubmitButton } from "./custom/SubmitButton"
import { ApiErrors } from "./custom/ApiErrors"
import { CiSquarePlus } from "react-icons/ci"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Switch } from "./ui/switch"
import { useState } from "react"

const INITIAL_STATE = {
  data: null,
}

const AdminAccompanimentForm = ({ accompaniments }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formState, formAction] = useFormState(createDishAction, INITIAL_STATE)

  const handleClose = () => {
    setIsOpen(false)
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
                  <Button type="submit" className="px-4 py-2 text-sm font-medium">Salvar</Button>
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
                          <Button variant="ghost" size="icon">
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
            <Button onClick={() => handleRemoveItem(itemToRemove)}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AdminAccompanimentForm