import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createApiKey = mutation({
	args: {
		key: v.string(),
		name: v.string(),
		emailAdress: v.string(),
		keyId: v.string(),
		applicationId: v.string(),
		enviroment: v.array(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			return [];
		}
		return await ctx.db.insert("apiKeys", {
			userId: user.subject,
			name: args.name,
			emailAdress: args.emailAdress,
			key: args.key,
			keyId: args.keyId,
			applicationId: args.applicationId,
			enviroment: args.enviroment,
		});
	},
});

export const getApiKeys = query({
	args: {
		applicationId: v.string(),
		enviroment: v.array(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			return [];
		}
		return await ctx.db
			.query("apiKeys")
			.filter((q) =>
				q.and(
					q.eq(q.field("userId"), user.subject),
					q.eq(q.field("applicationId"), args.applicationId),
					q.eq(q.field("enviroment"), args.enviroment)
				)
			)
			.collect();
	},
});

export const updateApiKey = mutation({
	args: {
		name: v.string(),
		keyId: v.string(),
		id: v.id("apiKeys"),
	},
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.id, {
			name: args.name,
			keyId: args.keyId,
		});
	},
});

export const deleteApiKey = mutation({
	args: { id: v.id("apiKeys") },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});

export const getApiKeyDetails = query({
	args: {
		applicationId: v.string(),
		enviroment: v.array(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			return;
		}
		return await ctx.db
			.query("apiKeys")
			.filter((q) =>
				q.and(
					q.eq(q.field("userId"), user.subject),
					q.eq(q.field("applicationId"), args.applicationId),
					q.eq(q.field("enviroment"), args.enviroment)
				)
			)
			.first();
	},
});

export const getApiKey = query({
	args: {
		applicationId: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("apiKeys")
			.filter((q) => q.eq(q.field("applicationId"), args.applicationId))
			.first();
	},
});
