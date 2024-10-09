"use client";

import Logo from "@//components/logo";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "@mpesaflow/ui/button";
import { cn } from "@mpesaflow/ui/cn";
import { Icons } from "@mpesaflow/ui/icons";
import Link from "next/link";

export default function TopNav() {
  return (
    <nav className={cn("border-b border-gray-200 w-full bg-white")}>
      <div className="flex flex-row justify-between w-full mx-auto items-center px-4 py-2">
        <Link href="/">
          <h1>
            <Logo className="size-5" />
          </h1>
        </Link>
        <div className="flex flex-row gap-8 items-center">
          <Button className="flex flex-row items-center">
            <Icons.feedback className="size-4 mr-2" />
            Feedback
          </Button>
          <h1>Docs</h1>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
