import { Skeleton } from "@mpesaflow/ui/skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import AppGrid from "./_components/app-grid";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  return (
    <div className="flex flex-col max-w-[1152px] w-full mx-auto gap-5 lg:px-8 px-4">
      <div className="flex flex-col gap-2">
        <h1 className="lg:text-2xl text-xl">Applications</h1>
        <p className="text-gray-500">Manage your applications</p>
      </div>

      <Suspense fallback={<Skeleton className="w-full h-[350px]" />}>
        <AppGrid />
      </Suspense>
    </div>
  );
}
