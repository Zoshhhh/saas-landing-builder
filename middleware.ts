import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/api/webhook",
        "/api/stripe/webhook", // ✅ Vérifie que le webhook Stripe est bien public
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
        "/api/user(.*)",
        "/(api|trpc)(.*)",
    ],
};