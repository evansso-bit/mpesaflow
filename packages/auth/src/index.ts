import { Redis } from "@upstash/redis/cloudflare";
import { v4 as uuidv4 } from "uuid";

const redis = new Redis({
	url: ENV.UPSTASH_REDIS_REST_URL, // Changed from process.env
	token: ENV.UPSTASH_REDIS_REST_TOKEN, // Changed from process.env
});

export async function generateApiToken(userId: string): Promise<string> {
	const existingToken = await redis.get(`user:${userId}:api_token`);

	if (existingToken) {
		return existingToken as string;
	}

	const newToken = uuidv4();
	await redis.set(`user:${userId}:api_token`, newToken);
	await redis.set(`api_token:${newToken}`, userId);

	return newToken;
}

export async function validateApiToken(token: string): Promise<string | null> {
	const userId = await redis.get(`api_token:${token}`);
	return userId as string | null;
}
