import { cn } from "@mpesaflow/ui/cn";
import MainNav from "./_components/main-nav";

export default function DashboardLayout({
  children,
  params,
}: { children: React.ReactNode; params: { app_id: string } }) {
  return (
    <div className="flex flex-row w-full">
      <MainNav appId={params.app_id} />
      <div className={cn("flex flex-col gap-5 bg-muted w-full")}>
        {children}
      </div>
    </div>
  );
}
