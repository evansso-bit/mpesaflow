import { instrument } from "@microlabs/otel-cf-workers";
import { type UnkeyContext, unkey } from "@unkey/hono";
import { type Context, Hono } from "hono";
import { env } from "hono/adapter";
import { convexMutation, convexQuery } from "./config/CovexMutation.js";
import { fetchWithErrorHandling } from "./config/ErrorHandlingFetch.js";
import { getMpesaToken } from "./config/GetMpesaToken.js";
import { queryTransactionStatus } from "./config/QueryTransaction.js";
import { generateTransactionId } from "./config/generateTransactionId.js";
import { config } from "./config/obesrvability.js";
import type { Binding } from "./types/honoTypes.js";

const app = new Hono<{
  Bindings: Binding;
  Variables: { unkey: UnkeyContext };
  Env: Binding;
}>().basePath("/v1");

// Custom CORS middleware
app.use("*", async (c, next) => {
  const origin = c.req.header("Origin");
  const allowedOrigin = c.env.ALLOWED_ORIGIN || "https://dev.mpesaflow.com";

  if (origin === allowedOrigin) {
    c.header("Access-Control-Allow-Origin", origin);
    c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    c.header("Access-Control-Allow-Credentials", "true");
    c.header("Access-Control-Max-Age", "86400");

    // Handle preflight request
    if (c.req.method === "OPTIONS") {
      return c.text("", 204);
    }
  }

  await next();
});

app.use(
  "*",
  unkey({
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    apiId: (c: any) => {
      const { UNKEY_API_ID } = env<Binding>(c);
      return UNKEY_API_ID;
    },
  }),
);

