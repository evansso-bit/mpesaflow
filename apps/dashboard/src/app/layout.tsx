'use client'

import "@mpesaflow/ui/globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { redis } from "@mpesaflow/kv";
import { Toaster } from '@mpesaflow/ui/sonner'
import { toast } from "sonner";

import { Inter } from 'next/font/google'

import MainNav from "../components/main-nav";
import { cn } from "@mpesaflow/ui/cn";
import StripeWelcomeEmail from "../emails/welcome";
import { useUser } from "@clerk/nextjs";
import { Resend } from "resend";
import { useEffect } from "react";

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
})






export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    sendWelcomeEmail();
  }, []);
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


async function sendWelcomeEmail() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { isSignedIn, user } = useUser()
  const primaryEmail = user?.primaryEmailAddress?.emailAddress;
  const isAlreadySent = await redis.sismember('welcome-emails', primaryEmail);

  if (isSignedIn) {
    if (!isAlreadySent) {

      try {

        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: `${primaryEmail}`,
          subject: 'Welcome to MpesaFlow',
          react: StripeWelcomeEmail(),
        });


        if (error) {
          return Response.json({ error }, { status: 500 });
          toast.error('Something went wrong. Please try again later.');
        } else if (data) {
          await redis.sadd('welcome-emails', primaryEmail);
          toast.success('Welcome email sent successfully!');
        }

      } catch (error) {
        return Response.json({ error }, { status: 500 })
      }
    }
  }
}