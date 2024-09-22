'use client'

import { SignedIn, UserButton } from "@clerk/nextjs";
import { cn } from "@mpesaflow/ui/cn";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const pathname = usePathname();
  return (
    <nav className={cn('w-[350px] px-3 py-4 min-h-screen border-r border-border bg-background flex flex-col justify-between', pathname === '/' && 'hidden')}>
      <div className="flex flex-row gap-4">
        <h1>MpesaFlow</h1>
      </div>

      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
