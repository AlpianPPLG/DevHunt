import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/register", "/api/auth/login", "/api/auth/register"]
  const isPublicRoute = publicRoutes.includes(pathname)
  
  // Routes that require authentication
  const protectedRoutes = ["/dashboard", "/submit", "/settings"]
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // If no token and trying to access protected route
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If token exists, verify it
  if (token) {
    const decoded = verifyToken(token)

    // If token is invalid, clear it and redirect appropriately
    if (!decoded) {
      const response = isProtectedRoute 
        ? NextResponse.redirect(new URL("/login", request.url))
        : NextResponse.next()
      response.cookies.delete("auth-token")
      return response
    }

    // If authenticated user tries to access auth pages, redirect to dashboard
    if (decoded && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
