import type { APIRoute } from 'astro';
import { getCollection, getEntry } from "astro:content";
import { readFile } from "node:fs/promises"

export const getStaticPaths = async () => {
	const posts = await getCollection("blog");
	return posts.map((post) => ({
		params: { slug: post.id }
	}));
}

export const GET: APIRoute = async ({ params }) => {
	const md = await getEntry("blog", params.slug!);
	if (!md) return new Response(null, { status: 500 });

	const file = await readFile(md.filePath!, "utf-8");
	return new Response(file);
}
