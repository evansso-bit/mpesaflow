import { v } from "convex/values";
import { mutation, query } from "./_generated/server.js";

export const enviroment = mutation({
	args: {
		applicationId: v.string(),
		enviroment: v.array(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			return [];
		}
		return await ctx.db.insert("enviroment", {
			...args,
			userId: user?.subject ?? "",
		});
	},
});

export const updateEnviroment = mutation({
	args: {
		id: v.id("enviroment"),
		applicationId: v.string(),
		enviroment: v.array(v.string()),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.id, {
			enviroment: args.enviroment,
		});
	},
});

export const getEnviroments = query({
	args: {
		applicationId: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			return [];
		}
		return await ctx.db
			.query("enviroment")
			.filter((q) =>
				q.and(
					q.eq(q.field("applicationId"), args.applicationId),
					q.eq(q.field("userId"), user.subject)
				)
			)
			.first();
	},
});
