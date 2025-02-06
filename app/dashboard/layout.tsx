import { SidebarProvider } from "@/components/ui/sidebar";
import { auth, currentUser } from "@clerk/nextjs";
import { UserWrapper } from "@/context/UserContext";
import { getCurrentUser } from "@/lib/api/getCurrent";
import { redirect } from "next/navigation";

const STRIPE_PAYMENT_URL = "https://buy.stripe.com/fZecNodqxbxE8rS6oo";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { getToken } = auth();
    const token = await getToken();
    const clerkUser = await currentUser();

    if (!token || !clerkUser) {
      redirect("/sign-in");
    }

    const user = await getCurrentUser(token);

    if (!user?.isActive) {
      redirect(STRIPE_PAYMENT_URL);
    }

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
    console.error("Erreur dans le layout du dashboard:", error);
    redirect("/sign-in");
  }
}