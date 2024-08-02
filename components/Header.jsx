// components
import Link from "next/link"
import Nav from "./Nav"
import { Button } from "./ui/button"
import { fetchBff, getAuthToken } from "@/services/api"
import { TbLogout2 } from "react-icons/tb"
import DesktopBagSheet from "./DesktopBagSheet"

const Header = async () => {
  const partner = await fetchBff()
  
  const signSignOutBtn = async () => {
    const { token } = await getAuthToken()
    if (!token) {
      return
    }

    return (
      <Link href="/signout">
        <TbLogout2 className="h-6 w-6 text-accent" />
      </Link>
    )
  }

  return (
    <header className="py-8 text-primary border-b border-muted">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            {partner.name || "Logo"}<span className="text-accent">.</span>
          </h1>
        </Link>

        {/* desktop nav & sign-in button */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          {signSignOutBtn(true)}
          <DesktopBagSheet />
        </div>
      </div>
    </header>
  )
}

export default Header