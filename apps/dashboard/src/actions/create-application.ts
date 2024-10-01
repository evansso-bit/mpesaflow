"use server";

import { api } from "convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createApplicationAction(
	prevState: any,
	formData: FormData
) {
	const { userId } = await auth();

	if (!userId) {
		return {
			error: "User not found",
		};
	}

	const Name = formData.get("name") as string;
	const applicationId = crypto.randomUUID();
	const enviroment = "development";

	await fetchMutation(api.appActions.createApplication, {
		userId: userId,
		name: Name,
		applicationId: applicationId,
		enviroment: enviroment,
	});

	redirect(`/d/${applicationId}`);

	return {
		message: "Application created successfully",
	};
}
