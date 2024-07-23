"use client"

import { useState } from "react"

import { FaList } from "react-icons/fa"
import { PiHandbag } from "react-icons/pi"
import { CiDiscount1 } from "react-icons/ci"

// components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import MenuList from "@/components/MenuList"
import TabContentTransition from "@/components/TabContentTransition"

const tabs = [
  { 
    id: "cardapio",
    label: "Cardápio",
    icon: <FaList className="text-3xl font-semibold" />,
  },
  { 
    id: "promo",
    label: "Promoções",
    icon: <CiDiscount1 className="text-3xl font-semibold" />,
  },
  { 
    id: "sacola",
    label: "Sacola",
    icon: <PiHandbag className="text-3xl font-semibold" />,
  },
]

const MenuTabs = ({ restaurant }) => {
  const [activeTab, setActiveTab] = useState("cardapio")
  const handleClick = (e, tab) => {
    e.preventDefault()
    setActiveTab(tab)
  }
  const isSelected = (tabName) => activeTab === tabName

  return (
    <Tabs
      defaultValue={tabs[0].id}
      className="flex flex-col gap-[50px]"
    >
      <TabsList className="flex w-full mx-auto">
        {tabs.map((tab, index) => {
          return (
            <TabsTrigger 
              key={index}
              value={tab.id}
              className="flex flex-col"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          )
        })}
      </TabsList>
      
      {/* input search */}
      <div className="flex w-full items-center space-x-2">
        <Input type="Procurar no cardápio" placeholder="Procurar no cardápio" />
        <Button variant="outline">Procurar</Button>
      </div>

      {/* content */}
      <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-12 gap-2">
        {/* cardapio */}
        <div className="sm:col-span-8">
          <TabContentTransition key={activeTab}>
            <TabsContent value="cardapio" className="w-full">
              <MenuList menus={restaurant.menus} />
            </TabsContent>
          </TabContentTransition>
          {/* promo */}
          <TabContentTransition tabValue="promo">
            <TabsContent value="promo" className="w-full">
              Promo
            </TabsContent>
          </TabContentTransition>
          {/* sacola */}
          <TabContentTransition tabValue="sacola">
            <TabsContent value="sacola" className="w-full">
              Sacola
            </TabsContent>
          </TabContentTransition>
        </div>
        <div className="sm:col-span-4">Sacola vazia</div>
      </div>
    </Tabs>
  )
}

export default MenuTabs