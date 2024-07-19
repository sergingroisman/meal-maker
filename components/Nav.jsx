"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  {
    name: "cardápio",
    path: "/",
  },
  {
    name: "pedidos",
    path: "/meus-pedidos",
  },
  {
    name: "horário",
    path: "/horario-funcionamento",
  },
  {
    name: "taxa de entrega",
    path: "/taxa-entrega",
  },
  {
    name: "formas de pagamento",
    path: "/formas-pagamento",
  },
  {
    name: "Whatsapp",
    path: "/fale-conosco",
  },
]

const Nav = () => {
  const pathname = usePathname()

  return <nav className="flex gap-8">
    {links.map((link, index) => {
      return (
        <Link 
          href={link.path}
          key={index}
          className={`${link.path === pathname && "text-accent border-b-2 border-accent"} capitalize font-medium hover:text-accent transition-all`}>
          {link.name}
        </Link>
      )
    })}
  </nav>
}

export default Nav