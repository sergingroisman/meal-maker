// components
import { fetchRestaurant } from "@/services/api"
import MenuTabs from "@/components/MenuTabs"


const Home = async () => {
  const restaurant = await fetchRestaurant();

  return (
    <section className="flex items-center justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        {/* alerta se estiver aberto */}
        {/* <p className="mb-8">Aberto para entrega ou retirada de pedidos agora.</p> */}
        <MenuTabs restaurant={restaurant} />
        {/* <div className="grid gap-4 sm:grid-cols-12">
          <div className="sm:col-span-8">
          </div>
          <div className="sm:col-span-2">

          </div>
        </div> */}
      </div>
    </section>
  );
}

export default Home