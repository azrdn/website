import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { count, desc } from "drizzle-orm";
import { getDb } from "../db";
import { table } from "../db/schema";

export const server = {
	getEntries: defineAction({
		input: z.object({
			offset: z.number().optional(),
			limit: z.number().optional(),
		}),
		handler: async (input) => {
			await using db = getDb();
			return await db.connection
				.select()
				.from(table)
				.orderBy(desc(table.id))
				.limit(input.limit ?? 10)
				.offset(input.offset ?? 0);
		},
	}),
	getEntryCount: defineAction({
		handler: async () => {
			await using db = getDb();
			const res = await db.connection.select({ val: count() }).from(table);
			if (!res[0]) throw new Error("DB Error");
			return res[0].val;
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
			await using db = getDb();
			return await db.connection
				.insert(table)
				.values(input)
				.returning({ id: table.id });
		},
	}),
};
