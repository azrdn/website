import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
	const [ascii, robots] = await Promise.all([
		fetch(import.meta.env.ASCII_ART_URL),
		fetch(import.meta.env.ROBOTS_TXT_URL),
	]).catch(() => [new Response(), new Response()]);

	const [asciiText, robotsText] = await Promise.all([
		ascii.text(),
		robots.text(),
	]);

	const sitemap = new URL("sitemap-index.xml", site);

	return new Response(
		`${asciiText}\n${robotsText}\nSitemap: ${sitemap.href}\n`,
	);
};
