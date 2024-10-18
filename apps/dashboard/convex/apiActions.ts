import { fetchMutation } from "convex/nextjs";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { mutation, query } from "./_generated/server";

export const createApiKey = mutation({
	args: {
		key: v.string(),
		name: v.string(),
		emailAdress: v.string(),
		keyId: v.string(),
		applicationId: v.string(),
		enviroment: v.array(v.string()),
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert("apiKeys", {
			userId: args.userId,
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
		userId: v.string(),
	},

	handler: async (ctx, args) => {
		return await ctx.db
			.query("apiKeys")
			.filter((q) =>
				q.and(
					q.eq(q.field("userId"), args.userId),
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

export const getApiKeyDetails = query({
	args: {
		applicationId: v.string(),
		enviroment: v.array(v.string()),
		userId: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db
			.query("apiKeys")
			.filter((q) =>
				q.and(
					q.eq(q.field("userId"), args.userId),
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

export const deleteApiKey = mutation({
	args: { id: v.id("apiKeys") },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});

export const deleteApiKeys = mutation({
	args: {
		applicationId: v.string(),
	},
	handler: async (ctx, args) => {
		const apiKeys = await ctx.db
			.query("apiKeys")
			.filter((q) => q.eq(q.field("applicationId"), args.applicationId))
			.collect();

		for (const apiKey of apiKeys) {
			await fetchMutation(api.transactions.deleteTransactions, {
				keyId: apiKey.keyId,
			});
			await ctx.db.delete(apiKey._id);
		}
	},
});
