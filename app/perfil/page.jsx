const Perfil = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-2xl font-semibold text-center">Editar informações pessoais</h1>
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
              Nome completo
            </label>
            <input
              type="text"
              id="full-name"
              defaultValue="Sérgio Santos"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              defaultValue="097.057.574-29"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50"
            >
              Voltar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Perfil