"use server";

import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";
import { api } from "../../../convex/_generated/api";

export async function DeleteUserAction() {
	try {
		const { userId } = auth();

		await fetchMutation(api.appActions.deleteApplications, {
			userId: userId as string,
		});

		await clerkClient.users.deleteUser(userId as string);
	} catch (error) {
		return error;
	}
	redirect("/sign-in");
}
