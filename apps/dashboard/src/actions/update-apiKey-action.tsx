"use server";

import { api } from "convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function updateApiKeyAction(prevState: any, formData: FormData) {
  const Name = formData.get("name") as string;
  const keyId = formData.get("keyId") as string;
  const _id = formData.get("_id") as string;
  const appId = formData.get("appId") as string;

  if (!keyId) {
    return {
      error: "Key not found",
    };
  }

  await fetchMutation(api.apiActions.updateApiKey, {
    name: Name,
    keyId: keyId,
    _id: _id,
  });

  revalidatePath(`/flow/${appId}/api-keys`);

  return { message: "API key updated successfully" };
}
