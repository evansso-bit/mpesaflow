"use server";

import { unkey } from "@//lib/unkey";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { api } from "../../../convex/_generated/api";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function deleteApiKeyAction(prevState: any, formData: FormData) {
  const id = formData.get("_id") as string;
  const appId = formData.get("appId") as string;
  const keyId = formData.get("keyId") as string;

  if (!id && appId) {
    return {
      error: "API key not found",
    };
  }

  try {
    await fetchMutation(api.apiActions.deleteApiKey, {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      _id: id as any
    });

    await unkey.keys.delete({ keyId: keyId });

    revalidatePath(`/flow/${appId}/api-keys`);

    return { message: "API key deleted successfully" };
  } catch (error) {
    return { error: "Error deleting API key" };
  }
}
