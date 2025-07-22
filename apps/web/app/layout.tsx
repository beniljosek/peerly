import type { Metadata } from 'next'
import './globals.css'
import { HeaderWrapper } from './components/header-wrapper'
import { Toaster } from 'sonner'
import { SuperCoinProvider } from '@/contexts/supercoin-context'

export const metadata: Metadata = {
  title: 'Peerly - Learn from Peers, Teach your Passion',
  description: 'Connect with fellow students to share knowledge, learn new skills, and grow together in a collaborative learning environment.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SuperCoinProvider>
          <HeaderWrapper />
          {children}
          <Toaster />
        </SuperCoinProvider>
      </body>
    </html>
  )
}
