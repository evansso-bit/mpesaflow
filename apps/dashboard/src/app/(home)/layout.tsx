import type { Metadata } from "next";
import "@mpesaflow/ui/globals.css";
import { ConvexClientProvider } from "@//providers/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { PHProvider } from "@mpesaflow/analytics";
import { cn } from "@mpesaflow/ui/cn";
import { Toaster } from "@mpesaflow/ui/sonner";
import { calSans, inter } from "@mpesaflow/ui/styles/fonts";
import MainNav from "./_components/main-nav";

export const metadata: Metadata = {
  title: " %s | MpesaFlow",
  description: "MpesaFlow Dashboard with Analytics",
};

export default function HomeLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <PHProvider>
          <ConvexClientProvider>
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
              <link
                rel="mask-icon"
                href="/safari-pinned-tab.svg"
                color="#5bbad5"
              />
              <meta name="msapplication-TileColor" content="#da532c" />
              <meta name="theme-color" content="#ffffff" />
            </head>
            <body
              className={cn(
                "min-h-screen antialiased w-full bg-background  flex flex-col text-foreground font-inter",
                inter.variable,
                calSans.variable,
              )}
            >
              <header>
                <MainNav />
              </header>

              <div>{children}</div>
            </body>
          </ConvexClientProvider>
        </PHProvider>
      </ClerkProvider>
    </html>
  );
}
