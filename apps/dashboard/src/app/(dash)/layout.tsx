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
