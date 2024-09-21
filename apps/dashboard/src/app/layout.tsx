
import "@mpesaflow/ui/globals.css";
import { ClerkProvider } from '@clerk/nextjs'

import { Toaster } from '@mpesaflow/ui/sonner'
import { sendWelcomeEmail } from "../components/send-email";


import { Inter } from 'next/font/google'

import MainNav from "../components/main-nav";
import { cn } from "@mpesaflow/ui/cn";


const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
})


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await sendWelcomeEmail();
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header>
            <MainNav />
            <Toaster />
          </header>
          <main className={cn('min-h-screen antialiased w-full bg-background text-foreground', inter.className)}>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}


