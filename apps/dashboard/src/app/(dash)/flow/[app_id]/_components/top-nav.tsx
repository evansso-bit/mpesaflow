"use client";


import { cn } from "@mpesaflow/ui/cn";
import Link from "next/link";

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
      href: `/flow/${app_id}/transactions`
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
    <nav className="flex flex-col gap-2">
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
