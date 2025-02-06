import { SidebarProvider } from "@/components/ui/sidebar";
import { auth, currentUser } from "@clerk/nextjs";
import { UserWrapper } from "@/context/UserContext";
import { getCurrentUser } from "@/lib/api/getCurrent";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { getToken } = auth();
    const token = await getToken();
    const clerkUser = await currentUser();

    console.log("Clerk user:", clerkUser ? "authenticated" : "not authenticated");

    if (!token || !clerkUser) {
      console.log("No token or Clerk user, redirecting to sign-in");
      redirect("/sign-in");
    }

    let user;
    try {
      user = await getCurrentUser(token);
      console.log("User data from API:", user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Vous pouvez choisir de rediriger vers une page d'erreur ou de connexion
      redirect("/error");
    }

    if (!user) {
      console.error("No user data returned from API");
      redirect("/error");
    }

    if (user.isActive === false) {
      console.log("User is not active, redirecting to Stripe");
      redirect("https://buy.stripe.com/fZecNodqxbxE8rS6oo");
    }

    console.log("User is active, rendering dashboard");
    return (
      <UserWrapper initialData={user}>
        <SidebarProvider>
          <div className="flex w-full">
            <main className="flex-grow w-[calc(100%-240px)]">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </UserWrapper>
    );
  } catch (error) {
    console.error("Unexpected error in layout:", error);
    redirect("/error");
  }
}