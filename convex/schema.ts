import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    author: v.string(),
    body: v.string(),
  }),
  likes: defineTable({
    liker: v.string(),
    messageId: v.id("messages"), // messageId field that links to a document in the messages table.
  }),
});
