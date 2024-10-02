import { api } from "convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export default async function AppPage({
  params,
}: { params: { app_id: string } }) {
  const { app_id } = params;

  const app = await fetchQuery(api.appActions.getApplicationData, {
    applicationId: app_id,
  });

  return (
    <div className="flex flex-col gap-5">
      <h1>{app?.name}</h1>
    </div>
  );
}
