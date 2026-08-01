import { defineAction } from "astro:actions";
import { DATABASE_URL } from "astro:env/server";
import { z } from "astro/zod";
import { count, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { table } from "../db/schema";

// NOTE: remove manual client end call on non serverless platforms
export const server = {
	getEntries: defineAction({
		input: z.object({
			offset: z.number().optional(),
			limit: z.number().optional(),
		}),
		handler: async (input) => {
			const db = drizzle(DATABASE_URL);
			const res = await db
				.select()
				.from(table)
				.orderBy(desc(table.id))
				.limit(input.limit ?? 10)
				.offset(input.offset ?? 0);
			await db.$client.end();
			return res;
		},
	}),
	getEntryCount: defineAction({
		handler: async () => {
			const db = drizzle(DATABASE_URL);
			const res = await db.select({ rows: count() }).from(table);
			await db.$client.end();

			if (!res[0]) throw new Error("No result");
			return res[0].rows;
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
			const db = drizzle(DATABASE_URL);
			const res = await db
				.insert(table)
				.values(input)
				.returning({ id: table.id });
			await db.$client.end();
			return res;
		},
	}),
};
