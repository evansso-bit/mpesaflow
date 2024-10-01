import { currentUser, auth } from "@clerk/nextjs/server";

const apiId = process.env.UNKEY_APP_ID;
const rootKey = process.env.UNKEY_ROOT_KEY;

interface IdentityId {
	identityId: string;
}

interface Identity {
	id: string;
	externalId: string;
	meta: unknown;
	ratelimits: Array<{ name: string; limit: number; duration: number }>;
}

interface Key {
	keyId: string;
	key: string;
}

export async function CreateUserIdentity() {
	const { userId } = await auth();
	const user = await currentUser();

	const createIdentityResponse = await fetch(
		"https://api.unkey.dev/v1/identities.createIdentity",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${rootKey}`,
			},
			body: JSON.stringify({
				userId,
				meta: {
					emailAdress: user?.emailAddresses[0]?.emailAddress,
				},
			}),
		}
	);

	const { identityId } = (await createIdentityResponse.json()) as IdentityId;

	const getIdentityResponse = await fetch(
		`https://api.unkey.dev/v1/identities.getIdentity?identityId=${identityId}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${rootKey}`,
			},
		}
	);

	const identity = (await getIdentityResponse.json()) as Identity;

	const createKeyResponse = await fetch(
		`https://api.unkey.dev/v1/keys.createKey`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${rootKey}`,
			},
			body: JSON.stringify({
				apiId: apiId,
				prefix: "acme",
				externalId: userId,
			}),
		}
	);

	const key = (await createKeyResponse.json()) as Key;

	return {
		key: key.key,
		KeyId: key.keyId,
	};
}
