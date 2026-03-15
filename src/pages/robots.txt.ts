import type { APIRoute } from "astro"
import * as env from "astro:env/server";

export const GET: APIRoute = async ({ site }) => {
	const [ascii, robots] = await Promise.all([
		fetch(env.ASCII_ART_URL),
		fetch(env.ROBOTS_TXT_URL),
	])

	const sitemap = new URL("sitemap-index.xml", site)
	return new Response(`
		${await ascii.text()}\n
		${await robots.text()}\n
		Sitemap: ${sitemap.href}\n
	`)
}
 