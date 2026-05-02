import { Elysia } from "elysia";
import { cors } from "@elysia/cors";
import { CloudflareAdapter } from "elysia/adapter/cloudflare-worker";
import z from "zod";

import { drizzle } from "drizzle-orm/postgres-js";
import { desc } from "drizzle-orm";
import { table } from "../db/schema";

const app = new Elysia({ adapter: CloudflareAdapter })
	.use(
		cors({
			origin: process.env.FRONTEND_URL,
		}),
	)
	.get("/guestbook", async () => {
		const db = drizzle(process.env.DATABASE_URL);
		return await db.select().from(table).orderBy(desc(table.id));
	})
	.post(
		"/guestbook",
		async ({ body, status, redirect, headers }) => {
			const fetchMode = headers["sec-fetch-mode"];
			const db = drizzle(process.env.DATABASE_URL);
			await db.insert(table).values(body);

			if (fetchMode !== "navigate") return status(201);
			return redirect(`${process.env.FRONTEND_URL}/guestbook`, 303);
		},
		{
			parse: "multipart/form-data",
			body: z.object({
				username: z.string().min(1).max(20),
				message: z.string().min(5).max(100),
				url: z
					.pipe(
						z.string().transform((s) => (s === "" ? null : s)),
						z.url().nullable(),
					)
					.optional(),
			}),
			headers: z.object({
				"sec-fetch-mode": z.string().nullish(),
			}),
		},
	)
	.compile();

export type App = typeof app;
export default app;
