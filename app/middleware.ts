import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { cookies } from "next/headers"

export async function middleware(request: NextRequest) {

  const jwt = cookies().get("jwt")

  // List of paths that require authentication
  const protectedPaths = ["/onboard", "/dashboard", "/profile"]

  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!jwt) {
      // Redirect to login page if JWT is not present
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Here you could add additional JWT verification if needed
    // For now, we're just checking if the JWT cookie exists
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/onboard/:path*", "/dashboard/:path*", "/profile/:path*"],
}

