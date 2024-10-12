import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createApplication = mutation({
    args: {
        passKey: v.optional(v.string()),
        name: v.string(),
        environments: v.array(v.string()),
        applicationId: v.string(),
        ConsumerKey: v.optional(v.string()),
        ConsumerSecret: v.optional(v.string()),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("applications", {
            applicationId: args.applicationId,
            name: args.name,
            userId: args.userId,
            ConsumerKey: args.ConsumerKey || "",
            ConsumerSecret: args.ConsumerSecret || "",
            passKey: args.passKey || "",
            currentEnvironment: "development",
            environments: ["development"],
        });

        return "Application created successfully";
    },
});

export const getApplications = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("applications")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .collect();
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

        return "Application updated successfully";
    },
});

export const saveCurrentEnvironment = mutation({
    args: {
        applicationId: v.string(),
        currentEnvironment: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const existingApp = await ctx.db
            .query("applications")
            .filter((q) =>
                q.and(
                    q.eq(q.field("applicationId"), args.applicationId),
                    q.eq(q.field("userId"), args.userId)
                )
            )
            .first();

        if (!existingApp) {
            throw new Error("Application not found");
        }

        if (!existingApp.environments.includes(args.currentEnvironment)) {
            throw new Error("Invalid environment");
        }

        await ctx.db.patch(existingApp._id, {
            currentEnvironment: args.currentEnvironment,
        });
    },
});

export const addEnvironment = mutation({
    args: {
        applicationId: v.string(),
        environment: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const existingApp = await ctx.db
            .query("applications")
            .filter((q) =>
                q.and(
                    q.eq(q.field("applicationId"), args.applicationId),
                    q.eq(q.field("userId"), args.userId)
                )
            )
            .first();

        if (!existingApp) {
            throw new Error("Application not found");
        }

        const updatedEnvironments = [
            ...new Set([...existingApp.environments, args.environment]),
        ];

        await ctx.db.patch(existingApp._id, {
            environments: updatedEnvironments,
            currentEnvironment: args.environment,
        });
    },
});

export const getApplicationData = query({
    args: {
        applicationId: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("applications")
            .filter((q) =>
                q.and(
                    q.eq(q.field("applicationId"), args.applicationId),
                    q.eq(q.field("userId"), args.userId)
                )
            )
            .first();
    },
});

export const getCurrentEnvironment = query({
    args: {
        applicationId: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const app = await ctx.db
            .query("applications")
            .filter((q) =>
                q.and(
                    q.eq(q.field("applicationId"), args.applicationId),
                    q.eq(q.field("userId"), args.userId)
                )
            )
            .first();

        return app?.currentEnvironment || "development";
    },
});