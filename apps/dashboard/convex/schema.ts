import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	apiKeys: defineTable({
		applicationId: v.string(),
		emailAdress: v.string(),
		enviroment: v.array(v.string()),
		key: v.string(),
		keyId: v.string(),
		name: v.string(),
		userId: v.string(),
	}),
	applications: defineTable({
		applicationId: v.string(),
		enviroment: v.array(v.string()),
		name: v.string(),
		userId: v.string(),
		ConsumerKey: v.optional(v.string()),
		ConsumerSecret: v.optional(v.string()),
		passkey: v.optional(v.string()),
		currentEnvironment: v.string(),
	}),
	transactions: defineTable({
		KeyId: v.string(),
		accountReference: v.string(),
		amount: v.float64(),
		date_created: v.string(),
		mpesaRequestId: v.string(),
		phoneNumber: v.string(),
		resultDesc: v.string(),
		status: v.string(),
		transactionDesc: v.string(),
		transactionId: v.string(),
	}),
	enviroment: defineTable({
		applicationId: v.string(),
		enviroment: v.array(v.string()),
		userId: v.string(),
	}),
});
