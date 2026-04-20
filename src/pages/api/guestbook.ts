import type { APIRoute } from "astro";
import z from "astro/zod"
import { env } from 'cloudflare:workers';

const schema = z.object({
	username: z.string().min(1).max(20),
	url: z.preprocess((val) => (val === "" ? undefined : val),
		z.url().optional()
	),
	message: z.string().min(1).max(100),
})

export const prerender = false


export const POST: APIRoute = async ({ request, redirect }) => {
	const ip = request.headers.get("cf-connecting-ip")
	if (!ip) return new Response(null, { status: 403 })

	const rate = await env.IP.limit({ key: ip })
	if (!rate.success) return new Response(null, { status: 429 })

	const body = await request.formData()
	const object = Object.fromEntries(body.entries())
	const { success, data } = schema.safeParse(object)
	if (!success) return new Response(null, { status: 400 })

	await env.DB
		.prepare("INSERT INTO guestbook (username, url, message) VALUES (?, ?, ?)")
		.bind(data.username, data.url ?? null, data.message)
		.run()

	console.log(data)
	return redirect("/guestbook")
}
