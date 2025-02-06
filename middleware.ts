import { authMiddleware } from "@clerk/nextjs"
import { clerkConfig } from "./app/clerk-config"

export default authMiddleware({
    publicRoutes: clerkConfig.publicRoutes,
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

