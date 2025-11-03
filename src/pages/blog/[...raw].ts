import { getCollection, getEntry, type DataEntryMap } from "astro:content"
import type { APIRoute, GetStaticPaths, InferGetStaticParamsType } from "astro"
import { readFile } from "node:fs/promises"

const collections: Record<string, keyof DataEntryMap> = {
	md: "blog",
	mdx: "blog_mdx",
}

const parse_slug = (slug: string) => {
	const dot_index = slug.lastIndexOf(".")
	if (dot_index === -1) return null

	const extension = slug.slice(dot_index + 1).toLowerCase()
	const id = slug.slice(0, dot_index)

	return { id, extension }
}

export const prerender = true
export const getStaticPaths = (async () => {
	const [md_collection, mdx_collection] = await Promise.all([
		getCollection("blog"),
		getCollection("blog_mdx"),
	])

	return [
		...md_collection.map(post => ({ params: { raw: `${post.id}.md` } })),
		...mdx_collection.map(post => ({ params: { raw: `${post.id}.mdx` } })),
	]
}) satisfies GetStaticPaths

type Params = InferGetStaticParamsType<typeof getStaticPaths>
export const GET: APIRoute<never, Params> = async ({ params }) => {
	const parsed = parse_slug(params.raw)
	if (!parsed) return new Response(null, { status: 404 })

	const collection = collections[parsed.extension]
	if (!collection) return new Response(null, { status: 404 })

	const entry = await getEntry(collection, parsed.id)
	if (!entry || !entry.filePath) return new Response(null, { status: 500 })

	const file = await readFile(entry.filePath, "utf-8")
	return new Response(file)
}
