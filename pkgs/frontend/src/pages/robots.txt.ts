import contentSignal from "@utils/content_signals.txt";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
	const sitemap = `Sitemap: ${new URL("sitemap-index.xml", site).href}\n`;
	return new Response(`${contentSignal}\n${sitemap}`);
};
