"use server";

import { auth } from "@clerk/nextjs/server";
import { api } from "convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";

export async function createApplicationAction(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  prevState: any,
  formData: FormData,
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

  if (Name && applicationId && enviroment) {

  await fetchMutation(api.appActions.createApplication, {
    userId: userId,
    name: Name,
    applicationId: applicationId,
    enviroment: enviroment,
  });
redirect(`/flow/${applicationId}`);
  }

  
return {
    message: "Application created successfully",
  };
  
}
