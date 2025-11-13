import { getCollection } from "astro:content"
import type { APIRoute } from "astro"

const ResCode = (status: number) => new Response(null, { status })
const collections = await Promise.all([
	getCollection("blog"),
	getCollection("blog_mdx"),
])
const ids = collections.flat().map(post => post.id)

export const prerender = false
export const POST: APIRoute = async ({ locals, request }) => {
	const hitcounter = locals.runtime.env.HITCOUNT
	const ip = request.headers.get("cf-connecting-ip")
	if (!ip) return ResCode(403)

	const { success } = await locals.runtime.env.IP.limit({ key: ip })
	if (!success) return ResCode(429)

	const path = await request.text()
	if (!path) return ResCode(400)
	if (!ids.includes(path)) return ResCode(404)

	let hits = await hitcounter
		.get(path)
		.then(str => parseInt(str ?? "0", 10))
		.catch(() => 0)

	hits += 1
	await hitcounter.put(path, hits.toString())
	return new Response(hits.toString(), { status: 201 })
}

export const GET: APIRoute = async ({ locals, request }) => {
	const hitcounter = locals.runtime.env.HITCOUNT
	const path = new URL(request.url).searchParams.get("id")

	if (!path) return ResCode(400)
	if (!ids.includes(path)) return ResCode(404)

	const hits = await hitcounter.get(path).catch(() => "0")
	return new Response(hits)
}
