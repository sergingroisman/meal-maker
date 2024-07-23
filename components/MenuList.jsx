import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci"
import { formatPrice } from "@/lib/utils"

const MenuList = ({ menus }) => {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible>
        {menus.map((menu, index) => {
          return (
            <AccordionItem 
              value={`item-${index}`}
              key={index}
            >
              <AccordionTrigger className="items-center justify-center gap-1">
                {menu.name}
              </AccordionTrigger>

              {menu.dishes.map((dish, index) => {
                return (
                  <AccordionContent 
                    key={index} 
                    className="w-full justify-center items-center"
                  >
                    <Card className="w-full bg-slate-100 p-6 rounded-lg shadow-md">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold">{dish.title}</h3>
                          <p className="text-sm text-muted-foreground">{dish.description}</p>
                        </div>
                        <div className="text-2xl font-bold">{formatPrice(dish.price)}</div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button variant="default" size="icon">
                            <CiSquarePlus className="h-8 w-8" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="text-lg font-medium">1</span>
                          <Button size="icon">
                            <CiSquareMinus className="h-8 w-8" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <Button>Add to Cart</Button>
                      </div>
                    </Card>
                  </AccordionContent>
                )
              })}
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

export default MenuList