import { authMiddleware } from "@clerk/nextjs";
import { clerkConfig } from "./app/clerk-config";

export default authMiddleware({
    publicRoutes: clerkConfig.publicRoutes, // ✅ Garde tes routes publiques normales
    ignoredRoutes: ["/api/webhook"], // ✅ Permet à Stripe de fonctionner
});

export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/",
        "/api/user(.*)", // ✅ Garde l'accès aux routes Clerk
        "/(api|trpc)(.*)"
    ],
};