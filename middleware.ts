import { authMiddleware } from "@clerk/nextjs"
import { clerkConfig } from "./app/clerk-config"

export default authMiddleware({
    publicRoutes: [
        ...clerkConfig.publicRoutes,
        "/api/user/get-current",
        "/",
        "/sign-in",
        "/sign-up",
        "/pricing",
        "/get-started"
    ],
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}