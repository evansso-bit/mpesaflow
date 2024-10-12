"use client";


import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "@mpesaflow/ui/button";
import { cn } from "@mpesaflow/ui/cn";
import { Icons } from "@mpesaflow/ui/icons";
import Link from "next/link";
import { EnvironmentSelect } from "./enviroment-switch";


export default function TopNav({ appId }: { appId: string }) {
  return (
    <nav className={cn("border-b border-gray-200 w-full bg-white")}>
      <div className="flex flex-row justify-between w-full mx-auto items-center px-4 py-2">

        <div className="flex items-center gap-3">
          <Link className="text-xl text-[]" href="/">
            <h1>
              MpesaFlow

            </h1>
          </Link>

          <EnvironmentSelect appId={appId} />
        </div>

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
