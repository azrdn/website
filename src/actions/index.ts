import { defineAction } from "astro:actions";
import { DATABASE_URL, TURSO_AUTH_TOKEN } from "astro:env/server";
import { z } from "astro/zod";
import { count, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { table } from "../db/schema";

const db = drizzle({
	connection: {
		url: DATABASE_URL,
		authToken: TURSO_AUTH_TOKEN,
	},
});
export const server = {
	getEntries: defineAction({
		input: z.object({
			offset: z.number().optional(),
			limit: z.number().optional(),
		}),
		handler: async (input) => {
			const res = await db
				.select()
				.from(table)
				.orderBy(desc(table.id))
				.limit(input.limit ?? 10)
				.offset(input.offset ?? 0);
			return res;
		},
	}),
	getEntryCount: defineAction({
		handler: async () => {
			const res = await db.select({ count: count() }).from(table);
			return res;
		},
	}),
	postEntry: defineAction({
		accept: "form",
		input: z.object({
			username: z.string().min(1).max(20),
			message: z.string().min(5).max(100),
			url: z
				.url({
					protocol: /^https?$/,
					hostname: z.regexes.domain,
					normalize: true,
				})
				.nullable()
				.default(""),
		}),
		handler: async (input) => {
			const res = await db
				.insert(table)
				.values(input)
				.returning({ id: table.id });
			return res;
		},
	}),
};
