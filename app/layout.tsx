import "@/styles/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Landing Page Generator",
  description: "Create beautiful landing pages with ease",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <html lang="en" className="h-full">
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <div className="flex-1 flex flex-col">{children}</div>
      </body>
      </html>
  )
}

