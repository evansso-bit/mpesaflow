"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { cn } from "@mpesaflow/ui/cn";
import { Icons } from "@mpesaflow/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

export default function FlowNav() {
  const pathname = usePathname();
  const params = useParams();


  return (
    <nav
      className={cn(
        "w-3/12 px-3 bg-white py-4 h-screen  flex flex-col justify-between",
        pathname === "/" ? "hidden" : "",
      )}
      style={{ position: "relative", zIndex: 10 }} // Add position: relative and z-index
    >
      <div className="flex flex-col gap-5">
        <h1>MpesaFlow</h1>
        <div className="flex flex-col gap-3">
          <Link
            className={cn(
              "flex flex-row gap-2 items-center px-2 rounded py-1 hover:bg-muted",
              pathname === `/flow/${params.app_id}`
                ? "bg-green-200 text-green-600"
                : "",
            )}
            href={`/flow/${params.app_id}`}
          >
            <Icons.transaction className="w-5 h-5" />
            <p>Transactions</p>
          </Link>

          <Link
            className={cn(
              "flex flex-row gap-2 items-center px-2 py-1 rounded hover:bg-muted",
              pathname === `/flow/${params.app_id}/api-keys` ? "bg-muted " : "",
            )}
            href={`/flow/${params.app_id}/api-keys`}
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
