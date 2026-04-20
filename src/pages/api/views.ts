import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { env } from 'cloudflare:workers';

const ids = await getCollection("blog").then(c => c.map(post => post.id))

export const prerender = false
export const POST: APIRoute = async ({ request }) => {
	const ip = request.headers.get("cf-connecting-ip")
	if (!ip) return new Response(null, { status: 403 })

	const { success } = await env.IP.limit({ key: ip })
	if (!success) return new Response(null, { status: 429 })

	const path = await request.text()
	if (!path) return new Response(null, { status: 400 })
	if (!ids.includes(path)) return new Response(null, { status: 404 })

	const viewcount = await env.PAGEVIEWS.get(path).catch() ?? "0"
	const newViewcount = (parseInt(viewcount, 10) + 1).toString()

	await env.PAGEVIEWS.put(path, newViewcount)
	return new Response(newViewcount, { status: 201 })
}

export const GET: APIRoute = async ({ request }) => {
	const path = new URL(request.url).searchParams.get("id")

	if (!path) return new Response(null, { status: 400 })
	if (!ids.includes(path)) return new Response(null, { status: 404 })

	const views = await env.PAGEVIEWS.get(path).catch(() => "0")
	return new Response(views)
}
