import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import { table } from "@db/schema"
import { desc } from "drizzle-orm"
import { drizzle } from "drizzle-orm/d1"
import { env } from 'cloudflare:workers';

const db = drizzle(env.DB)

export const server = {
	addGuestbookEntry: defineAction({
		accept: "form",
		input: z.object({
			username: z.string().min(1).max(20),
			url: z.url().optional(),
			message: z.string().min(5).max(100)
		}),
		handler: async (input) => await db
			.insert(table)
			.values(input)
			.returning({ id: table.id })
	}),
	getGuestbookEntries: defineAction({
		handler: async () => await db
			.select()
			.from(table)
			.orderBy(desc(table.id))
	})
}
