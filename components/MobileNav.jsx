"use client"

import { Sheet, SheetContent, SheetFooter, SheetTrigger } from '@/components/ui/sheet'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CiMenuFries } from 'react-icons/ci'
import { Button } from './ui/button'

const links = [
  {
    name: "cardápio",
    path: "/",
  },
  {
    name: "meus pedidos",
    path: "/meus-pedidos",
  },
  {
    name: "horários de funcionamento",
    path: "/horario-funcionamento",
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

const MobileNav = () => {
  const pathname = usePathname()
  const signSignOutBtn = (loggedIn) => {
    if (!loggedIn) {
      return (
        <Link href="/sign-in">
          <Button>Minha conta</Button>
        </Link>
      )
    }

    return (
      <Link href="/sign-out">
        <Button>Sair</Button>
      </Link>
    )
  }

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent"></CiMenuFries>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/* logo */}
        <div className="mt-16 mb-16 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Logo<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>

        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            return (
              <Link key={index} href={link.path} className={`${link.path === pathname && "text-accent border-b-2 border-accent"} capitalize font-medium hover:text-accent transition-all`}>
                {link.name}
              </Link>
            )
          })}
        </nav>

        <SheetFooter>
          <div className="flex flex-col justify-center items-center bottom-8 absolute w-full">
            {signSignOutBtn(false)}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav