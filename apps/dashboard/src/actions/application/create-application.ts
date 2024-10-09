"use server";

import { auth } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { api } from "../../../convex/_generated/api";

export async function createApplicationAction(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  prevState: any,
  formData: FormData,
) {
  const Name = formData.get("name") as string;
  const { userId } = auth();
  const applicationId = crypto.randomUUID();
  const environment = "development";

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    await fetchMutation(api.appActions.createApplication, {
      userId,
      name: Name,
      applicationId,
      enviroment: environment,
    });

    revalidatePath('/')
    redirect(`/flow/${applicationId}`);
    return { message: "Application created successfully" };
  } catch (error) {
    console.error("Error creating application:", error);
    return { error: "Failed to create application" };
  }
}
