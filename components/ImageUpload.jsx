"use client"

import { useState } from "react"
import { Label } from "./ui/label"
import { FaUpload } from "react-icons/fa"
import { Button } from "./ui/button"


const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      console.log(URL.createObjectURL(file))
      setSelectedImage(URL.createObjectURL(file))
    }
  }

  const handleUpload = () => {
    // Aqui você pode implementar a lógica para enviar a imagem ao backend
    // Por exemplo, usando FormData e fetch ou axios
    console.log('Imagem enviada:', selectedImage)
  }

  return (
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
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="outline">Escolher Imagem</Button>
          </label>
          <p className="text-xs text-muted-foreground">
            Formatos: JPEG, JPG, PNG e HEIC. Peso máximo: 20 MB. Resolução mínima: 300x275
          </p>
        </div>
      </div>
      {selectedImage && (
        <Button onClick={handleUpload} variant="primary">Enviar Imagem</Button>
      )}
    </div>
  )
}

export default ImageUpload