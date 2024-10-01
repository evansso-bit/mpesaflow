import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	apiKeys: defineTable({
		key: v.string(),
		userId: v.string(),
		name: v.string(),
		emailAdress: v.string(),
		keyId: v.string(),
		applicationId: v.string(),
		enviroment: v.string(),
	}),

	applications: defineTable({
		userId: v.string(),
		name: v.string(),
		applicationId: v.string(),
		enviroment: v.string(),
	}),
});
