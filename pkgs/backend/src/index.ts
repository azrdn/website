import { Elysia } from "elysia";
import { cors } from "@elysia/cors";
import { openapi } from "@elysia/openapi";
import { CloudflareAdapter } from "elysia/adapter/cloudflare-worker";
import { createHash } from "node:crypto";
import z from "zod";

import { drizzle } from "drizzle-orm/postgres-js";
import { desc } from "drizzle-orm";
import { table } from "../db/schema";

import { env } from "cloudflare:workers";

const hasher = (str: string) => createHash("sha256").update(str).digest("hex");
const ratelimiter = async (content: string, ip: string) => {
	const [ipResult, contentResult] = await Promise.all([
		env.IP.limit({ key: ip }),
		env.CONTENT.limit({ key: hasher(content) }),
	]);
	return ipResult.success && contentResult.success;
};

const app = new Elysia({ adapter: CloudflareAdapter })
	.use(
		cors({
			origin: process.env.FRONTEND_URL,
		}),
	)
	.use(openapi())
	.get("/guestbook", async () => {
		const db = drizzle(process.env.DATABASE_URL);
		return await db.select().from(table).orderBy(desc(table.id));
	})
	.post(
		"/guestbook",
		async ({ body, status, redirect, headers }) => {
			const input = JSON.stringify(body);
			const ip = headers["cf-connecting-ip"] ?? "";
			const allowed = await ratelimiter(input, ip);
			if (!allowed) return status(429);

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
				"cf-connecting-ip": z.string().nullish(),
			}),
		},
	)
	.compile();

export type App = typeof app;
export default app;
