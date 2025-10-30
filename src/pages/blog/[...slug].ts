import type { APIRoute } from "astro"

export const prerender = false

export const POST: APIRoute = async ctx => {
	return new Response(await ctx.request.text(), { status: 501 })
}

export const GET: APIRoute = async ctx => {
	return ctx.locals.runtime.env.ASSETS.fetch(ctx.request)
}
