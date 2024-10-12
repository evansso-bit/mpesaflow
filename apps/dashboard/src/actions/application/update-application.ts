"use server";

import { auth } from "@clerk/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";;
import { api } from "../../../convex/_generated/api";


// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function updateApplicationAction(prevState: any, formData: FormData) {
    const appId = formData.get("appId") as string;
    const consumerKey = formData.get("consumerKey") as string;
    const consumerSecret = formData.get("consumerSecret") as string;
    const passKey = formData.get("passKey") as string;
    const enviroments = formData.get("enviroment") as string;

    const appData = await fetchQuery(api.appActions.getApplicationData, {
        applicationId: appId,
    });

    const { userId } = auth();

    if (!userId) {
        return { error: "User not found, Please sign in to create an application" };
    }

    const enviromentsData = await fetchQuery(api.enviroments.getEnviroments, {
        applicationId: appId,
    });

    if (!appData) {
        return {
            error: "Application not found",
        };
    }

    await fetchMutation(api.appActions.updateApplication, {
        id: appData._id,
        ConsumerKey: consumerKey,
        ConsumerSecret: consumerSecret,
        passKey: passKey,
        enviroment: enviroments,
    });

    await fetchMutation(api.enviroments.updateEnviroment, {
        id: enviromentsData._id,
        applicationId: appId,
        enviroments: enviroments,
    })
}