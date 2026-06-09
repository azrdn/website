import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
	const sitemap = new URL("sitemap-index.xml", site);
	return new Response(`Sitemap: ${sitemap.href}\n`);
};