app.post("/paybill", async (c) => {
  try {
    const unkeyContext = c.get("unkey");

    if (!unkeyContext?.valid) {
      return c.json(
        { error: "Unauthorized, Please provide a valid API key" },
        401,
      );
    }

    if (unkeyContext.environment === "production") {
      return c.json({ error: "This API is for development only" }, 401);
    }

    const {
      MPESA_PROCESS_URL,
      MPESA_QUERY_URL,
      BUSINESS_SHORT_CODE,
      PASS_KEY,
      CONVEX_URL,
    } = env(c);

    console.log("MPESA_PROCESS_URL:", MPESA_PROCESS_URL);
    console.log("MPESA_QUERY_URL:", MPESA_QUERY_URL);
    console.log("BUSINESS_SHORT_CODE:", BUSINESS_SHORT_CODE);
    console.log("PASS_KEY is set:", !!PASS_KEY);
    console.log("CONVEX_URL:", CONVEX_URL);

    const token = await getMpesaToken(c);

    const body = await c.req.json();
    console.log("Request body:", body);

    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3);
    const password = btoa(`${BUSINESS_SHORT_CODE}${PASS_KEY}${timestamp}`);

    const transactionId = generateTransactionId();

    const date = new Date().toISOString();

    const mpesaRequestBody = {
      BusinessShortCode: BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: body.amount,
      PartyA: body.phoneNumber,
      PartyB: BUSINESS_SHORT_CODE,
      PhoneNumber: body.phoneNumber,
      CallBackURL: `${c.req.url.split("/paybill")[0]}/mpesa-callback`,
      AccountReference: body.accountReference,
      TransactionDesc: body.transactionDesc,
      date_created: timestamp,
    };

    const numbers = Number(body.amount);
    console.log("Numbers:", numbers);

    console.log("Sending request to:", MPESA_PROCESS_URL);
    const mpesaData = await fetchWithErrorHandling(MPESA_PROCESS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mpesaRequestBody),
    });

    console.log("M-Pesa process response:", mpesaData);
    console.log("unkeyId", unkeyContext.keyId);

    console.log("ADDING TO DATABASE");
    await convexMutation(CONVEX_URL, "transactions:create", {
      KeyId: unkeyContext.keyId,
      transactionId: transactionId,
      amount: numbers,
      phoneNumber: body.phoneNumber,
      accountReference: body.accountReference,
      transactionDesc: body.transactionDesc,
      mpesaRequestId: mpesaData.CheckoutRequestID,
      status: "pending",
      resultDesc: "",
      date_created: timestamp,
    });
    console.log("Added to database, transaction ID:", transactionId);

    const statusBody = {
      BusinessShortCode: BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: mpesaData.CheckoutRequestID,
    };

    console.log("statusBodys:", statusBody);
    console.log("transactionStatus", token, statusBody, MPESA_QUERY_URL);

    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let statusData;
    let attempts = 0;
    const maxAttempts = 5;
    const pollingInterval = 5000; // 5 seconds

    while (attempts < maxAttempts) {
      statusData = await queryTransactionStatus(
        token,
        statusBody,
        MPESA_QUERY_URL,
      );

      if (statusData.status === "pending") {
        console.log(
          `Transaction still processing. Attempt ${attempts + 1} of ${maxAttempts}`,
        );
        await new Promise((resolve) => setTimeout(resolve, pollingInterval));
        attempts++;
      } else {
        break;
      }
    }

    if (!statusData || statusData.status === "pending") {
      await convexMutation(CONVEX_URL, "transactions:updateStatus", {
        transactionId,
        status: "pending",
        resultDesc:
          "Transaction status could not be determined after multiple attempts",
      });
      return c.json(
        {
          transactionId: transactionId,
          mpesaRequestId: mpesaData.CheckoutRequestID,
          status: "pending",
          message:
            "Transaction is still being processed. Please check back later.",
        },
        202,
      );
    }

    await convexMutation(CONVEX_URL, "transactions:updateStatus", {
      transactionId,
      status: statusData.ResultCode === "0" ? "completed" : "failed",
      resultDesc: statusData.ResultDesc,
    });

    console.log("Final M-Pesa status:", statusData);
    return c.json(
      {
        transactionId: transactionId,
        mpesaRequestId: mpesaData.CheckoutRequestID,
        mpesaStatus: statusData,
      },
      200,
    );
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    console.error("Error processing M-Pesa request:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/mpesa-callback", async (c) => {
  try {
    const callbackData = await c.req.json();
    console.log("Received M-Pesa callback:", callbackData);

    const { ResultCode, ResultDesc, CheckoutRequestID } =
      callbackData.Body.stkCallback;

    const { CONVEX_URL } = env(c);
    await convexMutation(CONVEX_URL, "transactions:updateStatus", {
      mpesaRequestId: CheckoutRequestID,
      status: ResultCode === "0" ? "completed" : "failed",
      resultDesc: ResultDesc,
    });

    return c.json({
      ResultCode: "0",
      ResultDesc: "Callback received successfully",
    });
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    console.error("Error processing M-Pesa callback:", error);
    return c.json(
      { ResultCode: "1", ResultDesc: "Error processing callback" },
      500,
    );
  }
});

app.get("/transaction-status/:transactionId", async (c) => {
  try {
    const { transactionId } = c.req.param();
    const { CONVEX_URL } = env(c);

    const unkeyContext = c.get("unkey");
    if (!unkeyContext?.valid) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const transactionStatus = await convexMutation(
      CONVEX_URL,
      "transactions:getStatus",
      {
        transactionId: transactionId,
        userId: unkeyContext.keyId,
      },
    );

    if (!transactionStatus) {
      return c.json({ error: "Transaction not found" }, 404);
    }

    return c.json(transactionStatus);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    console.error("Error fetching transaction status:", error);
    return c.json({ error: error.message }, 500);
  }
});

app.get("/health", async (c) => {
  const headers = c.req.header("User-Agent");

  if (headers === "OpenStatus/1.0") {
    return c.text("OK", 200);
  }
  return c.text("Not OK", 500);
});

app.get("/transactions", async (c) => {
  try {
    const { CONVEX_URL } = env(c);
    const unkeyContext = c.get("unkey");
    if (!unkeyContext?.valid) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const transactions = await convexQuery(
      CONVEX_URL,
      "transactions:getTransactions",
      {
        userId: unkeyContext.keyId,
      },
    );

    return c.json(transactions);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    console.error("Error fetching transactions:", error);
    return c.json({ error: error.message }, 500);
  }
});

export default instrument(app, config);
