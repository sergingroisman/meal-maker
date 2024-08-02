"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { IoIosArrowDown } from "react-icons/io"
import { Button } from "./ui/button"

const links = [
  {
    name: "cardápio",
    path: "/",
  },
  {
    name: "pedidos",
    path: "/pedidos",
  },
]

const Nav = () => {
  const pathname = usePathname()

  const handleSubmit = (event) => {
    event.preventDefault() // Impede o envio padrão do formulário
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())
    console.log(data) // Aqui você pode processar os dados do formulário
  }

  const handleCancel = () => {
    // Lógica para cancelar a operação, como fechar o diálogo
  }

  return <nav className="flex gap-8">
    {links.map((link, index) => {
      return (
        <Link 
          href={link.path}
          key={index}
          className={`${link.path === pathname && "text-accent border-b-2 border-accent"} capitalize font-medium hover:text-accent transition-all`}>
          {link.name}
        </Link>
      )
    })}
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center text-sm font-medium text-primary">
          Endereço atual
          <IoIosArrowDown className="w-6 h-6 text-accent" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] flex flex-col">
        <DialogHeader className="items-center justify-center">
          <DialogTitle>Cadastrar Endereço</DialogTitle>
          <DialogDescription>Preencha as informações do endereço abaixo.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4 w-full justify-start">
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="street" className="text-right">
              Rua
            </Label>
            <Input id="street" name="street" placeholder="Nome da rua" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="number" className="text-right">
              Número
            </Label>
            <Input id="number" name="number" placeholder="Número" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="city" className="text-right">
              Cidade
            </Label>
            <Input id="city" name="city" placeholder="Cidade" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="state" className="text-right">
              Estado
            </Label>
            <Input id="state" name="state" placeholder="Estado" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="zipcode" className="text-right">
              CEP
            </Label>
            <Input id="zipcode" name="zipcode" placeholder="CEP" className="col-span-3" required />
          </div>

          
          <DialogFooter className="flex gap-2">
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </nav>
}

export default Nav