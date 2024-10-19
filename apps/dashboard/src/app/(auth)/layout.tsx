
import "@mpesaflow/ui/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@mpesaflow/ui/cn";
import { calSans, inter } from "@mpesaflow/ui/styles/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | MpesaFlow Dashboard",
  description: 'Secure login and authentication for MpesaFlow services',
  openGraph: {
    title: 'Authentication | MpesaFlow Dashboard',
    description: 'Secure login and authentication for MpesaFlow services',
    images: [
      {
        url: 'https://utfs.io/f/qGGrTNysMsOSdvImSKc21mSi3VWqw6lHvRXjpoy0OtBY4PxC',
        width: 1200,
        height: 630,
        alt: 'MpesaFlow Authentication',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authentication | MpesaFlow Dashboard',
    description: 'Secure login and authentication for MpesaFlow services',
    images: [
      {
        url: 'https://utfs.io/f/qGGrTNysMsOSdvImSKc21mSi3VWqw6lHvRXjpoy0OtBY4PxC',
        width: 1200,
        height: 630,
        alt: 'MpesaFlow Authentication',
      },
    ],
    site: '@mpesaflow',
    creator: '@mpesaflow',
  },
};

export default function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (

    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={cn(
          "flex flex-col min-h-screen antialiased w-full bg-background text-foreground font-inter",
          inter.variable,
          calSans.variable,
        )}
      >
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>

  );
}
