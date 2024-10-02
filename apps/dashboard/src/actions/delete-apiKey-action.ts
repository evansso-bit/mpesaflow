"use server";

import { api } from "convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function deleteApiKeyAction(prevState: any, formData: FormData) {
  const _id = formData.get("_id") as string;
  const appId = formData.get("appId") as string;

  if (!_id) {
    return {
      error: "API key not found",
    };
  }

  await fetchMutation(api.apiActions.deleteApiKey, {
    _id: _id,
  });

  revalidatePath(`/flow/${appId}/api-keys`);

  return { message: "API key deleted successfully" };
}
