import { auth } from "@clerk/nextjs/server";
import { api } from "convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";
import CreateApplication from "./_components/create-application";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return <h1>Please sign in to view your applications</h1>;
  }

  const applications = await fetchQuery(api.appActions.getApplications, {
    userId: userId,
  });

  return (
    <div>
      <h1>MpesaFlow Dashboard</h1>
      <div className="grid grid-cols-4 gap-5">
        <CreateApplication />

        {applications.map((app) => (
          <Link
            className="p-20 border border-gray-600 rounded-2xl"
            href={`/d/${app.applicationId}`}
            key={app._id}
          >
            <h2>{app.name}</h2>
            <p
              className={`${app.environment === "development" ? "bg-orange-200 text-orange-600" : "bg-green-200 text-green-700"} px-2 py-0.5 rounded-full w-fit`}
            >
              {app.environment}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
