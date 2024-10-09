import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createApiKey = mutation({
	args: {
		key: v.string(),
		userId: v.string(),
		name: v.string(),
		emailAdress: v.string(),
		keyId: v.string(),
		applicationId: v.string(),
		enviroment: v.string(),
	},
	handler: async (ctx, args) => {
		return await ctx.db.insert("apiKeys", args);
	},
});

export const getApiKeys = query({
	args: {
		userId: v.string(),
		applicationId: v.string(),
		enviroment: v.string(), // Note: Fixed typo in 'environment'
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
		_id: v.id("apiKeys"),
	},
	handler: async (ctx, args) => {
		const { _id } = args;
		if (!_id) {
			return;
		}
		return await ctx.db.patch(_id, {
			name: args.name,
			keyId: args.keyId,
		});
	},
});

export const deleteApiKey = mutation({
	args:{
		_id: v.id("apiKeys")
	},
	handler: async (ctx, args) => {
		if(!args._id) return;
		await ctx.db.delete(args._id);
	},
});

export const getApiKeyDetails = query({
	args: {
		userId: v.string(),
		applicationId: v.string(),
		enviroment: v.string(),
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
