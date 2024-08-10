import { Outfit } from "next/font/google"
import "./globals.css"

// components
import Header from "@/components/Header"
import PageTransition from "@/components/PageTransition"
import MobileTabBar from "@/components/MobileTabBar"
import Loading from "./loading"
import { Suspense } from "react"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-outfit'
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        {/* <Header /> */}
        <Suspense fallback={<Loading />}>
          <PageTransition>{children}</PageTransition>
        </Suspense>
        {/* mobile nav */}
        <div className="xl:hidden">
          <MobileTabBar />
        </div>
      </body>
    </html>
  )
}
