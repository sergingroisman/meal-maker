"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import MaskedInput from "react-text-mask"
import { useFormState } from "react-dom"
import { updateUserAddressAction } from "@/app/data/actions/auth-actions"
import { ZodErrors } from "./custom/ZodErrors"
import { ApiErrors } from "./custom/ApiErrors"
import { SubmitButton } from "./custom/SubmitButton"
import useStore from "@/store/useStore"

const INITIAL_STATE = {
  data: null,
}

const ProfileForm = ({ user }) => {
  const [phone, setPhone] = useState('')
  const [formState, formAction] = useFormState(
    updateUserAddressAction,
    INITIAL_STATE
  )
  const router = useRouter()

  const handlePhoneChange = (event) => {
    const inputValue = event.target.value
    const onlyNumbers = inputValue.replace(/\D/g, '')
    setPhone(onlyNumbers)
  }

  const handleGoBack = () => {
    router.back();
  }

  const handleUpdatePerfil = () => {
    router.back();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-2xl font-semibold text-center">Editar informações pessoais</h1>
        <form action={formAction} className="space-y-4 text-primary">
          <div className="space-y-2">
            <Label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
              Nome completo
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={user.name}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefone Celular
            </Label>
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
              id="phone_number"
              name="phone_number"
              value={user.phone_number}
              onChange={handlePhoneChange}
              disabled
            />
          </div>
          <div className="flex items-center space-x-2">
            <Separator className="flex-1" />
            <p className="text-sm text-muted-foreground">Endereço</p>
            <Separator className="flex-1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="street" className="block text-sm font-medium text-gray-700">
              Rua
            </Label>
            <Input
              defaultValue={user.address.street}
              type="text"
              id="street"
              name="street"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            <ZodErrors error={formState?.zodErrors?.street} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="number" className="block text-sm font-medium text-gray-700">
              Número
            </Label>
            <Input
              defaultValue={user.address.number}
              type="text"
              id="number"
              name="number"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            <ZodErrors error={formState?.zodErrors?.number} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city" className="block text-sm font-medium text-gray-700">
              Cidade
            </Label>
            <Input
              defaultValue={user.address.city}
              type="text"
              id="city"
              name="city"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            <ZodErrors error={formState?.zodErrors?.city} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className="block text-sm font-medium text-gray-700">
              Estado
            </Label>
            <Input
              defaultValue={user.address.state}
              type="text"
              id="state"
              name="state"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            <ZodErrors error={formState?.zodErrors?.state} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip" className="block text-sm font-medium text-gray-700">
              CEP
            </Label>
            <Input
              defaultValue={user.address.cep}
              type="text"
              id="cep"
              name="cep"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            <ZodErrors error={formState?.zodErrors?.cep} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="complemento" className="block text-sm font-medium text-gray-700">
              Complemento
            </Label>
            <Input
              defaultValue={user.address.complement}
              type="text"
              id="complement"
              name="complement"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
            <ZodErrors error={formState?.zodErrors?.complement} />
          </div>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={() => handleGoBack()}
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50"
            >
              Voltar
            </button>
            <SubmitButton
              className="px-4 py-2 text-sm font-medium text-white bg-accent border border-transparent rounded-md hover:bg-accent-hover"
              text="Salvar"
              loadingText="Loading" 
            />
            <ApiErrors error={formState?.ApiErrors} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm