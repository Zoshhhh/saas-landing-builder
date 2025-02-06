import { authMiddleware } from "@clerk/nextjs";
import { clerkConfig } from "./app/clerk-config";

export default authMiddleware({
    publicRoutes: [
        ...clerkConfig.publicRoutes,
        "/api/webhook",
        "/api/stripe/webhook", // ✅ Assure que Stripe peut accéder au webhook
    ],
    ignoredRoutes: [
        "/api/webhook",
        "/api/stripe/webhook",
    ],
});

export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)",
        "/",
        "/api/user(.*)", // ✅ Permet aux routes Clerk de fonctionner
        "/(api|trpc)(.*)",
    ],
};