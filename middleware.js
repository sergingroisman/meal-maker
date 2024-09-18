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

  // Limpar cookies em caso de erro de autenticação
  if (user.error && user?.error?.status === 400) {
    response.cookies.set("jwt", "", { ...config, maxAge: 0 })
    response.cookies.set("user_id", "", { ...config, maxAge: 0 })
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  // Verificar se o usuário está tentando acessar o /backoffice
  if (currentPath.startsWith("/backoffice")) {
    if (!user.ok) {
      return NextResponse.redirect(new URL("/signin", request.url))
    }
    if (user.data.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url)) // Usuário logado, mas sem permissão de admin
    }
  }

  // Redirecionar não autenticados em outras rotas protegidas
  const protectedPaths = ["/pedidos", "/perfil"]
  if (protectedPaths.some(path => currentPath.startsWith(path)) && !user.ok) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  // Evitar acesso a /signup e /signin se já estiver logado
  if (currentPath.startsWith("/signup") && user.ok) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (currentPath.startsWith("/signin") && user.ok) {
    if (user.data.role === "admin") {
      return NextResponse.redirect(new URL("/backoffice", request.url))
    } else {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return response
}
