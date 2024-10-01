import { fetchWithErrorHandling } from "./ErrorHandlingFetch.js";

export async function convexMutation(url: string, path: string, args: any) {
	const result = await fetchWithErrorHandling(`${url}/api/mutation`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			path,
			args,
			format: "json",
		}),
	});

	if (result.status === "error") {
		throw new Error(`Convex mutation error: ${result.errorMessage}`);
	}
	return result.value;
}
