import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import type { Metadata } from "next";
import { api } from "../../../../../convex/_generated/api";
import DataTable from "./_components/payments/table/data-table";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function AppPage({
  params,
}: {
  params: { app_id: string };
}) {
  const environment = await CurrentEnvironment(params.app_id);

  const { userId } = auth();
  const getApiKeys = await fetchQuery(api.apiActions.getApiKeys, {
    applicationId: params.app_id,
    enviroment: [environment],
    userId: userId || "",
  });

  const keyId = getApiKeys?.[0]?.keyId;


  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-2xl">Transactions</h1>

      <DataTable KeyId={keyId as string} />

    </div>
  );
}


async function CurrentEnvironment(app_id: string) {
  const { userId } = auth();
  const currentEnvironment = await fetchQuery(api.appActions.getCurrentEnvironment, {
    applicationId: app_id,
    userId: userId || "",
  });
  return currentEnvironment || "development";
}