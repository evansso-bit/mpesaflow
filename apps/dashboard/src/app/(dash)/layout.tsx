
import { cn } from "@mpesaflow/ui/cn";
import SideNav from "./flow/[app_id]/_components/side-nav";
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
};


export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { appId: string };
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
        <Providers>
          <div className="flex flex-col h-screen ">
            <div className="fixed top-0 left-0 right-0 z-50">
              <TopNav appId={params.appId} />
            </div>
            <div className="flex flex-1 pt-16">
              <div className="fixed left-0 top-16 bottom-0 w-[350px] z-40">
                <SideNav />
              </div>
              <main className="flex-1 ml-[350px] bg-[#f7f7f7] p-6 overflow-y-auto">
                <Toaster richColors />
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
