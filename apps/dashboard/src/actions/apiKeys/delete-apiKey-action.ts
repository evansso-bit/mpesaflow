"use server";

import { convexMutation } from "@//config/CovexMutation";
import { unkey } from "@//lib/unkey";
import { revalidatePath } from "next/cache";

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

    const url = `${process.env.NEXT_PUBLIC_CONVEX_URL}`;
   
 await convexMutation(url, "apiKeys:deleteApiKey", {
    _id: id,
 })
    await unkey.keys.delete({ keyId: keyId });

    revalidatePath(`/flow/${appId}/api-keys`);

    return { message: "API key deleted successfully" };
  } catch (error) {
    return { error: "Error deleting API key" };
  }
}
