import { getCollection } from "astro:content"
import type { APIRoute } from "astro"

const collections = await Promise.all([
	getCollection("blog"),
	getCollection("blog_mdx"),
])
const ids = collections.flat().map(post => post.id)

export const prerender = false
export const POST: APIRoute = async ({ locals, request }) => {
	const hitcounter = locals.runtime.env.HITCOUNT
	const path = await request.text()

	if (!path) return new Response(null, { status: 400 })
	if (!ids.includes(path)) return new Response(null, { status: 404 })

	let hits = await hitcounter
		.get(path)
		.then(str => parseInt(str ?? "0", 10))
		.catch(() => 0)

	hits += 1
	await hitcounter.put(path, hits.toString())
	return new Response(hits.toString(), { status: 201 })
}
