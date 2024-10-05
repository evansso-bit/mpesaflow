import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@mpesaflow/ui/cn";
import FlowNav from "./flow/[app_id]/_components/flow-nav";
import "@mpesaflow/ui/globals.css";

export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-row w-full">
        <ClerkProvider>
          <head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
          </head>
          <FlowNav />
          <div
            className={cn(
              "flex flex-col gap-5 bg-[#f7f7f7] w-9/12 antialiased min-h-screen",
            )}
          >
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
