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

	let prefix = "";
	if (enviroment === "development") {
		prefix = "mf_dev";
	} else {
		prefix = "mf_live";
	}

	const created = await unkey.keys.create({
		apiId: apiId || "",
		name: name || "",
		prefix: prefix,
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
