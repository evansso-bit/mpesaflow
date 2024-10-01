import type { Metadata } from "next";
import "@mpesaflow/ui/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { PHProvider } from "@mpesaflow/analytics";
import { cn } from "@mpesaflow/ui/cn";
import { Toaster } from "@mpesaflow/ui/sonner";
import { Inter } from "next/font/google";
import MainNav from "../components/main-nav";
import { ConvexClientProvider } from "../providers/ConvexClientProvider";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard | MpesaFlow",
  description: "MpesaFlow Dashboard with Analytics",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <PHProvider>
        <ConvexClientProvider>
          <html lang="en">
            <body className="flex flex-row w-full">
              <header>
                <Toaster />
              </header>
              <main
                className={cn(
                  "min-h-screen antialiased w-full bg-background text-foreground",
                  inter.className,
                )}
              >
                {children}
              </main>
            </body>
          </html>
        </ConvexClientProvider>
      </PHProvider>
    </ClerkProvider>
  );
}
