"use server";

import { auth } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";

export async function createApplicationAction(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	prevState: any,
	formData: FormData
) {
	const applicationId = crypto.randomUUID();
	const { userId } = auth()

	try {
		const Name = formData.get("name") as string;
		const environment = formData.get("enviroment") as string;
		const consumerKey = formData.get("consumerKey") as string;
		const consumerSecret = formData.get("consumerSecret") as string;
		const passKey = formData.get("passKey") as string;

		await fetchMutation(api.appActions.createApplication, {
			name: Name,
			applicationId: applicationId,
			environments: [environment],
			ConsumerKey: consumerKey || "",
			ConsumerSecret: consumerSecret || "",
			passKey: passKey || "",
			userId: userId || "",
		});

		return {
			message: "Application created successfully",
			applicationId,
		};
	} catch (error) {
		return {
			error: "Failed to create application",
		};
	}
}
