"use server"

import Header from "@/components/Header"
// components
import ListDishes from "@/components/ListDishes"
import { fetchBff, getUserLoader } from "@/services/api"

const Home = async () => {
  const { dishes, accompaniments } = await fetchBff()
  const { ok, data, error } = await getUserLoader()
  
  return (
    <div>
      <Header />
      <section className="flex items-center justify-center py-8 xl:py-0">
        <div className="container mx-auto xl:px-4 xl:py-8">
          <h1 className="text-[20px] font-semibold xl:pb-[32px]">Cardápio</h1>
          <ListDishes dishes={dishes} accompaniments={accompaniments} user={data} />
        </div>
      </section>
    </div>
  );
}

export default Home