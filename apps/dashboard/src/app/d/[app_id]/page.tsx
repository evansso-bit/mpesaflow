import { api } from "convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import CreateApiKey from "../../_components/create-apiKey";

export default async function AppPage({ params }: { params: { app_id: string } }) {
    const { app_id } = params;
    const { userId } = await auth();

    const app = await fetchQuery(api.appActions.getApplicationData, {
        applicationId: app_id,
    });

    const apiKeys = await fetchQuery(api.apiActions.getApiKeys, {
        applicationId: app_id,
        enviroment: app?.enviroment || "",
        userId: userId || "",
    });

    return (
        <div className="flex flex-col gap-5">
            <h1>{app?.name}</h1>
            <CreateApiKey enviroment={app?.enviroment || ""} applicationId={app_id} />
            <div className="flex flex-col gap-2">
                {apiKeys.map((key) => (
                    <div className="flex flex-row gap-4" key={key._id}>
                        <h2>{key.name}</h2>
                        <p>{key.key}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}
