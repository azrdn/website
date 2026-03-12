import { getCollection } from "astro:content"
import type { APIRoute } from "astro"
import { env } from 'cloudflare:workers';

const ResCode = (status: number) => new Response(null, { status })
const ids = await getCollection("blog").then(c => c.map(post => post.id))

export const prerender = false
export const POST: APIRoute = async ({ request }) => {
	const ip = request.headers.get("cf-connecting-ip")
	if (!ip) return ResCode(403)

	const { success } = await env.IP.limit({ key: ip })
	if (!success) return ResCode(429)

	const path = await request.text()
	if (!path) return ResCode(400)
	if (!ids.includes(path)) return ResCode(404)

	let views = await env.HITCOUNT
		.get(path)
		.then(str => parseInt(str ?? "0", 10))
		.catch(() => 0)

	views += 1
	await env.HITCOUNT.put(path, views.toString())
	return new Response(views.toString(), { status: 201 })
}

export const GET: APIRoute = async ({ request }) => {
	const path = new URL(request.url).searchParams.get("id")

	if (!path) return ResCode(400)
	if (!ids.includes(path)) return ResCode(404)

	const views = await env.HITCOUNT.get(path).catch(() => "0")
	return new Response(views)
}
