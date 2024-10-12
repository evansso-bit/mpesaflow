"use client";


import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "@mpesaflow/ui/button";
import { cn } from "@mpesaflow/ui/cn";
import { Icons } from "@mpesaflow/ui/icons";
import Link from "next/link";
import AppsSelect from "./apps-select";
import { EnvironmentSelect } from "./enviroment-switch";


export default function TopNav({ appId }: { appId: string }) {
  return (
    <nav className={cn("border-b border-gray-200 w-full bg-white px-4")}>
      <div className="flex flex-row justify-between w-full mx-auto items-center py-2">

        <div className="flex items-center gap-5">
          <Link className="text-xl font-semibold" href="/">
            MpesaFlow
          </Link>
          <Icons.slash className="size-5 text-black" />
          <AppsSelect />
          <Icons.slash className="size-5 text-black" />
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
