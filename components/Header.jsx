import Link from "next/link";

// components
import Nav from "./Nav";
import { Button } from "./ui/button";



const Header = () => {
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
            Logo<span className="text-accent">.</span>
          </h1>
        </Link>

        {/* desktop nav & sign-in button */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        
          {signSignOutBtn(true)}
        </div>

        {/* mobile nav */}
        <div className="xl:hidden">
          mobile nav
        </div>

      </div>
    </header>
  );
}

export default Header