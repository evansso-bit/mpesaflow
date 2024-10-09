import { verifyKey } from "@unkey/api";

const apiId = process.env.UNKEY_APP_ID;

interface Verified {
  valid: boolean;
  identity: {
    id: string;
    externalId: string;
    meta: unknown;
  };
}

export async function verifyIdentity(key: string) {
  const { result, error } = await verifyKey({
    key: key,
    apiId: apiId as string,
  });

  if (error) {
    return {
      error: error,
    };
  }
  return {
    valid: result.valid,
  };
}
