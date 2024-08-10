import AdminSideBar from "@/components/AdminSideBar"
import PageTransition from "@/components/PageTransition"
import { Suspense } from "react"
import Loading from "../loading"

export default function BackofficeLayout({ children }) {
  return (
    <div className="flex">
      <AdminSideBar />
      <div className="h-full w-full">
        <Suspense fallback={<Loading />}>
          <PageTransition>{children}</PageTransition>
        </Suspense>
      </div>
    </div>
  )
}