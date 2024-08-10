"use client"

// components
import Link from "next/link"
import { TbLogout2 } from "react-icons/tb"
import { FaUserEdit } from "react-icons/fa"
import { PiSignInBold } from "react-icons/pi"
import { signOut } from "next-auth/react"
import useSession from "./custom/useSession"
import useStore from "@/store/useStore"
import { logoutAction } from "@/app/data/actions/auth-actions"
import { useRouter } from "next/navigation"


const LoggedInHeader = () => {
  const { isLoggedIn } = useSession()
  const resetState = useStore((state) => state.resetState)
  const router = useRouter()

  const handleLogout = () => {
    logoutAction().then(() => {
      resetState()
      router.push("/")
    })
  }

  if (!!isLoggedIn) {
    return (
      <>
        <Link href="/perfil">
          <FaUserEdit className="h-6 w-6 text-accent" />
        </Link>
        <Link href="#" onClick={() => handleLogout()}>
          <TbLogout2 className="h-6 w-6 text-accent" />
        </Link>
      </>
    )
  }

  return (
    <>
      <Link href="/signin">
        <PiSignInBold className="h-6 w-6 text-accent" />
      </Link>
    </>
  )
}

export default LoggedInHeader