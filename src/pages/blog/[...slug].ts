import type { APIRoute, GetStaticPaths, InferGetStaticParamsType } from 'astro';
import { getCollection, getEntry } from "astro:content";
import { readFile } from "node:fs/promises"

// https://github.com/withastro/astro/issues/6507#issuecomment-1489916992
export const getStaticPaths = (async () => {
	const [md_collection, mdx_collection] = await Promise.all([
		getCollection("blog"),
		getCollection("blog_mdx")
	]);
	const md_paths = md_collection.map((post) => ({
		params: { slug: post.id + ".md" }
	}));
	const mdx_paths = mdx_collection.map((post) => ({
		params: { slug: post.id + ".mdx" }
	}));

	return [...md_paths, ...mdx_paths];
}) satisfies GetStaticPaths;

type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute<never, Params> = async ({ params }) => {
	const slug = params.slug.split(".").shift()!
	const ext = params.slug.split(".").pop()!

	const entry = await getEntry(ext === "mdx" ? "blog_mdx" : "blog", slug);
	if (!entry) return new Response(null, { status: 500 });

	const file = await readFile(entry.filePath!, "utf-8").catch(
		() => "File read error"
	);
	return new Response(file);
}
