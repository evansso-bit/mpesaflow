import type { Metadata } from "next";
import "@mpesaflow/ui/globals.css";
import { ConvexClientProvider } from "@//providers/ConvexClientProvider";
import { calSans, inter } from "@//styles/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { PHProvider } from "@mpesaflow/analytics";
import { cn } from "@mpesaflow/ui/cn";
import { Toaster } from "@mpesaflow/ui/sonner";
import HomeNav from "./_components/home-nav";

export const metadata: Metadata = {
  title: "Dashboard | MpesaFlow",
  description: "MpesaFlow Dashboard with Analytics",
};

export default function HomeLayout({
  children,
  params,
}: { children: React.ReactNode; params: { app_id: string } }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <PHProvider>
          <ConvexClientProvider>
            <body
              className={cn(
                "min-h-screen antialiased w-full bg-background  flex flex-col text-foreground font-inter",
                inter.variable,
                calSans.variable,
              )}
            >
              <header>
                <HomeNav />
              </header>

              <main>{children}</main>
            </body>
          </ConvexClientProvider>
        </PHProvider>
      </ClerkProvider>
    </html>
  );
}
