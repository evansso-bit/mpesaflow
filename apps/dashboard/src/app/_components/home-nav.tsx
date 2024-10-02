"use client";

import { cn } from "@mpesaflow/ui/cn";
import { usePathname } from "next/navigation";

import { SignedIn, UserButton } from "@clerk/nextjs";

export default function HomeNav({ appId }: { appId: string }) {
  const pathname = usePathname();
  return (
    <nav className={cn("w-full", pathname.startsWith(`/flow/${appId}`) ? "hidden" : "")}>
      <div className="w-[350px] px-3 py-4 h-fit border-r border-border bg-background flex flex-row justify-between">
        <div className="max-w-6xl mx-auto py-3">
          <div className="flex flex-row w-full justify-between items-center">
            <h1 className="font-cal">MpesaFlow</h1>
            <div>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
