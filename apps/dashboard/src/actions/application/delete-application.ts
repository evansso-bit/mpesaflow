"use server";

import { auth } from "@clerk/nextjs/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { api } from "../../../convex/_generated/api";

export async function DeleteApplicationAction(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	prevState: any,
	formData: FormData
) {
	const { userId } = auth();
	const applicationId = formData.get("applicationId") as string;

	try {
		const apiKey = await fetchQuery(api.apiActions.getApiKey, {
			applicationId: applicationId,
		});

		await fetchMutation(api.apiActions.deleteApiKey, {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			id: apiKey?._id as any,
		});

		await fetchMutation(api.appActions.deleteApplication, {
			applicationId: applicationId,
			userId: userId as string,
		});

		return {
			message: "Deleted Application Successfully",
		};
	} catch (error) {
		return {
			error: "Error deleting application",
		};
	}

	// biome-ignore lint/correctness/noUnreachable: <explanation>
	redirect("/");
}
