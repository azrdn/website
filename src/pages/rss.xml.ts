import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
	const testBlog = import.meta.env.DEV ? await getCollection("testBlog") : [];
	const blog = await getCollection("blog");
	const collections = [...testBlog, ...blog] as typeof blog;

	return rss({
		title: url.hostname,
		description: "My personal site blog",
		site: url.href,
		items: collections.map((post) => ({
			title: post.data.title,
			pubDate: post.data.createdAt,
			link: `/blog/${post.id}/`,
		})),
	});
};
