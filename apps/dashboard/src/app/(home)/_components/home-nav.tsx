"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { cn } from "@mpesaflow/ui/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeNav() {
  const pathname = usePathname();

  // Check if the current path starts with "/flow"
  if (pathname.startsWith("/flow")) {
    return null; // Do not render the component
  }

  return (
    <nav className={cn("border-b border-gray-200 w-full")}>
      <div className="flex flex-row justify-between w-full max-w-7xl mx-auto items-center px-4 py-2">
        <Link href="/">
          <h1>MpesaFlow</h1>
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
