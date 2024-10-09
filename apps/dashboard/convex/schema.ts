import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  apiKeys: defineTable({
    key: v.string(),
    userId: v.string(),
    name: v.string(),
    emailAdress: v.string(),
    keyId: v.string(),
    applicationId: v.string(),
    enviroment: v.string(),
  }),

  applications: defineTable({
    userId: v.string(),
    name: v.string(),
    applicationId: v.string(),
    enviroment: v.string(),
  }),

  transactions: defineTable({
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
  }),
});
