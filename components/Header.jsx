// components
import Link from "next/link"
import Nav from "./Nav"
import { fetchBff, getAuthToken } from "@/services/api"
import { TbLogout2 } from "react-icons/tb"
import DesktopBagSheet from "./DesktopBagSheet"
import { FaUserEdit } from "react-icons/fa"
import { PiSignInBold } from "react-icons/pi"
import { signOut } from "next-auth/react"
import LoggedInHeader from "./LoggedInHeader"

const Header = async () => {
  const partner = await fetchBff()

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
          <LoggedInHeader />
          <DesktopBagSheet />
        </div>
      </div>
    </header>
  )
}

export default Header