import type { APIRoute } from 'astro';
import { getCollection, getEntry } from "astro:content";
import { readFile } from "node:fs/promises"

export const getStaticPaths = async () => {
	const [md_posts, mdx_posts] = await Promise.all([
		getCollection("blog"),
		getCollection("blog_mdx")
	]);

	const md_paths = md_posts.map((post) => ({
		params: { slug: post.id + ".md" }
	}));

	const mdx_paths = mdx_posts.map((post) => ({
		params: { slug: post.id + ".mdx" }
	}));

	return [...md_paths, ...mdx_paths];
}

export const GET: APIRoute = async ({ params }) => {
	const slug = params.slug!.split('.').shift()!
	const ext = params.slug!.split('.').pop()!

	const entry = await getEntry(ext === "mdx" ? "blog_mdx" : "blog", slug);
	if (!entry) return new Response(null, { status: 500 });

	const file = await readFile(entry.filePath!, "utf-8");
	return new Response(file);
}
