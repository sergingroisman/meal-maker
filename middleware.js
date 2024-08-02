import { NextResponse } from "next/server"
import { getUserLoader } from "./services/api"

export async function middleware(request) {
  const user = await getUserLoader()
  const currentPath = request.nextUrl.pathname

  if (currentPath.startsWith("/pedidos") && user.ok === false) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  if (currentPath.startsWith("/signup") && user.ok === true) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (currentPath.startsWith("/signin") && user.ok === true) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}