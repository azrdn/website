import { defineAction, ActionError } from 'astro:actions';
import { getCollection } from "astro:content"
import { z } from 'astro/zod';
import { env } from 'cloudflare:workers';

const ids = await getCollection("blog").then(c => c.map(p => p.id))

export const server = {
	incrementViews: defineAction({
		input: z.string(),
		handler: async (postId, { request }) => {
			const ip = request.headers.get("cf-connecting-ip")
			if (!ip) throw new ActionError({ code: "FORBIDDEN" })

			const { success } = await env.IP.limit({ key: ip })
			if (!success) throw new ActionError({ code: "TOO_MANY_REQUESTS" })
			if (!ids.includes(postId)) throw new ActionError({ code: "NOT_FOUND" })

			const viewcount = await env.PAGEVIEWS.get(postId).catch() ?? "0"
			const newViewcount = (parseInt(viewcount, 10) + 1).toString()

			await env.PAGEVIEWS.put(postId, newViewcount)
			return newViewcount
		},
	}),

	getViewcount: defineAction({
		input: z.string(),
		handler: async (postId) => await env.PAGEVIEWS.get(postId).catch() ?? "0"
	}),
}
