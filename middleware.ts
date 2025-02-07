import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // ✅ Définir les pages accessibles sans authentification
  publicRoutes: [
    "/", // ✅ La landing page doit être accessible sans login
    "/about",
    "/pricing",
    "/contact",
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
    "/((?!.+\\.[\\w]+$|_next).*)", // ✅ Filtrer toutes les routes sauf les fichiers statiques
    "/dashboard(.*)", // ✅ Appliquer l'auth sur tout ce qui concerne le dashboard
    "/account(.*)", // ✅ Sécurise également une éventuelle page "account"
    "/api/user(.*)",
    "/(api|trpc)(.*)",
    "/api/stripe-webhook",
  ],
};
