import type { APIRoute } from 'astro';
import { getCollection, getEntry } from "astro:content";

export async function getStaticPaths() {
	const posts = await getCollection("blog");
	return posts.map((post) => ({
		params: { slug: post.id }
	}));
}

export const GET: APIRoute = async ({ params }) => {
	const md = await getEntry("blog", params.slug!);
	if (!md) return new Response("Not Found");
	return new Response(md.body);
}
