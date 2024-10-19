
import { SidebarInset } from "@mpesaflow/ui/sidebar";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarInset>
      <div className="flex flex-1 flex-col gap-4 lg:py-8 py-4 ">
        {children}
      </div>
    </SidebarInset>
  );
}
