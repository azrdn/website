import EleventyFetch from "@11ty/eleventy-fetch";
import type { APIRoute } from "astro";

const fetch_opts = { type: "text", duration: "1d" };

export const GET: APIRoute = async ({ site }) => {
	const [ascii, robots] = await Promise.all([
		EleventyFetch(import.meta.env.ASCII_ART_URL, fetch_opts),
		EleventyFetch(import.meta.env.ROBOTS_TXT_URL, fetch_opts),
	]).catch(() => ["", ""]);

	const sitemap = new URL("sitemap-index.xml", site);

	return new Response(`${ascii}\n${robots}\nSitemap: ${sitemap.href}\n`);
};
