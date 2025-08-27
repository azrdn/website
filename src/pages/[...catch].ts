import type { APIRoute } from "astro";

export const prerender = false
export const GET: APIRoute = async (ctx) => {
	const url = new URL(ctx.request.url)

	const bomb = new Response("booom", { status: 418 })
	if (url.pathname.startsWith("/wp")) return bomb
	if (url.pathname.includes(".php")) return bomb
	
	return ctx.redirect("/404", 301)
};
