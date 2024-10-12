"use server";

import { CreateUserIdentity } from "@//config/unkey/create-identity";
import { auth, currentUser } from "@clerk/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { api } from "../../../convex/_generated/api";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function createApiKeyAction(prevState: any, formData: FormData) {
	const Name = formData.get("name") as string;
	const applicationId = formData.get("applicationId") as string;

	const enviroment = await CurrentEnvironment(applicationId);

	const user = await currentUser();
	const { userId } = auth()

	const { key, KeyId } = await CreateUserIdentity({
		enviroment: enviroment,
		appId: applicationId,
		name: Name,
	});

	try {
		await fetchMutation(api.apiActions.createApiKey, {
			key: key as string,
			name: Name,
			emailAdress: user?.emailAddresses[0]?.emailAddress ?? "",
			keyId: KeyId as string,
			applicationId: applicationId,
			enviroment: [enviroment],
			userId: userId || "",
		});
		revalidatePath(`/flow/${applicationId}/api-keys`);
		return { message: "API key created successfully" };
	} catch (error) {
		console.error("Error creating API key:", error);
		return { error: "Failed to create API key" };
	}
}

async function CurrentEnvironment(app_id: string) {
  const { userId } = auth();
  const currentEnvironment = await fetchQuery(api.appActions.getCurrentEnvironment, {
    applicationId: app_id,
    userId: userId || "",
  });
  return currentEnvironment || "development";
}