import { unkey } from "@//lib/unkey";
import { auth, currentUser } from "@clerk/nextjs/server";

const apiId = process.env.UNKEY_APP_ID;

export async function CreateUserIdentity({
  enviroment,
  appId,
  name,
}: {
  enviroment: string;
  appId: string;
  name: string;
}) {
  const { userId } = auth();
  const user = await currentUser();

  const created = await unkey.keys.create({
    apiId: apiId || "",
    name: name || "",
    prefix: "mf_dev",
    ownerId: userId as string,
    meta: {
      emailAdress: user?.emailAddresses[0]?.emailAddress,
      appId: appId,
    },
    environment: enviroment || "",
    enabled: true,
  });

  console.log(created);

  return {
    key: created.result?.key,
    KeyId: created.result?.keyId,
  };
}
