import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const MenuList = ({ menus }) => {
  return (
    <>
      <Accordion type="single" collapsible>
        {menus.map((menu, index) => {
          return (
            <AccordionItem 
              value={`item-${index}`}
              key={index}
            >
              <AccordionTrigger>
                {menu.name}
              </AccordionTrigger>

              {menu.dishes.map((dish, index) => {
                return (
                  <AccordionContent 
                    key={index} 
                    className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl justify-center items-center">
                    {dish.title}
                    {dish.description}
                    {dish.price}
                  </AccordionContent>
                )
              })}
            </AccordionItem>
          )
        })}
      </Accordion>
    </>
  )
}

export default MenuList