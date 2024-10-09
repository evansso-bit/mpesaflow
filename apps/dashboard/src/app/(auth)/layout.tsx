import { ClerkProvider } from "@clerk/nextjs";
import "@mpesaflow/ui/globals.css";
import { cn } from "@mpesaflow/ui/cn";
import { calSans, inter } from "@mpesaflow/ui/styles/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | MpesaFlow",
};

export default function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </head>
        <body
          className={cn(
            "flex flex-col min-h-screen antialiased w-full bg-background text-foreground font-inter",
            inter.variable,
            calSans.variable,
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
