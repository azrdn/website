import type { APIRoute } from "astro"
import * as env from "astro:env/server";

export const GET: APIRoute = async ({ site }) => {
	const ascii = await fetch(env.ASCII_ART_URL).catch(() => new Response())

	const sitemap = new URL("sitemap-index.xml", site)
	return new Response(`${
		await ascii.text() +
		"\n" +
		`Sitemap: ${sitemap.href}\n`
	}`)
}
 