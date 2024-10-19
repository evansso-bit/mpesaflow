import type { Metadata } from "next";
import "@mpesaflow/ui/globals.css";
import { Providers } from "@//providers/providers";
import { cn } from "@mpesaflow/ui/cn";
import { Toaster } from "@mpesaflow/ui/sonner";
import { calSans, inter } from "@mpesaflow/ui/styles/fonts";



export const metadata: Metadata = {
  title: {
    template: "%s | MpesaFlow Dashboard",
    default: "Command Center | MpesaFlow Dashboard",
  },
  description: "Manage transactions, analyze data, and optimize your M-Pesa integrations in one powerful dashboard.",
  openGraph: {
    title: "MpesaFlow",
    description: "Manage transactions, analyze data, and optimize your M-Pesa integrations in one powerful dashboard.",
    images: [
      {
        url: "https://utfs.io/f/qGGrTNysMsOSIr2gQD33Of1dHwtC0VqYaS9LyiT2DXeWkMmK",
        width: 1200,
        height: 630,
        alt: "MpesaFlow",
      },
    ],
    siteName: "MpesaFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "MpesaFlow",
    description: "Manage transactions, analyze data, and optimize your M-Pesa integrations in one powerful dashboard.",
    images: [
      {
        url: "https://utfs.io/f/qGGrTNysMsOSIr2gQD33Of1dHwtC0VqYaS9LyiT2DXeWkMmK",
        width: 1200,
        height: 630,
        alt: "MpesaFlow",
      },
    ],
    site: "@MpesaFlow",
  },
};

export default function HomeLayout({
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
          "min-h-screen antialiased w-full bg-background  flex flex-col text-foreground font-inter",
          inter.variable,
          calSans.variable,
        )}
      >
        <Providers>
          <header>
            <Toaster richColors />
          </header>

          <div className="max-w-[1152px] mx-auto px-4 lg:px-8">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
