import type React from "react"
import { Button } from "@/components/ui/button"
import { Layers, UserCircle, HelpCircle, Settings } from "lucide-react"
import Link from "next/link"
import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export function AppNavbar() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Sauvegarder l'état actuel dans sessionStorage avant de naviguer
    const currentState = localStorage.getItem("dashboardState")
    if (currentState) {
      sessionStorage.setItem("tempDashboardState", currentState)
    }
    router.push("/dashboard")
  }

  return (
      <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Layers className="h-8 w-8 text-blue-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900">QuickLaunch</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
                <Link href="/" prefetch={false}>
                  Home
                </Link>
              </Button>
              <Button variant="ghost" asChild className="px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
                <a href="/documentation" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Documentation
                </a>
              </Button>
              <Button variant="ghost" asChild className="px-4 py-2 bg-blue-100 text-[#4763FF] rounded-lg italic transform -rotate-2 hover:rotate-0 transition-transform">
                <a
                    href="https://discord.gg/AghFzcHnYn"
                    className="text-blue-500 hover:text-gray-600 transition-colors"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Support
                </a>
              </Button>
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
  )
}

