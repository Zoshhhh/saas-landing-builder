import type React from "react";
import Image from "next/image"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserCircle, HelpCircle, Settings } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";

export function AppNavbar() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentState = localStorage.getItem("dashboardState");
    if (currentState) {
      sessionStorage.setItem("tempDashboardState", currentState);
    }
    router.push("/dashboard");
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* ✅ Logo et titre */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="QuickLaunch Logo"
              width={48}
              height={48}
              className="rounded-full"
              priority
            />
            <span className="text-2xl font-bold text-gray-900">QuickLaunch</span>
          </Link>

          {/* ✅ Boutons de navigation */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
              <Link href="/" prefetch={false}>Home</Link>
            </Button>

            <Button variant="ghost" asChild className="px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
              <Link href="/documentation" prefetch={false}>
                <HelpCircle className="mr-2 h-5 w-5" />
                Documentation
              </Link>
            </Button>

            <Button variant="ghost" asChild className="px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
              <Link href="https://discord.gg/AghFzcHnYn" target="_blank" rel="noopener noreferrer">
                <Settings className="mr-2 h-5 w-5" />
                Support
              </Link>
            </Button>

            {/* ✅ Gestion de l'authentification */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-50">
                  <UserCircle className="mr-2 h-5 w-5" />
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
