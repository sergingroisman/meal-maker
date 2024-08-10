"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { PiNotepad } from "react-icons/pi"
import { BiFoodMenu } from "react-icons/bi"
import { CiCircleList } from "react-icons/ci"
import { TbLogout2 } from "react-icons/tb"
import backofficeStore from "@/store/backofficeStore"
import { usePathname } from "next/navigation"

const AdminSideBar = () => {
  const pathname = usePathname()
  const data = backofficeStore((state) => state.data)

  return (
    <aside className="w-64 bg-gray-200 text-gray-800 flex flex-col fixed h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <span className="text-lg font-semibold">Dashboard</span>
      </div>
      <nav className="flex-1 p-4 space-y-2 border-r border-gray-300">
        <Link href="/backoffice" className={`block p-2 rounded-md ${pathname === "/backoffice" && "bg-gray-300"}`} prefetch={false}>
          <PiNotepad className="w-5 h-5 inline-block mr-2" />
          Pedidos
            {data.quantityPendent > 0 && (
              <Badge variant="secondary" className="ml-2 bg-accent text-white">
                {data.quantityPendent}
              </Badge>
            )}
        </Link>
        <Link href="/cardapios" className={`block p-2 rounded-md ${pathname === "/cardapios" && "bg-gray-300"}`} prefetch={false}>
          <BiFoodMenu className="w-5 h-5 inline-block mr-2" />
          Cardápios
        </Link>
        <Link href="/acompanhamentos" className={`block p-2 rounded-md ${pathname === "/acompanhamentos" && "bg-gray-300"}`} prefetch={false}>
          <CiCircleList className="w-5 h-5 inline-block mr-2" />
          Acompanhamentos
        </Link>
        <Link href="#" className="block p-2 rounded-md" prefetch={false}>
          <TbLogout2 className="w-5 h-5 inline-block mr-2" />
          Sair
        </Link>
      </nav>
    </aside>
  )
}

export default AdminSideBar