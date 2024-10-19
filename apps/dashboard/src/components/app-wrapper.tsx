import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@mpesaflow/ui/breadcrumb";
import { Separator } from "@mpesaflow/ui/separator";
import { SidebarInset, SidebarTrigger } from "@mpesaflow/ui/sidebar";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarInset>
      <div className="flex flex-1 flex-col gap-4 lg:py-10 py-4 lg:px-20 px-5 ">
        {children}
      </div>
    </SidebarInset>
  );
}
