import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createApiKey = mutation({
  args: {
    key: v.string(),
    userId: v.string(),
    name: v.string(),
    emailAdress: v.string(),
    keyId: v.string(),
    applicationId: v.string(),
    environment: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("apiKeys", args);
  },
});

export const getApiKeys = query({
  args: {
    userId: v.string(),
    applicationId: v.string(),
    environment: v.string(), // Note: Fixed typo in 'environment'
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("apiKeys")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("applicationId"), args.applicationId),
          q.eq(q.field("environment"), args.environment),
        ),
      )
      .collect();
  },
});
