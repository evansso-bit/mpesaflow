import { v } from "convex/values";
import { mutation, query } from "./_generated/server.js";

export const create = mutation({
  args: {
    userId: v.string(),
    transactionId: v.string(),
    amount: v.number(),
    phoneNumber: v.string(),
    accountReference: v.string(),
    transactionDesc: v.string(),
    mpesaRequestId: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("transactions", args);
  },
});

export const updateStatus = mutation({
  args: {
    transactionId: v.string(),
    status: v.string(),
    resultDesc: v.string(),
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db
      .query("transactions")
      .filter((q) => q.eq(q.field("transactionId"), args.transactionId))
      .first();

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return await ctx.db.patch(transaction._id, {
      status: args.status,
      resultDesc: args.resultDesc,
    });
  },
});

export const getStatus = query({
  args: {
    transactionId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const transaction = await ctx.db
      .query("transactions")
      .filter((q) =>
        q.and(
          q.eq(q.field("transactionId"), args.transactionId),
          q.eq(q.field("userId"), args.userId),
        ),
      )
      .first();

    if (!transaction) {
      return null;
    }

    return {
      transactionId: transaction.transactionId,
      status: transaction.status,
      resultDesc: transaction.resultDesc,
      amount: transaction.amount,
      phoneNumber: transaction.phoneNumber,
      accountReference: transaction.accountReference,
      transactionDesc: transaction.transactionDesc,
      mpesaRequestId: transaction.mpesaRequestId,
    };
  },
});
