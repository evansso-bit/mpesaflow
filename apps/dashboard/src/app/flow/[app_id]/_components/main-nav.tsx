"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { cn } from "@mpesaflow/ui/cn";
import { Icons } from "@mpesaflow/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainNav({ appId }: { appId: string }) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "w-[350px] px-3 bg-white py-4 h-screen   border-border bg-background flex flex-col justify-between",
        pathname === "/" ? "hidden" : "",
      )}
      style={{ position: "relative", zIndex: 10 }} // Add position: relative and z-index
    >
      <div className="flex flex-col gap-5">
        <h1>MpesaFlow</h1>
        <div className="flex flex-col gap-3">
          <Link
            className={cn(
              "flex flex-row gap-2 items-center px-2 rounded-lg hover:bg-muted",
              pathname === `/flow/${appId}` ? "bg-green-500 " : "",
            )}
            href={`/d/${appId}`}
          >
            <Icons.transaction className="w-5 h-5" />
            <p>Transactions</p>
          </Link>

          <Link
            className={cn(
              "flex flex-row gap-2 items-center px-2 rounded-lg hover:bg-muted",
              pathname === `/d/${appId}/api-keys` ? "bg-muted " : "",
            )}
            href={`/flow/${appId}/api-keys`}
          >
            <Icons.lock className="w-5 h-5" />
            <p>API Keys</p>
          </Link>
        </div>
      </div>

      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}