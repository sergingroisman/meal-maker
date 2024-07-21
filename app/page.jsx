import { FaList } from "react-icons/fa"
import { PiHandbag } from "react-icons/pi"
import { CiDiscount1 } from "react-icons/ci"

// components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button"
import MenuList from "@/components/MenuList"
import { fetchRestaurant } from "@/services/api"


const Home = async () => {
  const restaurant = await fetchRestaurant();

  return (
    <section className="flex items-center justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        {/* alerta se estiver aberto */}
        {/* <p className="mb-8">Aberto para entrega ou retirada de pedidos agora.</p> */}
        <Tabs
          defaultValue="cardapio"
          className="flex flex-col gap-[50px]"
        >
          <TabsList className="flex w-full mx-auto xl:mx-0">
            <TabsTrigger value="cardapio" className="flex flex-col">
              <FaList className="text-3xl font-semibold" />
              Cardápio
            </TabsTrigger>
            <TabsTrigger value="promo" className="flex flex-col">
              <CiDiscount1 className="text-3xl font-semibold" />
              Promoções
            </TabsTrigger>
            <TabsTrigger value="sacola" className="flex flex-col">
              <PiHandbag className="text-3xl font-semibold" />
              Sacola
            </TabsTrigger>
          </TabsList>

          <div className="flex w-full items-center space-x-2">
            <Input type="Procurar no cardápio" placeholder="Procurar no cardápio" />
            <Button variant="outline">Procurar</Button>
          </div>
          
          {/* content */}
          <div className="w-full">
            {/* cardapio */}
            <TabsContent value="cardapio" className="w-full">
              <MenuList menus={restaurant.menus} />
            </TabsContent>
            {/* promo */}
            <TabsContent value="promo" className="w-full">
              Promo
            </TabsContent>
            {/* sacola */}
            <TabsContent value="sacola" className="w-full">
              Sacola
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

export default Home