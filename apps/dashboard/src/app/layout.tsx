import type { Metadata } from "next";
import "@mpesaflow/ui/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { PHProvider } from "@mpesaflow/analytics";
import { cn } from "@mpesaflow/ui/cn";
import { Toaster } from "@mpesaflow/ui/sonner";
import { ConvexClientProvider } from "../providers/ConvexClientProvider";
import { calSans, inter } from "../styles/fonts";
import HomeNav from "./_components/home-nav";

export const metadata: Metadata = {
  title: "Dashboard | MpesaFlow",
  description: "MpesaFlow Dashboard with Analytics",
};

export default function RootLayout({
  children,
  params,
}: { children: React.ReactNode; params: { app_id: string } }) {
  return (
    <ClerkProvider>
      <PHProvider>
        <ConvexClientProvider>
          <html lang="en">
            <body
              className={cn(
                "min-h-screen antialiased w-full bg-background  flex flex-col text-foreground font-inter",
                inter.variable,
                calSans.variable,
              )}
            >
              <Toaster />
              <header>
                <HomeNav appId={params.app_id} />

              </header>
              <main>{children}</main>
            </body>
          </html>
        </ConvexClientProvider>
      </PHProvider>
    </ClerkProvider>
  );
}
