
import { cn } from "@mpesaflow/ui/cn";
import "@mpesaflow/ui/globals.css";
import { Providers } from "@//providers/providers";
import { Toaster } from "@mpesaflow/ui/sonner";
import { calSans, inter } from "@mpesaflow/ui/styles/fonts";
import type { Metadata } from "next";
import TopNav from "./flow/[app_id]/_components/top-nav";

export const metadata: Metadata = {
  title: {
    template: "%s | MpesaFlow",
    default: "MpesaFlow Dashboard",
  },
  description: 'Manage your MpesaFlow applications and transactions',
  openGraph: {
    title: 'MpesaFlow Dashboard',
    description: 'Manage your MpesaFlow applications and transactions',
    images: [
      {
        url: 'https://utfs.io/f/qGGrTNysMsOSozZkqDBWfeuJD6nmvSgba1FE932XykcsVNtx',
        width: 1200,
        height: 630,
        alt: 'MpesaFlow Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MpesaFlow Dashboard',
    description: 'Manage your MpesaFlow applications and transactions',
    images: [
      {
        url: 'https://utfs.io/f/qGGrTNysMsOSozZkqDBWfeuJD6nmvSgba1FE932XykcsVNtx',
        width: 1200,
        height: 630,
        alt: 'MpesaFlow Dashboard',
      },
    ],
    site: '@mpesaflow',
    creator: '@mpesaflow',
  },
};


export default function DashboardLayout({
  children,

}: {
  children: React.ReactNode;

}) {
  return (
    <html lang="en">

      <body
        className={cn(
          "flex flex-col min-h-screen antialiased bg-background text-foreground font-inter",
          inter.variable,
          calSans.variable,
        )}
      >
        <head>
          <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <Providers>

          <Toaster richColors />

          <div className="max-w-[1152px] w-full mx-auto px-4 lg:px-8">
            <TopNav />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
