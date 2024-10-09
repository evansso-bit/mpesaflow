import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import CreateApplication from "./create-application";

export default async function AppGrid() {
  const { userId } = auth();
  const data = await fetchQuery(api.appActions.getApplications, {
    userId: userId || "",
  });

  return (
    <div className="mt-9 grid auto-rows-[minmax(14rem,_1fr)] grid-cols-[repeat(1,_minmax(15rem,_1fr))] gap-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <CreateApplication />
      {data?.map((app) => (
        <Link
          className="w-full h-full flex flex-col justify-between py-2 px-1 border border-gray-300 rounded-2xl"
          href={`/flow/${app.applicationId}`}
          key={app._id}
        >
          <div >
            <h2>{app.name}</h2>
            <Link className="underline text-sm text-gray-500" href={`/flow/${app.applicationId}`} >
              {app.enviroment}
            </Link>
          </div>

          <p
            className={`${app.enviroment === "development" ? "bg-orange-200 text-orange-600" : "bg-green-200 text-green-700"} px-2 py-0.5 rounded-sm text-sm w-fit`}
          >
            {app.enviroment}
          </p>
        </Link>
      ))}
    </div>
  );
}
