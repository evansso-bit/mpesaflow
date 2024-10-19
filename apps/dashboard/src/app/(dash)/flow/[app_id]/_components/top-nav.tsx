"use client";


import { cn } from "@mpesaflow/ui/cn";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@mpesaflow/ui/breadcrumb";
import { Separator } from "@mpesaflow/ui/separator";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";



export default function TopNav() {
  const pathname = usePathname();
  const params = useParams<{ app_id: string }>();
  const app_id = params.app_id;

  const navs = [
    {
      name: 'Transactions',
      href: `/flow/${app_id}/`
    },
    {
      name: 'Analytics',
      href: `/flow/${app_id}/analytics`
    },
    {
      name: 'API keys',
      href: `/flow/${app_id}/api-keys`
    }
  ]
  return (
    <nav className="flex flex-col gap-4 mb-10">
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            {navs.filter(nav => pathname.includes(nav.href)).map((nav, index) => (
              <BreadcrumbItem key={nav.name}>
                <BreadcrumbLink href={nav.href}>{nav.name}</BreadcrumbLink>
                {index < navs.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-row gap-2">
        {navs.map((nav, index) => (
          <Link key={nav.name} href={nav.href} className={cn("text-gray-500", pathname === nav.href ? "text-black" : "")}>
            {nav.name}
          </Link>
        ))}
      </div>
      <Separator orientation="horizontal" className="w-full" />
    </nav>
  );
}
