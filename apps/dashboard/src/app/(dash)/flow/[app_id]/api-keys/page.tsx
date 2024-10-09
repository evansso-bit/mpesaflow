import { auth } from "@clerk/nextjs/server";
import { Button } from "@mpesaflow/ui/button";
import { cn } from "@mpesaflow/ui/cn";
import { Icons } from "@mpesaflow/ui/icons";
import { Skeleton } from "@mpesaflow/ui/skeleton";
import { api } from "convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ApiKeysTable from "./_components/apiKeys-table";
import CreateApiKey from "./_components/create-apiKey";

export const metadata: Metadata = {
  title: "API Keys",
};

export default async function AppPage({
  params,
}: {
  params: { app_id: string };
}) {
  const { app_id } = params;
  console.log(app_id);
  const { userId } = auth();

  const app = await fetchQuery(api.appActions.getApplicationData, {
    applicationId: app_id,
  });

  const data = await fetchQuery(api.apiActions.getApiKeys, {
    applicationId: app_id || "",
    enviroment: app?.enviroment || "",
    userId: userId || "",
  });

  return (
    <div className="w-full min-h h-screen flex flex-col gap-9">
      <div className="flex flex-row w-full h-fit justify-between">
        <h1 className="text-2xl">API Keys</h1>

        <div
          className={cn("flex flex-row gap-7", data.length === 0 && "hidden")}
        >
          <CreateApiKey
            enviroment={app?.enviroment || ""}
            applicationId={params.app_id}
          />

          <Link href="https://docs.mpesaflow.com" target="_blank">
            <Button className="flex flex-row  items-center" variant="secondary">
              <Icons.code className="w-5 h-5 mr-2" />
              API
            </Button>
          </Link>
        </div>
      </div>

      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <ApiKeysTable
          appId={params.app_id}
          enviroment={app?.enviroment || ""}
          userId={userId || ""}
        />
      </Suspense>
    </div>
  );
}
