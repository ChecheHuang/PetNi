import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'

import { ThemeProvider } from '@/components/providers/themeProvider'
import ToastProvider from '@/components/providers/toastProvider'
import TrpcProvider from '@/components/providers/trpcProvider'
import { cn } from '@/lib/utils'

import './globals.css'

const inter = Noto_Sans_TC({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PetNi',
  description: '寵物收養系統',
}

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(inter.className, ' min-h-screen w-full bg-[#f8f8f8]')}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TrpcProvider>
            {authModal}
            {children}
            <ToastProvider />
          </TrpcProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
