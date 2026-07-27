import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (ctx) => {
	const posts = await getCollection("blog");

	return rss({
		title: "azrd",
		description: "My personal site blog",
		site: import.meta.env.DEV
			? `http://localhost:${ctx.url.port}`
			: import.meta.env.SITE,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.createdAt,
			link: `/blog/${post.id}`,
		})),
	});
};
