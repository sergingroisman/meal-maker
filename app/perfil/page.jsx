"use server"

import Header from "@/components/Header"
import ProfileForm from "@/components/ProfileForm"
import { getUserLoader } from "@/services/api"

const Perfil = async () => {
  const { ok, data, error } = await getUserLoader()
  

  if (!ok || !data) {
    console.error("Erro ao carregar dados do usuário:", error);
    return (
      <div>
        <h1>Erro ao carregar perfil</h1>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <ProfileForm user={data}/>
    </div>
  )
}

export default Perfil