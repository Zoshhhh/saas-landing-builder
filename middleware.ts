import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from "next/server"

const publicRoutes = ["/", "/sign-in", "/sign-up", "/pricing", "/features", "/api/user/get-current"]
const isProtectedRoute = (path: string) => !publicRoutes.some((route) => path.startsWith(route))

export default authMiddleware(async ({ auth, request }) => {
  const path = request.nextUrl.pathname

  if (!auth.userId && isProtectedRoute(path)) {
    console.log(`Access denied for route: ${path}`)
    const signInUrl = new URL("/sign-in", request.url)
    signInUrl.searchParams.set("redirect_url", request.url)
    return NextResponse.redirect(signInUrl)
  }

  // Si l'utilisateur est authentifié et essaie d'accéder à /sign-in ou /sign-up, redirigez-le vers /dashboard
  if (auth.userId && (path === "/sign-in" || path === "/sign-up")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

