"use server";

import { CreateUserIdentity } from "@//config/unkey/create-identity";
import { verifyIdentity } from "@//config/unkey/verify-identity";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function createApiKeyAction(prevState: any, formData: FormData) {
	const Name = formData.get("name") as string;
	const applicationId = formData.get("applicationId") as string;
	const environment = formData.get("enviroment") as string;
	const { userId } = await auth();

	const user = await currentUser();

	if (!user && !userId) {
		return {
			error: "Please sign in to create an API key",
		};
	}

	const { key, KeyId } = await CreateUserIdentity();

	const { error, valid } = await verifyIdentity(key);

	if (error) {
		return {
			error: error,
		};
	}

	try {
		await fetchMutation(api.apiActions.createApiKey, {
			key: key,
			userId: userId || "",
			name: Name,
			emailAdress: user?.emailAddresses[0]?.emailAddress ?? "",
			keyId: KeyId,
			applicationId: applicationId,
			enviroment: environment,
		});
		revalidatePath(`/flow/${applicationId}/api-keys`);
		return { message: "API key created successfully" };
	} catch (error) {
		console.error("Error creating API key:", error);
		return { error: "Failed to create API key" };
	}
}
