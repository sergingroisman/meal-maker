"use server"

import { NextResponse } from "next/server"
import { getUserLoader } from "./services/api"

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 semana
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
}

export async function middleware(request) {
  const user = await getUserLoader()
  const currentPath = request.nextUrl.pathname

  const response = NextResponse.next()

  if (user.error && user?.error?.status === 400) {
    const cookies = request.cookies
    cookies.set("jwt", "", { ...config, maxAge: 0 })
    cookies.set("user_id", "", { ...config, maxAge: 0 })
    response.cookies.set("jwt", "", { ...config, maxAge: 0 })
    response.cookies.set("user_id", "", { ...config, maxAge: 0 })
  }

  if (currentPath.startsWith("/pedidos") && user?.error?.status === 400) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  if (currentPath.startsWith("/pedidos") && user.ok === false) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }
  
  if (currentPath.startsWith("/perfil") && user.ok === false) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  if (currentPath.startsWith("/signup") && user.ok === true) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (currentPath.startsWith("/signin") && user.ok === true) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return response
}