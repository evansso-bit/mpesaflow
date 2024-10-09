import { Skeleton } from "@mpesaflow/ui/skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import AppGrid from "./_components/app-grid";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  return (
    <div className="max-w-6xl w-full mx-auto min-h-screen">
      <h1 className="text-2xl mt-9 mb-9">Applications</h1>

      <Suspense fallback={<Skeleton className="w-full h-[350px]" />}>
        <AppGrid />
      </Suspense>
    </div>
  );
}
