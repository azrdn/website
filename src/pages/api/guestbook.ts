import type { APIRoute } from "astro";
import z from "astro/zod"
import { guestbook_tbl as tbl } from "@db/schema"
import { drizzle } from "drizzle-orm/d1"
import { env } from 'cloudflare:workers';

export const prerender = false

const db = drizzle(env.DB)
const schema = z.object({
	username: z.string().min(1).max(20),
	url: z.pipe(
		z.string().transform(val => val === "" ? null : val),
		z.url().nullable(),
	),
	message: z.string().min(1).max(100),
})

export const POST: APIRoute = async ({ request, redirect }) => {
	const body = await request.formData()
	const object = Object.fromEntries(body.entries())
	
	const { success, data } = schema.safeParse(object)
	if (!success) return new Response(null, { status: 400 })

	await db
		.insert(tbl)
		.values(data)
		.returning({ id: tbl.id })
	
	return redirect("/guestbook")
}

export const GET: APIRoute = async () => {
	const entries = await db.select().from(tbl)
	return new Response(JSON.stringify(entries), { status: 200 })
}

export type GETResponse = typeof tbl.$inferSelect
export type POSTResponse = { id: typeof tbl.$inferInsert.id }[]
