import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { HeaderWrapper } from "./components/header-wrapper"
import { SuperCoinProvider } from "@/contexts/supercoin-context"
import { BookingsProvider } from "@/contexts/bookings-context"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Peerly - Learn from Peers, Teach your Passion",
  description: "Connect with fellow students to share knowledge, learn new skills, and grow together in a collaborative learning environment.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SuperCoinProvider>
          <BookingsProvider>
            <HeaderWrapper />
            {children}
            <Toaster />
          </BookingsProvider>
        </SuperCoinProvider>
      </body>
    </html>
  )
}
