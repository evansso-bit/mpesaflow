"use server";


import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { api } from "../../../convex/_generated/api";

type State = { error: string | null } | { message: string | null };

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function updateApiKeyAction(prevState: any, formData: FormData) {
  const Name = formData.get("name") as string;
  const keyId = formData.get("keyId") as string;
  const id = formData.get("_id") as string;
  const appId = formData.get("appId") as string;

  if (!keyId) {
    return {
      error: "Key not found",
    };
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_CONVEX_URL}`;
    await fetchMutation(api.apiActions.updateApiKey, {
      name: Name,
      keyId: keyId,
      id: id as string,
    });

    revalidatePath(`/flow/${appId}/api-keys`);
    return { message: "API key updated successfully" };
  } catch (error) {
    console.error("Error updating API key:", error);
    return { error: "Failed to update API key" };
  }
}
