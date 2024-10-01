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
	const verifyKeyResponse = await fetch(
		`https://api.unkey.dev/v1/keys.verifyKey`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				apiId: apiId,
				key: key,
			}),
		}
	);

	const verified = (await verifyKeyResponse.json()) as Verified;

	if (verified.valid === false) {
		return {
			error: "Invalid key",
		};
	} else {
		return {
			valid: true,
		};
	}
}
