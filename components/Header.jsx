import Link from "next/link";

// components
import Nav from "./Nav";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
import { IoLogoWhatsapp } from "react-icons/io"
import { fetchRestaurant } from "@/services/api";

const Header = async () => {
  const restaurant = await fetchRestaurant();
  
  console.log(restaurant)
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
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href="/">
          <h1 className="text-3xl font-semibold">
            {restaurant.name || "Logo"}<span className="text-accent">.</span>
          </h1>
        </Link>

        {/* desktop nav & sign-in button */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Button
            variant="outline"
            size="md"
            className="flex items-center gap-2">
            <span className="text-sm">Whatsapp</span>
            <IoLogoWhatsapp className="text-md" />
          </Button>
          {signSignOutBtn(true)}
        </div>

        {/* mobile nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>

      </div>
    </header>
  );
}

export default Header