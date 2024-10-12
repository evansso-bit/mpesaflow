"use server";

import { CreateUserIdentity } from "@//config/unkey/create-identity";
import { auth, currentUser } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { api } from "../../../convex/_generated/api";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function createApiKeyAction(prevState: any, formData: FormData) {
	const Name = formData.get("name") as string;
	const applicationId = formData.get("applicationId") as string;

	const environment = formData.get("enviroment") as string;

	const user = await currentUser();
	const { userId } = auth()

	const { key, KeyId } = await CreateUserIdentity({
		enviroment: environment,
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
			enviroment: [environment],
			userId: userId || "",
		});
		revalidatePath(`/flow/${applicationId}/api-keys`);
		return { message: "API key created successfully" };
	} catch (error) {
		console.error("Error creating API key:", error);
		return { error: "Failed to create API key" };
	}
}
