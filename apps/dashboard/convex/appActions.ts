import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createApplication = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    applicationId: v.string(),
    enviroment: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("applications", args);
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

export const getApplicationData = query({
  args: {
    applicationId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("applications")
      .filter((q) => q.eq(q.field("applicationId"), args.applicationId))
      .first();
  },
});
