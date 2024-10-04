import { auth } from "@clerk/nextjs/server";
import { api } from "convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";
import CreateApplication from "./_components/create-application";

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    return <h1>Please sign in to view your applications</h1>;
  }

  const applications = await fetchQuery(api.appActions.getApplications, {
    userId: userId,
  });

  return (
    <div className="max-w-6xl w-full mx-auto min-h-screen">
      <h1 className="text-2xl mt-9 mb-9">Applications</h1>
      <div className="mt-9 grid auto-rows-[minmax(14rem,_1fr)] grid-cols-[repeat(1,_minmax(15rem,_1fr))] gap-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <CreateApplication />

        {applications.map((app) => (
          <Link
            className="w-full h-full border border-gray-300 rounded-2xl"
            href={`/flow/${app.applicationId}`}
            key={app._id}
          >
            <h2>{app.name}</h2>
            <p
              className={`${app.enviroment === "development" ? "bg-orange-200 text-orange-600" : "bg-green-200 text-green-700"} px-2 py-0.5 rounded-full w-fit`}
            >
              {app.enviroment}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
