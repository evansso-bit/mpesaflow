import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const createApplication = mutation({
	args: {
		passKey: v.optional(v.string()),
		name: v.string(),
		environments: v.array(v.string()),
		applicationId: v.string(),
		ConsumerKey: v.optional(v.string()),
		ConsumerSecret: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			return [];
		}
		const applicationId = crypto.randomUUID(); // Generate applicationId on the server

		await ctx.db.insert("applications", {
			...args,
			userId: user.subject,
			currentEnvironment: args.environments[0] || "development",
			enviroment: args.environments,
		});
	},
});

export const updateApplication = mutation({
	args: {
		id: v.id("applications"),
		ConsumerKey: v.optional(v.string()),
		ConsumerSecret: v.optional(v.string()),
		passKey: v.optional(v.string()),
		environments: v.array(v.string()),
		currentEnvironment: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const { id, ...updateData } = args;
		await ctx.db.patch(id, updateData);
	},
});

export const getApplications = query({
	args: {},
	handler: async (ctx) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			return [];
		}
		return await ctx.db
			.query("applications")
			.filter((q) => q.eq(q.field("userId"), user.subject))
			.collect();
	},
});

export const getApplicationData = query({
	args: {
		applicationId: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			return null;
		}
		return await ctx.db
			.query("applications")
			.filter((q) =>
				q.and(
					q.eq(q.field("applicationId"), args.applicationId),
					q.eq(q.field("userId"), user.subject)
				)
			)
			.first();
	},
});

export const deleteApplication = mutation({
	args: { id: v.id("applications") },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});

export const saveCurrentEnvironment = mutation({
	args: {
		applicationId: v.string(),
		currentEnvironment: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			throw new Error("Not authenticated");
		}

		const existingApp = await ctx.db
			.query("applications")
			.filter((q) =>
				q.and(
					q.eq(q.field("applicationId"), args.applicationId),
					q.eq(q.field("userId"), user.subject)
				)
			)
			.first();

		if (!existingApp) {
			throw new Error("Application not found");
		}

		if (!existingApp.enviroment.includes(args.currentEnvironment)) {
			throw new Error("Invalid environment");
		}

		await ctx.db.patch(existingApp._id, {
			currentEnvironment: args.currentEnvironment,
		});
	},
});

export const getCurrentEnvironment = query({
	args: {
		applicationId: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			return null;
		}

		const app = await ctx.db
			.query("applications")
			.filter((q) =>
				q.and(
					q.eq(q.field("applicationId"), args.applicationId),
					q.eq(q.field("userId"), user.subject)
				)
			)
			.first();

		return app?.currentEnvironment || "development";
	},
});

export const addEnvironment = mutation({
	args: {
		applicationId: v.string(),
		environment: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			throw new Error("Not authenticated");
		}

		const existingApp = await ctx.db
			.query("applications")
			.filter((q) =>
				q.and(
					q.eq(q.field("applicationId"), args.applicationId),
					q.eq(q.field("userId"), user.subject)
				)
			)
			.first();

		if (!existingApp) {
			throw new Error("Application not found");
		}

		const updatedEnvironments = [
			...new Set([...existingApp.enviroment, args.environment]),
		];

		await ctx.db.patch(existingApp._id, {
			enviroment: updatedEnvironments,
		});
	},
});

export const removeEnvironment = mutation({
	args: {
		applicationId: v.string(),
		environment: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();
		if (!user) {
			throw new Error("Not authenticated");
		}

		const existingApp = await ctx.db
			.query("applications")
			.filter((q) =>
				q.and(
					q.eq(q.field("applicationId"), args.applicationId),
					q.eq(q.field("userId"), user.subject)
				)
			)
			.first();

		if (!existingApp) {
			throw new Error("Application not found");
		}

		const updatedEnvironments = existingApp.enviroment.filter(
			(env) => env !== args.environment
		);

		if (existingApp.currentEnvironment === args.environment) {
			await ctx.db.patch(existingApp._id, {
				enviroment: updatedEnvironments,
				currentEnvironment: updatedEnvironments[0] || "development",
			});
		} else {
			await ctx.db.patch(existingApp._id, {
				enviroment: updatedEnvironments,
			});
		}
	},
});
