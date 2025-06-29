import { type DataEntryMap, getCollection, getEntry } from "astro:content";
import { readFile } from "node:fs/promises";
import type { APIRoute, GetStaticPaths, InferGetStaticParamsType } from "astro";

const collection: keyof DataEntryMap = "blog_mdx";
export const prerender = true;
export const getStaticPaths = (async () => {
	const md_collection = await getCollection(collection);
	return md_collection.map(post => ({
		params: { slug: post.id },
	}));
}) satisfies GetStaticPaths;

type Params = InferGetStaticParamsType<typeof getStaticPaths>;

export const GET: APIRoute<never, Params> = async ({ params }) => {
	const entry = await getEntry(collection, params.slug);
	if (!entry || !entry.filePath) return new Response(null, { status: 500 });

	const file = await readFile(entry.filePath, "utf-8").catch(
		() => "File read error",
	);
	return new Response(file);
};
