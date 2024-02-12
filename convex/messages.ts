import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    //handler represents the server-side code Convex will run when this query is called.
    // Grab the most recent messages.
    const messages = await ctx.db.query("messages").order("desc").take(100);
    //messages.find((item) => console.log(item?.body?.replace(":)", "😀")));

    // Reverse the list so that it's in a chronological order.
    return messages.reverse().map((message) => ({
      ...message,
      body: message.body.replaceAll(":)", "😊"),
    }));
  },
});

export const send = mutation({
  args: { body: v.string(), author: v.string() },
  handler: async (ctx, { body, author }) => {
    // Send a new message.
    await ctx.db.insert("messages", { body, author });
  },
});

export const like = mutation({
  args: { likes: v.string(), messageId: v.id("messages") },
  handler: async function likes(ctx, { likes, messageId }) {
    // logic to write to like a msg
    await ctx.db.insert("likes", {
      liker: likes,
      messageId: messageId,
    });
  },
});
