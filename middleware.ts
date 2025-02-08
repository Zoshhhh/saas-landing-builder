import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/", 
    "/about",
    "/pricing",
    "/contact",
    "/api/webhook",
    "/api/stripe/webhook", 
  ],
  ignoredRoutes: [
    "/api/webhook",
    "/api/stripe/webhook",
  ],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", 
    "/dashboard(.*)", 
    "/account(.*)", 
    "/api/user(.*)",
    "/(api|trpc)(.*)",
    "/api/stripe-webhook",
  ],
};
