import { v } from "convex/values";
import { mutation, query } from "./_generated/server.js";

export const create = mutation({
	args: {
		KeyId: v.string(),
		transactionId: v.string(),
		amount: v.number(),
		phoneNumber: v.string(),
		accountReference: v.string(),
		transactionDesc: v.string(),
		mpesaRequestId: v.string(),
		status: v.string(),
		resultDesc: v.string(),
		date_created: v.string(),
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

export const updateStatusByMpesaRequestId = mutation({
	args: {
		mpesaRequestId: v.string(),
		status: v.string(),
		resultDesc: v.string(),
	},
	handler: async (ctx, args) => {
		const transaction = await ctx.db
			.query("transactions")
			.filter((q) => q.eq(q.field("mpesaRequestId"), args.mpesaRequestId))
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
		KeyId: v.string(),
	},
	handler: async (ctx, args) => {
		const transaction = await ctx.db
			.query("transactions")
			.filter((q) =>
				q.and(
					q.eq(q.field("transactionId"), args.transactionId),
					q.eq(q.field("KeyId"), args.KeyId)
				)
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

export const getTransactions = query({
	args: {
		KeyId: v.string(),
	},
	handler: async (ctx, args) => {
		const transactions = await ctx.db
			.query("transactions")
			.filter((q) => q.eq(q.field("KeyId"), args.KeyId))
			.order("desc")
			.collect();

		return {
			transactions: transactions.map((transaction) => ({
				transactionId: transaction.transactionId,
				status: transaction.status,
				resultDesc: transaction.resultDesc,
				amount: transaction.amount,
				phoneNumber: transaction.phoneNumber,
				accountReference: transaction.accountReference,
				transactionDesc: transaction.transactionDesc,
				mpesaRequestId: transaction.mpesaRequestId,
				date_created: transaction.date_created,
			})),
		};
	},
});

export const deleteTransactions = mutation({
	args: {
		keyId: v.string(),
	},

	handler: async (ctx, args) => {
		const transactions = await ctx.db
			.query("transactions")
			.filter((q) => q.eq(q.field("KeyId"), args.keyId))
			.collect();

		for (const transaction of transactions) {
			await ctx.db.delete(transaction._id);
		}
	},
});
