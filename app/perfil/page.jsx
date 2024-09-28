"use server"

import Header from "@/components/Header"
import ProfileForm from "@/components/ProfileForm"
import { getUserLoader } from "@/services/api"

const Perfil = async () => {
  try {
    const { ok, data, error } = await getUserLoader()

    if (!ok || error) {
      console.error("Erro ao carregar pedidos:", error);
      return (
        <div>
          <Header />
          <section className="flex items-center justify-center py-2 xl:py-0">
            <div className="container mx-auto px-4 py-4">
              <h1>Erro ao carregar o perfil</h1>
            </div>
          </section>
        </div>
      )
    }


    return (
      <div>
        <Header />
        <ProfileForm user={data} />
      </div>
    )
  } catch (error) {
    console.error("Erro ao carregar os dados do usuário", error);
    return (
      <div>
        <h1>Erro ao carregar os dados do usuário</h1>
      </div>
    )
  }
}

export default Perfil