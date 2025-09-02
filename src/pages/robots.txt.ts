import type { APIRoute } from "astro"
import { dogfetch } from "../utils/cached_fetch"

export const GET: APIRoute = async ({ site }) => {
	const [ascii, robots] = await Promise.all([
		dogfetch(import.meta.env.ASCII_ART_URL, 7200),
		dogfetch(import.meta.env.ROBOTS_TXT_URL, 7200),
	])
		.then(([res1, res2]) => Promise.all([res1.text(), res2.text()]))
		.catch(() => ["", ""])

	const sitemap = new URL("sitemap-index.xml", site)

	return new Response(`${ascii}\n${robots}\nSitemap: ${sitemap.href}\n`)
}
