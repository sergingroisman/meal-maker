import { NextResponse } from "next/server"
import { getUserLoader } from "./services/api"

export async function middleware(request) {
  const user = await getUserLoader()
  const currentPath = request.nextUrl.pathname

  if (currentPath.startsWith("/meus-pedidos") && user.ok === false) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  return NextResponse.next()
}