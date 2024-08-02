"use server"

// components
import ListDishes from "@/components/ListDishes"
import { fetchBff } from "@/services/api"

const Home = async () => {
  const { dishes, accompaniments } = await fetchBff()
  
  return (
    <section className="flex items-center justify-center py-12 xl:py-0">
      <div className="container mx-auto xl:px-4 xl:py-8">
        <h1 className="text-[20px] font-semibold xl:pb-[32px]">Cardápio</h1>
        <ListDishes dishes={dishes} accompaniments={accompaniments} />
      </div>
    </section>
  );
}

export default Home