import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ site }) => {
	const [ascii, robots] = await Promise.all([
		fetch(import.meta.env.ASCII_ART_URL),
		fetch(import.meta.env.ROBOTS_TXT_URL),
	])
		.then(([res1, res2]) => Promise.all([res1.text(), res2.text()]))
		.catch(() => ["", ""])

	const sitemap = new URL("sitemap-index.xml", site)

	return new Response(`${ascii}\n${robots}\nSitemap: ${sitemap.href}\n`)
}
