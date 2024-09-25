import { createClerkClient } from "@clerk/backend";
import { Redis } from "@upstash/redis/cloudflare";
import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
	CLERK_SECRET_KEY: string;
	CONSUMER_AUTH: string;
	MPESA_OAUTH_URL: string;
	MPESA_PROCESS_URL: string;
	MPESA_QUERY_URL: string;
	BUSINESS_SHORT_CODE: string;
	PASS_KEY: string;
	UPSTASH_REDIS_REST_URL: string;
	UPSTASH_REDIS_REST_TOKEN: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors());

async function validateAuth(c: any, next: () => Promise<void>) {
	const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, CLERK_SECRET_KEY } =
		c.env;
	const clerk = createClerkClient({ secretKey: CLERK_SECRET_KEY });
	const sessionToken = c.req.header("Authorization")?.split(" ")[1];
	const apiToken = c.req.header("X-API-Token");
	const sessionId = c.req.header("X-Session-Id");

	const redis = new Redis({
		url: UPSTASH_REDIS_REST_URL,
		token: UPSTASH_REDIS_REST_TOKEN,
	});

	async function validateApiToken(token: string): Promise<string | null> {
		const userId = await redis.get(`api_token:${token}`);
		return userId as string | null;
	}

	if (sessionToken) {
		try {
			const session = await clerk.sessions.verifySession(
				sessionId,
				sessionToken
			);
			c.set("userId", session.userId);
			await next();
			return;
		} catch (error) {
			// Session invalid, fall through to API token check
		}
	}

	if (apiToken) {
		const userId = await validateApiToken(apiToken);
		if (userId) {
			c.set("userId", userId);
			await next();
			return;
		}
	}

	return c.json({ error: "Unauthorized" }, 401);
}

function checkEnvVariables(env: Bindings): void {
	const requiredVars = [
		"CLERK_SECRET_KEY",
		"CONSUMER_AUTH",
		"MPESA_OAUTH_URL",
		"MPESA_PROCESS_URL",
		"MPESA_QUERY_URL",
		"BUSINESS_SHORT_CODE",
		"PASS_KEY",
	];

	for (const varName of requiredVars) {
		if (!env[varName as keyof Bindings]) {
			throw new Error(`Missing required environment variable: ${varName}`);
		}
	}
}

async function getMpesaToken(c: any) {
	const { CONSUMER_AUTH, MPESA_OAUTH_URL } = c.env;

	console.log("Fetching M-Pesa token from:", MPESA_OAUTH_URL);

	const response = await fetch(
		`${MPESA_OAUTH_URL}?grant_type=client_credentials`,
		{
			method: "GET",
			headers: {
				Authorization: `Basic ${CONSUMER_AUTH}`,
			},
		}
	);

	if (!response.ok) {
		const errorText = await response.text();
		console.error("Failed to fetch M-Pesa token:", response.status, errorText);
		throw new Error(
			`Failed to fetch M-Pesa token: ${response.status} ${errorText}`
		);
	}

	const data = await response.json();
	console.log("M-Pesa token fetched successfully");
	return data.access_token;
}

async function queryTransactionStatus(
	token: string,
	body: any,
	MPESA_QUERY_URL: string
) {
	const res = await fetch(MPESA_QUERY_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});

	const data = await res.json();

	if (data.errorCode === "500.001.1001") {
		throw new Error("TRANSACTION_IN_PROCESS");
	}

	if (!res.ok) {
		console.error("Failed to query transaction status:", res.status, data);
		throw new Error(
			`Failed to query transaction status: ${res.status} ${JSON.stringify(data)}`
		);
	}

	return data;
}

app.use("/paybill", validateAuth);

app.post("/paybill", async (c) => {
	try {
		checkEnvVariables(c.env);

		const {
			MPESA_PROCESS_URL,
			MPESA_QUERY_URL,
			BUSINESS_SHORT_CODE,
			PASS_KEY,
		} = c.env;

		console.log("MPESA_PROCESS_URL:", MPESA_PROCESS_URL);
		console.log("MPESA_QUERY_URL:", MPESA_QUERY_URL);
		console.log("BUSINESS_SHORT_CODE:", BUSINESS_SHORT_CODE);
		console.log("PASS_KEY is set:", !!PASS_KEY);

		const token = await getMpesaToken(c);

		const body = await c.req.json();
		console.log("Request body:", body);

		const date = new Date();
		const timestamp =
			date.getFullYear() +
			("0" + (date.getMonth() + 1)).slice(-2) +
			("0" + date.getDate()).slice(-2) +
			("0" + date.getHours()).slice(-2) +
			("0" + date.getMinutes()).slice(-2) +
			("0" + date.getSeconds()).slice(-2);

		const password = btoa(`${BUSINESS_SHORT_CODE}${PASS_KEY}${timestamp}`);

		const mpesaRequestBody = {
			BusinessShortCode: BUSINESS_SHORT_CODE,
			Password: password,
			Timestamp: timestamp,
			TransactionType: "CustomerPayBillOnline",
			Amount: body.amount,
			PartyA: body.phoneNumber,
			PartyB: BUSINESS_SHORT_CODE,
			PhoneNumber: body.phoneNumber,
			CallBackURL: body.callbackUrl,
			AccountReference: body.accountReference,
			TransactionDesc: body.transactionDesc,
		};

		console.log("Sending request to:", MPESA_PROCESS_URL);
		const mpesaResponse = await fetch(MPESA_PROCESS_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(mpesaRequestBody),
		});

		if (!mpesaResponse.ok) {
			const errorText = await mpesaResponse.text();
			console.error(
				"M-Pesa process request failed:",
				mpesaResponse.status,
				errorText
			);
			throw new Error(
				`M-Pesa process request failed: ${mpesaResponse.status} ${errorText}`
			);
		}

		const mpesaData = await mpesaResponse.json();
		console.log("M-Pesa process response:", mpesaData);

		const statusBody = {
			BusinessShortCode: BUSINESS_SHORT_CODE,
			Password: password,
			Timestamp: timestamp,
			CheckoutRequestID: mpesaData.CheckoutRequestID,
		};

		let statusData;
		let attempts = 0;
		const maxAttempts = 5;
		const pollingInterval = 5000; // 5 seconds

		while (attempts < maxAttempts) {
			try {
				statusData = await queryTransactionStatus(
					token,
					statusBody,
					MPESA_QUERY_URL
				);
				break; // If successful, exit the loop
			} catch (error: any) {
				if (error.message === "TRANSACTION_IN_PROCESS") {
					console.log(
						`Transaction still processing. Attempt ${attempts + 1} of ${maxAttempts}`
					);
					await new Promise((resolve) => setTimeout(resolve, pollingInterval));
					attempts++;
				} else {
					throw error; // If it's a different error, throw it
				}
			}
		}

		if (!statusData) {
			return c.json(
				{
					error:
						"Transaction status could not be determined after multiple attempts",
				},
				504
			);
		}

		console.log("Final M-Pesa status:", statusData);
		return c.json({ mpesaStatus: statusData }, 200);
	} catch (error: any) {
		console.error("Error processing M-Pesa request:", error);
		return c.json({ error: error.message }, 500);
	}
});

export default app;
