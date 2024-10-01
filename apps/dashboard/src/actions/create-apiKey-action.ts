"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { CreateUserIdentity } from "../config/unkey/create-identity";
import { verifyIdentity } from "../config/unkey/verify-identity";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function createApiKeyAction(prevState: any, formData: FormData) {
  const Name = formData.get("name") as string;
  const applicationId = formData.get("applicationId") as string;
  const environment = formData.get("enviroment") as string;
  const { userId } = await auth();

  const user = await currentUser();

  if (!user && !userId) {
    return "Please sign in to create an API key";
  }

  const { key, KeyId } = await CreateUserIdentity();

  const { error, valid } = await verifyIdentity(key);

  if (error) {
    return {
      error: error,
    };
  }
  
  if (valid) {
    await fetchMutation(api.apiActions.createApiKey, {
      key: key,
      userId: userId || "",
      name: Name,
      emailAdress: user?.emailAddresses[0]?.emailAddress ?? "",
      keyId: KeyId,
      applicationId: applicationId,
      environment: environment,
    });
  }

  return { message: "API key created successfully" };
}
