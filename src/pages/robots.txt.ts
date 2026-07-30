import aiCrawlers from "@components/misc/ai_crawlers.txt";
import contentSignals from "@components/misc/content_signals.txt?raw";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
	const sitemap = `Sitemap: ${new URL("sitemap-index.xml", url).href}\n`;
	return new Response(`${contentSignals}\n` + `${sitemap}` + `${aiCrawlers}\n`);
};
