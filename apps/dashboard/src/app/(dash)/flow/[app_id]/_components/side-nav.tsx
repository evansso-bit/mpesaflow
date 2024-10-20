"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { cn } from "@mpesaflow/ui/cn";
import { Icons } from "@mpesaflow/ui/icons";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const sideNavLinks = [
  {
    name: "Transactions",
    link: "",
    icon: Icons.transaction,
  },
  {
    name: "Analytics",
    link: "/analytics",
    icon: Icons.analytics,
  },
  {
    name: "API Keys",
    link: "/api-keys",
    icon: Icons.lock,
  }
];

export default function SideNav() {
  const pathname = usePathname();
  const params = useParams();

  if (pathname === '/flow/new' || pathname === '/') {
    return null
  }

  return (
    <nav
      className={cn(
        "w-full h-full px-3 bg-muted-foreground py-4 flex flex-col justify-between",
        pathname === "/" ? "hidden" : "",
      )}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          {sideNavLinks.map((item) => {
            const fullPath = `/flow/${params.app_id}${item.link}`;
            return (
              <Link
                key={item.name}
                className={cn(
                  "flex flex-row gap-2 border-r border-gray-500 items-center px-2 transition-all duration-500 rounded-sm py-1.5 hover:bg-muted",
                  pathname === fullPath
                    ? "bg-green-200 text-green-800 hover:bg-green-100"
                    : "text-muted-foreground hover:text-black",
                )}
                href={fullPath}
              >
                <item.icon className="w-5 h-5" />
                <p>{item.name}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
