import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import type { Metadata } from "next";
import { api } from "../../../../../convex/_generated/api";
import { useCurrentEnvironment } from "./_components/enviroment-switch";
import DataChart from "./_components/payments/chart/data-chart";
import DataTable from "./_components/payments/table/data-table";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function AppPage({
  params,
}: {
  params: { app_id: string };
}) {
  const { enviroment } = useCurrentEnvironment();
  const { userId } = auth();
  const getApiKeys = await fetchQuery(api.apiActions.getApiKeys, {
    applicationId: params.app_id,
    enviroment: [enviroment],
    userId: userId || "",
  });

  const keyId = getApiKeys?.[0]?.keyId;


  return (
    <div className="flex flex-col gap-5 w-full">
      <h1 className="text-2xl">Transactions Overview</h1>

      <DataChart />
      <div>
        <h1 className="text-lg mb-4">Recent Transactions</h1>
        <DataTable KeyId={keyId as string} />
      </div>
    </div>
  );
}
